// =========================================================
// RIA IYER — PORTFOLIO — shared interactions
// =========================================================

/* ---------- Starfield background ---------- */
(function starfield(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w*h)/9000);
    stars = Array.from({length:count}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.6 + 0.4,
      s: Math.random()*0.3 + 0.05,
      hue: [ '#4deeea', '#f92aad', '#ffe45e', '#b967ff', '#e8e6f7' ][Math.floor(Math.random()*5)]
    }));
  }

  function tick(){
    ctx.clearRect(0,0,w,h);
    for(const st of stars){
      st.y += st.s;
      if(st.y > h) st.y = 0;
      ctx.globalAlpha = 0.55 + Math.sin(st.y*0.05)*0.3;
      ctx.fillStyle = st.hue;
      ctx.fillRect(st.x, st.y, st.r, st.r);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
})();

/* ---------- Mobile nav toggle ---------- */
(function nav(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.hud-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
})();

/* ---------- Mark active nav link ---------- */
(function activeLink(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.hud-nav a').forEach(a => {
    const target = a.getAttribute('href').split('/').pop();
    if(target === here) a.classList.add('active');
  });
})();

/* ---------- Soft page-transition on internal link clicks ---------- */
(function transitions(){
  document.body.classList.add('page-enter');
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('http') || a.target === '_blank') return;
    a.addEventListener('click', (e) => {
      if(!document.startViewTransition){
        e.preventDefault();
        document.body.style.transition = 'opacity .25s ease';
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 220);
      }
    });
  });
})();

/* ---------- Lightbox (used on archive.html) ---------- */
(function lightbox(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-cap');
  const closeBtn = lb.querySelector('.lb-close');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      lbImg.src = el.getAttribute('data-full') || el.querySelector('img')?.src;
      lbCap.textContent = el.getAttribute('data-caption') || '';
      lb.classList.add('open');
    });
  });
  function close(){ lb.classList.remove('open'); lbImg.src=''; }
  closeBtn?.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();

/* ---------- Konami-code easter egg: invert palette briefly ---------- */
(function konami(){
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  window.addEventListener('keydown', (e) => {
    idx = (e.key === seq[idx]) ? idx+1 : 0;
    if(idx === seq.length){
      idx = 0;
      document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
      setTimeout(() => { document.documentElement.style.filter = ''; }, 1800);
    }
  });
})();

/* ---------- Simple typewriter for elements with [data-type] ---------- */
(function typewriter(){
  document.querySelectorAll('[data-type]').forEach(el => {
    const full = el.textContent;
    el.textContent = '';
    let i = 0;
    function step(){
      el.textContent = full.slice(0, i);
      i++;
      if(i <= full.length) requestAnimationFrame(() => setTimeout(step, 28));
    }
    step();
  });
})();

/* ---------- Contact form (static demo — no backend) ---------- */
(function contactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const name = form.querySelector('#name')?.value || 'there';
    if(status){
      status.textContent = `Thanks, ${name}! This form isn't wired to a server yet — please email directly for now.`;
      status.style.color = 'var(--green)';
    }
  });
})();
