// ✏️ EDIT YOUR CONTACT DETAILS HERE
const CONTACT = { phone: '628999927222', phoneText: '+62 899-9927-222', linkedin: 'syifa-nur-febrianti-699630322', linkedinName: 'Syifa Nur Febrianti' };
document.querySelectorAll('[data-wa]').forEach(a => { a.href = 'https://wa.me/' + CONTACT.phone; a.target = '_blank'; a.querySelector('b').textContent = CONTACT.phoneText; });
document.querySelectorAll('[data-li]').forEach(a => { a.href = 'https://www.linkedin.com/in/' + CONTACT.linkedin; a.target = '_blank'; a.querySelector('b').textContent = CONTACT.linkedinName; });

// Click-to-zoom lightbox
const lb = document.getElementById('lb');
document.querySelectorAll('[data-zoom]').forEach(i => i.addEventListener('click', () => { lb.firstElementChild.src = i.src; lb.classList.add('on'); }));
lb.onclick = () => lb.classList.remove('on');

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

// Typing effect
const words = ['an Economics, Finance & Banking student at UB', 'a data analytics enthusiast', 'a Business Intelligence dashboard builder', 'a future digital finance analyst'];
const t = document.getElementById('typed'); let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  t.textContent = word.slice(0, c);
  if (!del && c++ === word.length) { del = true; return setTimeout(type, 1500); }
  if (del && --c === 0) { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 30 : 70);
})();

// Count-up stats
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const b = e.target, end = +b.dataset.count, dec = +b.dataset.dec || 0, s = performance.now();
  (function f(n) {
    const p = Math.min((n - s) / 1400, 1);
    b.textContent = (end * p).toFixed(dec).replace('.', ',');
    if (p < 1) requestAnimationFrame(f);
  })(s);
  co.unobserve(b);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

// Scroll progress + active nav link
const bar = document.querySelector('.progress');
const links = [...document.querySelectorAll('.nav nav a')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
  const y = scrollY + innerHeight / 3;
  secs.forEach((s, i) => links[i].classList.toggle('active', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y));
});

// Mobile menu
const menu = document.querySelector('.nav nav');
document.querySelector('.burger').onclick = () => menu.classList.toggle('open');
menu.onclick = () => menu.classList.remove('open');

// 3D tilt on hero photo & polaroids
document.querySelectorAll('.hero-photo,.pic').forEach(el => {
  if (matchMedia('(hover:none)').matches) return;
  const base = getComputedStyle(el).getPropertyValue('--r') || '0deg';
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.05)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});
