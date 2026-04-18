/**
 * MAGNUM BAKES & CAKES — main.js
 * Hayathnagar, Hyderabad
 */

'use strict';

/* ================================================================
   NAV — scroll shrink
================================================================ */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ================================================================
   HAMBURGER — mobile nav toggle
================================================================ */
let navOpen = false;
function toggleNav() {
  navOpen = !navOpen;
  const links = document.getElementById('navLinks');
  if (navOpen) {
    links.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 70px; left: 0; right: 0;
      background: rgba(44,21,7,.98);
      padding: 20px 5%;
      gap: 14px;
      z-index: 999;
      border-bottom: 1px solid rgba(200,146,10,.2);
    `;
  } else {
    links.style.cssText = 'display: none;';
  }
}
// Close nav when a link is clicked (mobile)
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    if (navOpen) toggleNav();
  });
});
// Expose toggleNav globally (used by onclick in HTML)
window.toggleNav = toggleNav;

/* ================================================================
   MENU TABS — switch active tab panel
================================================================ */
function switchTab(id) {
  // Hide all panels
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  // Deactivate all tabs
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));

  // Show target panel
  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.add('active');
    // Activate matching tab button
    document.querySelectorAll('.menu-tab').forEach(t => {
      if (t.dataset.tab === id) t.classList.add('active');
    });
    // Smooth scroll to menu section
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  }
}
// Expose globally
window.switchTab = switchTab;

/* ================================================================
   SCROLL REVEAL — IntersectionObserver
================================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ================================================================
   GALLERY — lightbox (simple overlay)
================================================================ */
(function initGalleryLightbox() {
  const items = document.querySelectorAll('.g-item');
  if (!items.length) return;

  // Build overlay
  const overlay = document.createElement('div');
  overlay.id = 'gallery-overlay';
  overlay.style.cssText = `
    display: none; position: fixed; inset: 0; z-index: 9000;
    background: rgba(0,0,0,.9); align-items: center; justify-content: center;
    cursor: zoom-out;
  `;
  const overlayImg = document.createElement('img');
  overlayImg.style.cssText = 'max-width: 90vw; max-height: 90vh; border-radius: 4px; box-shadow: 0 20px 60px rgba(0,0,0,.8);';
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (src) {
        overlayImg.src = src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();

/* ================================================================
   ACTIVE NAV LINK — highlight current section
================================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--gold-lt)'
              : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));
})();

/* ================================================================
   ORDER BUTTONS — call tel on click
================================================================ */
document.querySelectorAll('.btn-sm').forEach(btn => {
  btn.addEventListener('click', () => {
    window.location.href = 'tel:09346693818';
  });
});

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Magnum Bakes & Cakes — website loaded');
});
