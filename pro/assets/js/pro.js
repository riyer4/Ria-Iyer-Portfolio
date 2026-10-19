// Ria Iyer portfolio JS: contact form (posts to a Google Apps Script web app that emails me) + mailto links with a Gmail fallback. Runs on load, or immediately when swapped in by the intro transition.
function proInit() {
  var form = document.getElementById('p-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('p-form-status');
      var btn = form.querySelector('button[type="submit"]');
      var say = function (msg, cls) { status.textContent = msg; status.className = cls || ''; };
      var fail = 'Something went wrong. Please email me directly at riaiyer2@gmail.com.';
      btn.disabled = true;
      say('Sending...');
      fetch(form.dataset.endpoint, { method: 'POST', body: new URLSearchParams(new FormData(form)) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) { form.reset(); say("Thanks! I'll get back to you as soon as I can.", 'is-ok'); }
          else say((res && res.error) || fail, 'is-err');
        })
        .catch(function () { say(fail, 'is-err'); })
        .then(function () { btn.disabled = false; });
    });
  }

  // Email links: open the visitor's mail app with a draft ready; if nothing takes over, fall back to a Gmail compose tab.
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var url = new URL(a.getAttribute('href'));
      var to = url.pathname;
      var gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
        '&su=' + encodeURIComponent(url.searchParams.get('subject') || '') +
        '&body=' + encodeURIComponent(url.searchParams.get('body') || '');
      var left = false;
      var mark = function () { left = true; };
      window.addEventListener('blur', mark, { once: true });
      document.addEventListener('visibilitychange', mark, { once: true });
      window.location.href = a.getAttribute('href');
      setTimeout(function () {
        window.removeEventListener('blur', mark);
        if (!left) window.open(gmail, '_blank', 'noopener');
      }, 900);
    });
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', proInit); else proInit();
