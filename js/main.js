'use strict';

// ── WhatsApp number (change here if needed) ──────────────────────
const WA_NUMBER = '919346693818';

// ── Cake data ─────────────────────────────────────────────────────
const CAKES = [
  { name: 'Pineapple',    half: 250,  full: 500  },
  { name: 'Butterscotch', half: 275,  full: 550  },
  { name: 'Blackforest',  half: 300,  full: 600  },
  { name: 'Chocolate',    half: 400,  full: 800  },
  { name: 'Honey Almond', half: 400,  full: 800  },
  { name: 'Blueberry',    half: 400,  full: 800  },
  { name: 'Red Velvet',   half: 400,  full: 800  },
];

// ── Build WhatsApp URL for a cake ────────────────────────────────
function cakeWaUrl(cake) {
  const msg = `Hi Magnum Bakes & Cakes! 🎂\n\nI want to order:\n*${cake.name} Cake*\nPrice: ₹${cake.half} (½kg) / ₹${cake.full} (1kg)\n\nPlease confirm availability and let me know the next steps. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Render cake rows into a container ───────────────────────────
function renderCakeRows(containerId, variant) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = CAKES.map(cake => {
    const url = cakeWaUrl(cake);
    if (variant === 'showcase') {
      // Showcase section: name | price | button (inline, compact)
      return `
        <div class="cake-row">
          <span class="ck-name">${cake.name}</span>
          <div class="cake-row-right">
            <span class="ck-price">₹${cake.half} / ₹${cake.full}</span>
            <a href="${url}" target="_blank" rel="noopener" class="cake-order-btn" aria-label="Order ${cake.name} Cake on WhatsApp">Order Now</a>
          </div>
        </div>`;
    } else {
      // Menu panel: standard menu-item row with button
      return `
        <div class="menu-item">
          <div class="mi-name">${cake.name}</div>
          <div class="menu-item-right">
            <div class="mi-price">₹${cake.half} / ₹${cake.full}</div>
            <a href="${url}" target="_blank" rel="noopener" class="cake-order-btn cake-order-btn--sm" aria-label="Order ${cake.name} Cake on WhatsApp">Order Now</a>
          </div>
        </div>`;
    }
  }).join('');
}

// ── Initialise both cake lists ───────────────────────────────────
function renderCakes() {
  renderCakeRows('showcaseCakeList', 'showcase');
  renderCakeRows('menuCakeList', 'menu');
}

// ── Nav scroll behaviour ─────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive: true});

// ── Mobile nav toggle ────────────────────────────────────────────
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

// ── Menu tab switching ───────────────────────────────────────────
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

// ── Scroll reveal ────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObs.unobserve(entry.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Gallery lightbox ─────────────────────────────────────────────
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

// ── Auto-scroll menu tabs to active ─────────────────────────────
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
});

// ── Boot ─────────────────────────────────────────────────────────
renderCakes();
