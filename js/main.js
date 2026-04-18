'use strict';

/* NAV scroll shrink */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
});

/* Hamburger */
let navOpen = false;
function toggleNav() {
  navOpen = !navOpen;
  const links = document.getElementById('navLinks');
  if (navOpen) {
    links.style.cssText = `display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:rgba(44,21,7,.98);padding:20px 5%;gap:14px;z-index:999;border-bottom:1px solid rgba(200,146,10,.2);`;
  } else {
    links.style.cssText = 'display:none;';
  }
}
document.querySelectorAll('#navLinks a').forEach(link => link.addEventListener('click', () => { if (navOpen) toggleNav(); }));
window.toggleNav = toggleNav;

/* Menu tabs */
function switchTab(id) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.add('active');
    document.querySelectorAll('.menu-tab').forEach(t => { if (t.dataset.tab === id) t.classList.add('active'); });
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  }
}
window.switchTab = switchTab;

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Gallery lightbox */
(function() {
  const items = document.querySelectorAll('.g-item');
  if (!items.length) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.92);align-items:center;justify-content:center;cursor:zoom-out;';
  const overlayImg = document.createElement('img');
  overlayImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:4px;box-shadow:0 20px 60px rgba(0,0,0,.8);';
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);
  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (src) { overlayImg.src = src; overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    });
  });
  overlay.addEventListener('click', () => { overlay.style.display = 'none'; document.body.style.overflow = ''; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { overlay.style.display = 'none'; document.body.style.overflow = ''; } });
})();

document.addEventListener('DOMContentLoaded', () => { console.log('✅ Magnum Bakes & Cakes loaded'); });
