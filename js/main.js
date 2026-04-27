'use strict';

/* ================================================================
   MAGNUM BAKES & CAKES — main.js
   Mini ordering system: every product has its own WhatsApp button
================================================================ */

// ── WhatsApp number ───────────────────────────────────────────────
const WA_NUMBER = '919346693818';

// ── Build WhatsApp URL ────────────────────────────────────────────
function waUrl(name, priceStr, details = '') {
  const msg =
    `Hi Magnum Bakes & Cakes! 🎂\n\n` +
    `I'd like to order:\n` +
    `*${name}*\n` +
    `Price: ${priceStr}` +
    (details ? `\n${details}` : '') +
    `\n\nPlease confirm availability and let me know the next steps. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Product Data ──────────────────────────────────────────────────

const CAKES = [
  { name: 'Pineapple',    price: '₹250 (½kg) / ₹500 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Butterscotch', price: '₹275 (½kg) / ₹550 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Blackforest',  price: '₹300 (½kg) / ₹600 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Chocolate',    price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Honey Almond', price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Blueberry',    price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg' },
  { name: 'Red Velvet',   price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg' },
];

const PASTRIES = [
  { name: 'Pineapple Pastry',    price: '₹40' },
  { name: 'Butterscotch Pastry', price: '₹45' },
  { name: 'Blackforest Pastry',  price: '₹55' },
  { name: 'Chocolate Pastry',    price: '₹70' },
  { name: 'Choco Lava',          price: '₹70' },
  { name: 'Honey Almond Pastry', price: '₹80' },
  { name: 'Rasamalai',           price: '₹80' },
  { name: 'Blue Berry Pastry',   price: '₹70' },
  { name: 'Donut',               price: '₹45' },
];

const BISCUITS = [
  { name: 'Osmania',        price: '₹300/kg', details: 'Per kilogram' },
  { name: 'Salt',           price: '₹300/kg', details: 'Per kilogram' },
  { name: 'Chand',          price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Badam',          price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Vanilla',        price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Choco Chip',     price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Pista',          price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Chocolate Kaju', price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Butterscotch',   price: '₹320/kg', details: 'Per kilogram' },
  { name: 'Almond',         price: '₹320/kg', details: 'Per kilogram' },
];

const PUFFS = [
  { name: 'Veg Puff',            price: '₹20' },
  { name: 'Egg Puff',            price: '₹25' },
  { name: 'Full Egg Puff',       price: '₹30' },
  { name: 'Chicken Puff',        price: '₹30' },
  { name: 'Paneer Puff',         price: '₹30' },
  { name: 'Chicken Tikka Puff',  price: '₹40' },
  { name: 'Paneer Tikka Puff',   price: '₹40' },
];

const PIZZA = [
  { name: 'Cheese Pizza',               price: '₹150' },
  { name: 'Veg Delight Pizza',          price: '₹170' },
  { name: 'Sweet Corn Pizza',           price: '₹180' },
  { name: 'Paneer Pizza',               price: '₹200' },
  { name: 'Chicken Pizza',              price: '₹200' },
  { name: 'Chicken Sweet Corn Pizza',   price: '₹220' },
  { name: 'Chicken Tikka Pizza',        price: '₹250' },
  { name: 'Veg Mexican Pizza',          price: '₹270' },
  { name: 'Chicken Mexican Pizza',      price: '₹290' },
];

const BURGERS = [
  { name: 'Crispy Veg Burger',    price: '₹70' },
  { name: 'Paneer Burger',        price: '₹80' },
  { name: 'Crispy Chicken Burger',price: '₹80' },
  { name: 'Chicken Tikka Burger', price: '₹90' },
  { name: 'Veg Hot Dog',          price: '₹70' },
  { name: 'Chicken Hot Dog',      price: '₹80' },
];

const SANDWICHES = [
  { name: 'Veg Grilled Sandwich',           price: '₹70' },
  { name: 'Paneer Grilled Sandwich',        price: '₹80' },
  { name: 'Chicken Grilled Sandwich',       price: '₹80' },
  { name: 'Chicken Tikka Grilled Sandwich', price: '₹90' },
];

const FRANKIES = [
  { name: 'Veg Frankie',          price: '₹70' },
  { name: 'Paneer Frankie',       price: '₹80' },
  { name: 'Chicken Frankie',      price: '₹80' },
  { name: 'Chicken Tikka Frankie',price: '₹90' },
];

const SNACKS = [
  { name: 'Veg Spring Roll',      price: '₹70' },
  { name: 'Chicken Spring Roll',  price: '₹80' },
  { name: 'French Fries Salted',  price: '₹80' },
  { name: 'French Fries Peri Peri',price:'₹90' },
  { name: 'Veg Strips',           price: '₹59 (3pc) / ₹119 (6pc)', details: 'Available in 3pc or 6pc' },
];

const FRIED = [
  { name: 'Chicken Popcorn',        price: '₹99 (Regular) / ₹149 (Medium)', details: 'Available in Regular or Medium' },
  { name: 'Chicken Wings',          price: '₹79 (3pcs) / ₹149 (6pcs)',      details: 'Available in 3pcs or 6pcs' },
  { name: 'Chicken Lollipops',      price: '₹89 (3pcs) / ₹159 (6pcs)',      details: 'Available in 3pcs or 6pcs' },
  { name: 'Chicken Boneless Strips',price: '₹89 (3pcs) / ₹159 (6pcs)',      details: 'Available in 3pcs or 6pcs' },
  { name: 'Chicken Drumsticks',     price: '₹69 (1pc)',                      details: 'Per piece' },
];

const MOJITOS = [
  { name: 'Lime Mojito',          price: '₹60' },
  { name: 'Green Mint Mojito',    price: '₹60' },
  { name: 'Blue Ocean Mojito',    price: '₹60' },
  { name: 'Strawberry Mojito',    price: '₹60' },
  { name: 'Black Current Mojito', price: '₹60' },
  { name: 'Rose Mojito',          price: '₹60' },
  { name: 'Pineapple Mojito',     price: '₹60' },
];

const SHAKES = [
  { name: 'Pineapple Shake',    price: '₹80' },
  { name: 'Butterscotch Shake', price: '₹80' },
  { name: 'Strawberry Shake',   price: '₹80' },
  { name: 'Chocolate Shake',    price: '₹80' },
  { name: 'Mango Shake',        price: '₹90' },
  { name: 'Black Current Shake',price: '₹80' },
  { name: 'Blueberry Shake',    price: '₹90' },
  { name: 'Honey Almond Shake', price: '₹100' },
  { name: 'Orange Shake',       price: '₹80' },
  { name: 'Oreo Shake',         price: '₹80' },
];

// ── Renderers ─────────────────────────────────────────────────────

// Standard menu-item row with Order Now button
function renderMenuItems(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(p => `
    <div class="menu-item">
      <div class="mi-name">${p.name}</div>
      <div class="menu-item-right">
        <div class="mi-price">${p.price}</div>
        <a href="${waUrl(p.name, p.price, p.details || '')}"
           target="_blank" rel="noopener"
           class="cake-order-btn cake-order-btn--sm"
           aria-label="Order ${p.name} on WhatsApp">Order Now</a>
      </div>
    </div>`).join('');
}

// Cake showcase rows (wider layout)
function renderShowcaseCakes(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = CAKES.map(p => `
    <div class="cake-row">
      <span class="ck-name">${p.name}</span>
      <div class="cake-row-right">
        <span class="ck-price">${p.price.replace(' (½kg)', '').replace(' (1kg)', '').split('/')[0].trim()} / ${p.price.split('/')[1] ? p.price.split('/')[1].replace('(1kg)','').trim() : ''}</span>
        <a href="${waUrl(p.name + ' Cake', p.price, p.details)}"
           target="_blank" rel="noopener"
           class="cake-order-btn"
           aria-label="Order ${p.name} Cake on WhatsApp">Order Now</a>
      </div>
    </div>`).join('');
}

// Biscuit grid items in the dark section — ghost style
function renderBiscuitGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = BISCUITS.map((p, i) => `
    <div class="bis-item${i >= 6 ? ' featured' : ''}">
      <div class="bis-left">
        <span class="bi-name">${p.name}</span>
        <span class="bi-price">${p.price}</span>
      </div>
      <a href="${waUrl(p.name + ' Biscuits', p.price, p.details)}"
         target="_blank" rel="noopener"
         class="cake-order-btn cake-order-btn--ghost"
         aria-label="Order ${p.name} Biscuits on WhatsApp">Order</a>
    </div>`).join('');
}

// ── Boot: render all sections ─────────────────────────────────────
function renderAll() {
  // Showcase cake list
  renderShowcaseCakes('showcaseCakeList');

  // Biscuit section grid (dark bg)
  renderBiscuitGrid('bisGrid');

  // All menu panels
  renderMenuItems('menuCakeList',       CAKES);
  renderMenuItems('menuPastriesList',   PASTRIES);
  renderMenuItems('menuBiscuitsList',   BISCUITS);
  renderMenuItems('menuPuffsList',      PUFFS);
  renderMenuItems('menuPizzaList',      PIZZA);
  renderMenuItems('menuBurgersList',    BURGERS);
  renderMenuItems('menuSandwichesList', SANDWICHES);
  renderMenuItems('menuFrankiesList',   FRANKIES);
  renderMenuItems('menuSnacksList',     SNACKS);
  renderMenuItems('menuFriedList',      FRIED);
  renderMenuItems('menuMojitosList',    MOJITOS);
  renderMenuItems('menuShakesList',     SHAKES);
}

// ── Nav scroll behaviour ──────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────────────────────────
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
document.querySelectorAll('#navLinks a').forEach(l =>
  l.addEventListener('click', () => { if (navOpen) toggleNav(); })
);
window.toggleNav = toggleNav;

// ── Menu tab switching ────────────────────────────────────────────
function switchTab(id) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) {
    panel.classList.add('active');
    document.querySelectorAll('.menu-tab').forEach(t => {
      if (t.dataset.tab === id) t.classList.add('active');
    });
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.switchTab = switchTab;

// ── Scroll reveal ─────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Gallery lightbox ──────────────────────────────────────────────
(function () {
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
      if (src) { img.src = src; overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
    });
  });
  overlay.addEventListener('click', () => { overlay.style.display = 'none'; document.body.style.overflow = ''; });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { overlay.style.display = 'none'; document.body.style.overflow = ''; }
  });
})();

// ── Auto-scroll active tab into view ─────────────────────────────
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
});

// ── Run ───────────────────────────────────────────────────────────
renderAll();
