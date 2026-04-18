'use strict';

const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive: true});

let navOpen = false;
function toggleNav() {
  navOpen = !navOpen;
  const links = document.getElementById('navLinks');
  if (navOpen) {
    links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(44,21,7,.99);padding:20px 6%;gap:18px;z-index:999;border-bottom:1px solid rgba(200,146,10,.2);';
  } else {
    links.style.cssText = '';
  }
}
document.querySelectorAll('#navLinks a').forEach(l => l.addEventListener('click', () => { if(navOpen) toggleNav(); }));
window.toggleNav = toggleNav;

function switchTab(id) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.add('active');
    document.querySelectorAll('.menu-tab').forEach(t => { if(t.dataset.tab === id) t.classList.add('active'); });
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.switchTab = switchTab;

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObs.unobserve(entry.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Gallery lightbox
(function(){
  const items = document.querySelectorAll('.g-item');
  if (!items.length) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.93);align-items:center;justify-content:center;cursor:zoom-out;padding:16px;';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:100%;max-height:90dvh;border-radius:6px;box-shadow:0 20px 60px rgba(0,0,0,.8);';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if(src){ img.src=src; overlay.style.display='flex'; document.body.style.overflow='hidden'; }
    });
  });
  overlay.addEventListener('click', () => { overlay.style.display='none'; document.body.style.overflow=''; });
  document.addEventListener('keydown', e => { if(e.key==='Escape'){ overlay.style.display='none'; document.body.style.overflow=''; } });
})();

// Auto-scroll menu tabs to active
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
});
