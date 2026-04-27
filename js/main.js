'use strict';

/* ================================================================
   MAGNUM BAKES & CAKES — main.js
   Mini ordering system: every product has its own WhatsApp button
================================================================ */

// ── WhatsApp number ───────────────────────────────────────────────
const WA_NUMBER = '919346693818';

// ── Build WhatsApp URL ────────────────────────────────────────────
function waUrl(name, priceStr, details = '') {
  const lines = [
    'Hi Magnum Bakes & Cakes!',
    '',
    'I want to order this product.',
    `Product: ${name}`,
  ];
  if (priceStr) lines.push(`Price: ${priceStr}`);
  if (details) lines.push(`Details: ${details}`);
  lines.push('', 'Please confirm availability and let me know the next steps.');
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

const pexelsImage = photoId => `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=900`;
const COMMONS_PRODUCT_IMAGES = {
  'Rasamalai Cake.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Rasamalai_Cake.jpg/960px-Rasamalai_Cake.jpg',
  'Osmania biscuits from Hyderabad, India.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Osmania_biscuits_from_Hyderabad%2C_India.jpg/960px-Osmania_biscuits_from_Hyderabad%2C_India.jpg',
  'Sea salt Soda Crackers.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sea_salt_Soda_Crackers.jpg/960px-Sea_salt_Soda_Crackers.jpg',
  'Nankhatai biscuits.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Nankhatai_biscuits.jpg',
  'Biskut Almond London (Almond London biscuit) 20230425 083124.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Biskut_Almond_London_%28Almond_London_biscuit%29_20230425_083124.jpg/960px-Biskut_Almond_London_%28Almond_London_biscuit%29_20230425_083124.jpg',
  'Cookies and Vanilla (Unsplash).jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Cookies_and_Vanilla_%28Unsplash%29.jpg/960px-Cookies_and_Vanilla_%28Unsplash%29.jpg',
  'Choco chip cookie.png': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Choco_chip_cookie.png',
  'Pista biscuit at tea time Korattur Chennai India.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pista_biscuit_at_tea_time_Korattur_Chennai_India.jpg/960px-Pista_biscuit_at_tea_time_Korattur_Chennai_India.jpg',
  'Chocolate and butterscotch chip cookies, October 2008.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Chocolate_and_butterscotch_chip_cookies%2C_October_2008.jpg/960px-Chocolate_and_butterscotch_chip_cookies%2C_October_2008.jpg',
  'Butterscotch cookies in Kerala.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Butterscotch_cookies_in_Kerala.jpg/960px-Butterscotch_cookies_in_Kerala.jpg',
  'Rolled Almond Vanilla Cookies.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Rolled_Almond_Vanilla_Cookies.jpg/960px-Rolled_Almond_Vanilla_Cookies.jpg',
  'Karipap Chiang Mai.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Karipap_Chiang_Mai.jpg/960px-Karipap_Chiang_Mai.jpg',
  'Egg Puff1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Egg_Puff1.jpg',
  'Egg Puff2.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Egg_Puff2.jpg',
  'Paneer Burger.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Paneer_Burger.jpg/960px-Paneer_Burger.jpg',
  'Vegetable grill sandwich-Ahmedabad-Gujarat-0005.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vegetable_grill_sandwich-Ahmedabad-Gujarat-0005.jpg/960px-Vegetable_grill_sandwich-Ahmedabad-Gujarat-0005.jpg',
  'Kathi Roll.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Kathi_Roll.jpg/960px-Kathi_Roll.jpg',
  'Paneer kathi roll homemade.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Paneer_kathi_roll_homemade.jpg/960px-Paneer_kathi_roll_homemade.jpg',
  'Chicken-kathi-roll-recipe.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chicken-kathi-roll-recipe.jpg/960px-Chicken-kathi-roll-recipe.jpg',
  'Popcorn Chicken (54442218769).jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Popcorn_Chicken_%2854442218769%29.jpg/960px-Popcorn_Chicken_%2854442218769%29.jpg',
  'Virgin Mojito 01.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Virgin_Mojito_01.jpg/960px-Virgin_Mojito_01.jpg',
  'Strawberry Mojito (Unsplash).jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Strawberry_Mojito_%28Unsplash%29.jpg/960px-Strawberry_Mojito_%28Unsplash%29.jpg',
  'Gin & Cassis Long Drink.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Gin_%26_Cassis_Long_Drink.jpg/960px-Gin_%26_Cassis_Long_Drink.jpg',
  'Pineapple Milkshake.JPG': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pineapple_Milkshake.JPG/960px-Pineapple_Milkshake.JPG',
  'Strawberry Milkshake Whipped Cream.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Strawberry_Milkshake_Whipped_Cream.jpg/960px-Strawberry_Milkshake_Whipped_Cream.jpg',
  'Blueberry Milkshake.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Blueberry_Milkshake.jpg/960px-Blueberry_Milkshake.jpg',
};
const commonsImage = fileName => COMMONS_PRODUCT_IMAGES[fileName];

const ONLINE_PRODUCT_IMAGES = {
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
  butterscotchCake: pexelsImage('2688948'),
  redVelvetCake: pexelsImage('6133311'),
  blueberryCake: pexelsImage('3450560'),
  butterscotchPastry: pexelsImage('4161223'),
  chocolatePastry: pexelsImage('7149383'),
  chocoLava: pexelsImage('33674415'),
  honeyAlmondPastry: pexelsImage('5603293'),
  rasamalai: commonsImage('Rasamalai Cake.jpg'),
  blueberryPastry: pexelsImage('30206963'),
  pastry: pexelsImage('7149383'),
  donut: pexelsImage('6071166'),
  osmaniaBiscuits: commonsImage('Osmania biscuits from Hyderabad, India.jpg'),
  biscuits: commonsImage('Osmania biscuits from Hyderabad, India.jpg'),
  saltBiscuit: commonsImage('Sea salt Soda Crackers.jpg'),
  chandBiscuit: commonsImage('Nankhatai biscuits.jpg'),
  badamBiscuit: commonsImage('Biskut Almond London (Almond London biscuit) 20230425 083124.jpg'),
  vanillaBiscuit: commonsImage('Cookies and Vanilla (Unsplash).jpg'),
  chocoChipBiscuit: commonsImage('Choco chip cookie.png'),
  pistaBiscuit: commonsImage('Pista biscuit at tea time Korattur Chennai India.jpg'),
  chocolateKajuBiscuit: commonsImage('Chocolate and butterscotch chip cookies, October 2008.jpg'),
  butterscotchBiscuit: commonsImage('Butterscotch cookies in Kerala.jpg'),
  almondBiscuit: commonsImage('Rolled Almond Vanilla Cookies.jpg'),
  puff: commonsImage('Karipap Chiang Mai.jpg'),
  vegPuff: commonsImage('Karipap Chiang Mai.jpg'),
  eggPuff: commonsImage('Egg Puff1.jpg'),
  fullEggPuff: pexelsImage('33088912'),
  chickenPuff: pexelsImage('19498991'),
  paneerPuff: pexelsImage('19498991'),
  chickenTikkaPuff: pexelsImage('19498991'),
  paneerTikkaPuff: pexelsImage('19498991'),
  pizza: pexelsImage('1166120'),
  pizzaCheese: pexelsImage('1166120'),
  pizzaVeg: pexelsImage('14994698'),
  pizzaSweetCorn: pexelsImage('31450861'),
  pizzaPaneer: pexelsImage('19081126'),
  pizzaChicken: pexelsImage('5639547'),
  pizzaChickenSweetCorn: pexelsImage('5639548'),
  pizzaChickenTikka: pexelsImage('11176613'),
  pizzaVegMexican: pexelsImage('28219392'),
  pizzaChickenMexican: pexelsImage('35123984'),
  burger: pexelsImage('20722036'),
  burgerVeg: pexelsImage('20722036'),
  burgerPaneer: commonsImage('Paneer Burger.jpg'),
  burgerChicken: pexelsImage('1431305'),
  burgerChickenTikka: pexelsImage('11001165'),
  hotDog: pexelsImage('4113456'),
  sandwich: pexelsImage('1600711'),
  sandwichVeg: commonsImage('Vegetable grill sandwich-Ahmedabad-Gujarat-0005.jpg'),
  sandwichPaneer: pexelsImage('1600711'),
  sandwichChicken: pexelsImage('29285138'),
  sandwichChickenTikka: pexelsImage('29285138'),
  wrap: pexelsImage('461198'),
  frankieVeg: commonsImage('Kathi Roll.jpg'),
  frankiePaneer: commonsImage('Paneer kathi roll homemade.jpg'),
  frankieChicken: commonsImage('Chicken-kathi-roll-recipe.jpg'),
  springRoll: pexelsImage('15801051'),
  springRollVeg: pexelsImage('840216'),
  springRollChicken: pexelsImage('35407775'),
  fries: pexelsImage('8302768'),
  friesPeriPeri: pexelsImage('4109234'),
  fried: pexelsImage('2338407'),
  vegStrips: pexelsImage('33649030'),
  chickenPopcorn: commonsImage('Popcorn Chicken (54442218769).jpg'),
  chickenWings: pexelsImage('4061475'),
  chickenLollipops: pexelsImage('7868115'),
  chickenBonelessStrips: pexelsImage('37025062'),
  chickenDrumsticks: pexelsImage('28674536'),
  mojito: pexelsImage('28902894'),
  strawberryMojito: commonsImage('Strawberry Mojito (Unsplash).jpg'),
  blackCurrentMojito: pexelsImage('36825770'),
  pineappleMojito: pexelsImage('33673969'),
  milkshake: pexelsImage('8743871'),
  pineappleShake: pexelsImage('32647253'),
  butterscotchShake: pexelsImage('20066397'),
  strawberryShake: commonsImage('Strawberry Milkshake Whipped Cream.jpg'),
  chocolateShake: pexelsImage('9730380'),
  mangoShake: pexelsImage('32503389'),
  blackCurrentShake: pexelsImage('11136329'),
  blueberryShake: pexelsImage('11136329'),
  honeyAlmondShake: pexelsImage('6802632'),
  orangeShake: pexelsImage('20205954'),
  oreoShake: pexelsImage('27411756'),
};

const PRODUCT_IMAGE_OVERRIDES = {
  Butterscotch: ONLINE_PRODUCT_IMAGES.butterscotchCake,
  Blueberry: ONLINE_PRODUCT_IMAGES.blueberryCake,
  'Red Velvet': ONLINE_PRODUCT_IMAGES.redVelvetCake,
  'Butterscotch Pastry': ONLINE_PRODUCT_IMAGES.butterscotchPastry,
  'Chocolate Pastry': ONLINE_PRODUCT_IMAGES.chocolatePastry,
  'Choco Lava': ONLINE_PRODUCT_IMAGES.chocoLava,
  'Honey Almond Pastry': ONLINE_PRODUCT_IMAGES.honeyAlmondPastry,
  Rasamalai: ONLINE_PRODUCT_IMAGES.rasamalai,
  'Blue Berry Pastry': ONLINE_PRODUCT_IMAGES.blueberryPastry,
  Donut: ONLINE_PRODUCT_IMAGES.donut,
  Osmania: ONLINE_PRODUCT_IMAGES.osmaniaBiscuits,
  Salt: ONLINE_PRODUCT_IMAGES.saltBiscuit,
  Chand: ONLINE_PRODUCT_IMAGES.chandBiscuit,
  Badam: ONLINE_PRODUCT_IMAGES.badamBiscuit,
  Vanilla: ONLINE_PRODUCT_IMAGES.vanillaBiscuit,
  'Choco Chip': ONLINE_PRODUCT_IMAGES.chocoChipBiscuit,
  Pista: ONLINE_PRODUCT_IMAGES.pistaBiscuit,
  'Chocolate Kaju': ONLINE_PRODUCT_IMAGES.chocolateKajuBiscuit,
  'Butterscotch Biscuit': ONLINE_PRODUCT_IMAGES.butterscotchBiscuit,
  Almond: ONLINE_PRODUCT_IMAGES.almondBiscuit,
  'Veg Puff': ONLINE_PRODUCT_IMAGES.vegPuff,
  'Egg Puff': ONLINE_PRODUCT_IMAGES.eggPuff,
  'Full Egg Puff': ONLINE_PRODUCT_IMAGES.fullEggPuff,
  'Chicken Puff': ONLINE_PRODUCT_IMAGES.chickenPuff,
  'Paneer Puff': ONLINE_PRODUCT_IMAGES.paneerPuff,
  'Chicken Tikka Puff': ONLINE_PRODUCT_IMAGES.chickenTikkaPuff,
  'Paneer Tikka Puff': ONLINE_PRODUCT_IMAGES.paneerTikkaPuff,
  'Cheese Pizza': ONLINE_PRODUCT_IMAGES.pizzaCheese,
  'Veg Delight Pizza': ONLINE_PRODUCT_IMAGES.pizzaVeg,
  'Sweet Corn Pizza': ONLINE_PRODUCT_IMAGES.pizzaSweetCorn,
  'Paneer Pizza': ONLINE_PRODUCT_IMAGES.pizzaPaneer,
  'Chicken Pizza': ONLINE_PRODUCT_IMAGES.pizzaChicken,
  'Chicken Sweet Corn Pizza': ONLINE_PRODUCT_IMAGES.pizzaChickenSweetCorn,
  'Chicken Tikka Pizza': ONLINE_PRODUCT_IMAGES.pizzaChickenTikka,
  'Veg Mexican Pizza': ONLINE_PRODUCT_IMAGES.pizzaVegMexican,
  'Chicken Mexican Pizza': ONLINE_PRODUCT_IMAGES.pizzaChickenMexican,
  'Crispy Veg Burger': ONLINE_PRODUCT_IMAGES.burgerVeg,
  'Paneer Burger': ONLINE_PRODUCT_IMAGES.burgerPaneer,
  'Crispy Chicken Burger': ONLINE_PRODUCT_IMAGES.burgerChicken,
  'Chicken Tikka Burger': ONLINE_PRODUCT_IMAGES.burgerChickenTikka,
  'Veg Hot Dog': ONLINE_PRODUCT_IMAGES.hotDog,
  'Chicken Hot Dog': ONLINE_PRODUCT_IMAGES.hotDog,
  'Veg Grilled Sandwich': ONLINE_PRODUCT_IMAGES.sandwichVeg,
  'Paneer Grilled Sandwich': ONLINE_PRODUCT_IMAGES.sandwichPaneer,
  'Chicken Grilled Sandwich': ONLINE_PRODUCT_IMAGES.sandwichChicken,
  'Chicken Tikka Grilled Sandwich': ONLINE_PRODUCT_IMAGES.sandwichChickenTikka,
  'Veg Frankie': ONLINE_PRODUCT_IMAGES.frankieVeg,
  'Paneer Frankie': ONLINE_PRODUCT_IMAGES.frankiePaneer,
  'Chicken Frankie': ONLINE_PRODUCT_IMAGES.frankieChicken,
  'Chicken Tikka Frankie': ONLINE_PRODUCT_IMAGES.frankieChicken,
  'Veg Spring Roll': ONLINE_PRODUCT_IMAGES.springRollVeg,
  'Chicken Spring Roll': ONLINE_PRODUCT_IMAGES.springRollChicken,
  'French Fries Salted': ONLINE_PRODUCT_IMAGES.fries,
  'French Fries Peri Peri': ONLINE_PRODUCT_IMAGES.friesPeriPeri,
  'Veg Strips': ONLINE_PRODUCT_IMAGES.vegStrips,
  'Chicken Popcorn': ONLINE_PRODUCT_IMAGES.chickenPopcorn,
  'Chicken Wings': ONLINE_PRODUCT_IMAGES.chickenWings,
  'Chicken Lollipops': ONLINE_PRODUCT_IMAGES.chickenLollipops,
  'Chicken Boneless Strips': ONLINE_PRODUCT_IMAGES.chickenBonelessStrips,
  'Chicken Drumsticks': ONLINE_PRODUCT_IMAGES.chickenDrumsticks,
  'Lime Mojito': ONLINE_PRODUCT_IMAGES.mojito,
  'Strawberry Mojito': ONLINE_PRODUCT_IMAGES.strawberryMojito,
  'Black Current Mojito': ONLINE_PRODUCT_IMAGES.blackCurrentMojito,
  'Pineapple Mojito': ONLINE_PRODUCT_IMAGES.pineappleMojito,
  'Pineapple Shake': ONLINE_PRODUCT_IMAGES.pineappleShake,
  'Butterscotch Shake': ONLINE_PRODUCT_IMAGES.butterscotchShake,
  'Strawberry Shake': ONLINE_PRODUCT_IMAGES.strawberryShake,
  'Chocolate Shake': ONLINE_PRODUCT_IMAGES.chocolateShake,
  'Mango Shake': ONLINE_PRODUCT_IMAGES.mangoShake,
  'Black Current Shake': ONLINE_PRODUCT_IMAGES.blackCurrentShake,
  'Blueberry Shake': ONLINE_PRODUCT_IMAGES.blueberryShake,
  'Honey Almond Shake': ONLINE_PRODUCT_IMAGES.honeyAlmondShake,
  'Orange Shake': ONLINE_PRODUCT_IMAGES.orangeShake,
  'Oreo Shake': ONLINE_PRODUCT_IMAGES.oreoShake,
};

const ONLINE_IMAGE_RULES = [
  { test: /red velvet/i, image: ONLINE_PRODUCT_IMAGES.redVelvetCake },
  { test: /blueberry|blue berry/i, image: ONLINE_PRODUCT_IMAGES.blueberryCake },
  { test: /donut/i, image: ONLINE_PRODUCT_IMAGES.donut },
  { test: /choco lava/i, image: ONLINE_PRODUCT_IMAGES.chocoLava },
  { test: /chocolate pastry/i, image: ONLINE_PRODUCT_IMAGES.chocolatePastry },
  { test: /rasamalai/i, image: ONLINE_PRODUCT_IMAGES.rasamalai },
  { test: /pastry/i, image: ONLINE_PRODUCT_IMAGES.pastry },
  { test: /biscuit|osmania|salt|chand|badam|vanilla|choco chip|pista|kaju|almond/i, image: ONLINE_PRODUCT_IMAGES.biscuits },
  { test: /puff/i, image: ONLINE_PRODUCT_IMAGES.puff },
  { test: /pizza/i, image: ONLINE_PRODUCT_IMAGES.pizza },
  { test: /hot dog/i, image: ONLINE_PRODUCT_IMAGES.hotDog },
  { test: /burger/i, image: ONLINE_PRODUCT_IMAGES.burger },
  { test: /sandwich/i, image: ONLINE_PRODUCT_IMAGES.sandwich },
  { test: /frankie/i, image: ONLINE_PRODUCT_IMAGES.wrap },
  { test: /spring roll/i, image: ONLINE_PRODUCT_IMAGES.springRoll },
  { test: /fries/i, image: ONLINE_PRODUCT_IMAGES.fries },
  { test: /wings|lollipops/i, image: ONLINE_PRODUCT_IMAGES.chickenWings },
  { test: /popcorn|boneless|drumsticks|strips/i, image: ONLINE_PRODUCT_IMAGES.fried },
  { test: /mojito/i, image: ONLINE_PRODUCT_IMAGES.mojito },
  { test: /shake/i, image: ONLINE_PRODUCT_IMAGES.milkshake },
];

function onlineProductImage(productName) {
  const match = ONLINE_IMAGE_RULES.find(rule => rule.test.test(productName));
  return match ? match.image : '';
}

function productImage(product, fallback) {
  const imageKey = product.imageKey || product.name;
  return product.img || PRODUCT_IMAGE_OVERRIDES[imageKey] || onlineProductImage(product.name) || fallback || 'images/storefront.jpeg';
}

function productAlt(product) {
  return `${product.name} at Magnum Bakes and Cakes`;
}

// ── Product Data ──────────────────────────────────────────────────

const CAKES = [
  { name: 'Pineapple',    price: '₹250 (½kg) / ₹500 (1kg)',  details: 'Available in ½kg and 1kg', img: 'images/products/Pineapple Cake.jpg', tag: 'Fresh Today' },
  { name: 'Butterscotch', price: '₹275 (½kg) / ₹550 (1kg)',  details: 'Available in ½kg and 1kg', img: 'images/products/Butterscotch Cake.jpg', tag: 'Best Seller' },
  { name: 'Blackforest',  price: '₹300 (½kg) / ₹600 (1kg)',  details: 'Available in ½kg and 1kg', img: 'images/products/Black Forest Cake.jpg', tag: 'Best Seller' },
  { name: 'Chocolate',    price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg', img: 'images/products/Chocolate Cake.jpg', tag: 'Custom Available' },
  { name: 'Honey Almond', price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg', img: 'images/products/Honey Almond Cake.jpg', tag: 'Premium' },
  { name: 'Blueberry',    price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg', img: ONLINE_PRODUCT_IMAGES.blueberryCake },
  { name: 'Red Velvet',   price: '₹400 (½kg) / ₹800 (1kg)',  details: 'Available in ½kg and 1kg', img: ONLINE_PRODUCT_IMAGES.redVelvetCake },
];

const PASTRIES = [
  { name: 'Pineapple Pastry',    price: '₹40', img: 'images/products/Pineapple Pastry.jpg' },
  { name: 'Butterscotch Pastry', price: '₹45', img: 'images/products/Butterscotch Pastry.jpg' },
  { name: 'Blackforest Pastry',  price: '₹55', img: 'images/products/Black Forest Pastry.jpg' },
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
  { name: 'Butterscotch',   price: '₹320/kg', details: 'Per kilogram', imageKey: 'Butterscotch Biscuit' },
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
  { name: 'Green Mint Mojito',    price: '₹60', img: 'images/products/Green Mint Mojito.jpg' },
  { name: 'Blue Ocean Mojito',    price: '₹60', img: 'images/products/Blue Ocean Mojito.jpg' },
  { name: 'Strawberry Mojito',    price: '₹60' },
  { name: 'Black Current Mojito', price: '₹60' },
  { name: 'Rose Mojito',          price: '₹60', img: 'images/products/Rose Mojito.jpg' },
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

// Product cards with item-specific Order Now buttons
function renderMenuItems(containerId, products, fallbackImage, defaultTag = '') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(p => {
    const details = p.details || '';
    const price = p.price || '';
    const tag = p.tag || defaultTag;
    return `
      <div class="menu-item product-card">
        <div class="product-card-img">
          <img src="${escapeHtml(productImage(p, fallbackImage))}" alt="${escapeHtml(productAlt(p))}" loading="lazy">
          ${tag ? `<div class="product-card-tag">${escapeHtml(tag)}</div>` : ''}
        </div>
        <div class="product-card-body">
          <div class="mi-name">${escapeHtml(p.name)}</div>
          ${price ? `<div class="mi-price">${escapeHtml(price)}</div>` : ''}
          ${details ? `<div class="mi-details">${escapeHtml(details)}</div>` : ''}
          <a href="${waUrl(p.name, price, details)}"
             target="_blank" rel="noopener"
             class="cake-order-btn cake-order-btn--sm"
             aria-label="Order ${escapeHtml(p.name)} on WhatsApp">Order Now</a>
        </div>
      </div>`;
  }).join('');
}

// Cake showcase rows (wider layout)
function renderShowcaseCakes(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = CAKES.map(p => `
    <div class="cake-row">
      <span class="ck-name">${escapeHtml(p.name)}</span>
      <div class="cake-row-right">
        <span class="ck-price">${escapeHtml(p.price.replace(' (½kg)', '').replace(' (1kg)', '').split('/')[0].trim())} / ${p.price.split('/')[1] ? escapeHtml(p.price.split('/')[1].replace('(1kg)','').trim()) : ''}</span>
        <a href="${waUrl(p.name + ' Cake', p.price, p.details)}"
           target="_blank" rel="noopener"
           class="cake-order-btn"
           aria-label="Order ${escapeHtml(p.name)} Cake on WhatsApp">Order Now</a>
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
        <span class="bi-name">${escapeHtml(p.name)}</span>
        <span class="bi-price">${escapeHtml(p.price)}</span>
      </div>
      <a href="${waUrl(p.name + ' Biscuits', p.price, p.details)}"
         target="_blank" rel="noopener"
         class="cake-order-btn cake-order-btn--ghost"
         aria-label="Order ${escapeHtml(p.name)} Biscuits on WhatsApp">Order Now</a>
    </div>`).join('');
}

// ── Boot: render all sections ─────────────────────────────────────
function renderAll() {
  // Showcase cake list
  renderShowcaseCakes('showcaseCakeList');

  // Biscuit section grid (dark bg)
  renderBiscuitGrid('bisGrid');

  // All menu panels
  renderMenuItems('menuCakeList',       CAKES, 'images/cakes-display.jpeg', 'Custom Available');
  renderMenuItems('menuPastriesList',   PASTRIES, 'images/cakes-display.jpeg', 'Fresh Today');
  renderMenuItems('menuBiscuitsList',   BISCUITS, 'images/biscuits.jpeg', 'Per Kg');
  renderMenuItems('menuPuffsList',      PUFFS, 'images/cakes-display.jpeg', 'Fresh Today');
  renderMenuItems('menuPizzaList',      PIZZA, 'images/storefront.jpeg', 'Made to Order');
  renderMenuItems('menuBurgersList',    BURGERS, 'images/storefront.jpeg', 'Hot & Fresh');
  renderMenuItems('menuSandwichesList', SANDWICHES, 'images/storefront.jpeg', 'Grilled Fresh');
  renderMenuItems('menuFrankiesList',   FRANKIES, 'images/storefront.jpeg', 'Rolled Fresh');
  renderMenuItems('menuSnacksList',     SNACKS, 'images/storefront.jpeg', 'Quick Bite');
  renderMenuItems('menuFriedList',      FRIED, 'images/storefront.jpeg', 'Crispy');
  renderMenuItems('menuMojitosList',    MOJITOS, 'images/storefront.jpeg', 'Chilled');
  renderMenuItems('menuShakesList',     SHAKES, 'images/storefront.jpeg', 'Fresh Blend');
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
