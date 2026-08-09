// Ria Iyer — Professional theme JS: mobile nav toggle + active link + static contact form.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.p-toggle');
  var nav = document.querySelector('.p-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var form = document.getElementById('p-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('p-form-status');
      if (status) status.textContent = "This form isn't wired to a server yet — please reach out via email or LinkedIn below.";
    });
  }
});
