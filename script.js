const products = [
  { id:1, name:"iPhone 15 Pro", category:"Phones", price:55000, icon:"fa fa-mobile-alt", desc:"A17 Pro chip, Titanium design, 48MP camera system. The most powerful iPhone ever." },
  { id:2, name:"Samsung Galaxy S26 Ultra", category:"Phones", price:62000, icon:"fa fa-mobile-alt", desc:"200MP camera, S Pen included, AI-powered features. The ultimate Android flagship." },
  { id:3, name:"Xiaomi 14 Ultra", category:"Phones", price:38000, icon:"fa fa-mobile-alt", desc:"Leica cameras, Snapdragon 8 Gen 3, 90W fast charging." },
  { id:4, name:"OnePlus 13", category:"Phones", price:28000, icon:"fa fa-mobile-alt", desc:"Snapdragon 8 Elite, Hasselblad cameras, 100W SuperVOOC charging." },

  { id:5, name:"AirPods Pro 3", category:"AirPods", price:5500, icon:"fa fa-podcast", desc:"Active Noise Cancellation, Adaptive Audio, USB-C charging. Apple's best AirPods." },
  { id:6, name:"AirPods 4", category:"AirPods", price:3200, icon:"fa fa-podcast", desc:"Open-ear design, H2 chip, Personalized Spatial Audio." },
  { id:7, name:"Samsung Galaxy Buds 3 Pro", category:"AirPods", price:4000, icon:"fa fa-podcast", desc:"Blade-design earbuds, Hi-Fi audio, Intelligent ANC." },
  { id:8, name:"Nothing Ear 2", category:"AirPods", price:2800, icon:"fa fa-podcast", desc:"Transparent design, Dual coil drivers, 3-mic ANC." },

  { id:9, name:"Sony WH-1000XM6", category:"Headphones", price:7500, icon:"fa fa-headphones", desc:"Industry-leading ANC, 30hr battery, Crystal clear calls." },
  { id:10, name:"Apple AirPods Max 2", category:"Headphones", price:12000, icon:"fa fa-headphones", desc:"Premium over-ear headphones, Computational Audio, USB-C." },
  { id:11, name:"JBL Tour One M3", category:"Headphones", price:5500, icon:"fa fa-headphones", desc:"Adaptive ANC, 50hr playtime, foldable design." },
  { id:12, name:"Bose QuietComfort 45", category:"Headphones", price:8000, icon:"fa fa-headphones", desc:"World-class noise cancellation, balanced sound, all-day comfort." },

  { id:13, name:"Apple Watch Series 10", category:"Watches", price:18000, icon:"fa fa-clock", desc:"Thinnest Apple Watch ever, Advanced health sensors, Always-On display." },
  { id:14, name:"Samsung Galaxy Watch 7", category:"Watches", price:12000, icon:"fa fa-clock", desc:"BioActive Sensor 3.0, Sleep coaching, 40hr battery." },
  { id:15, name:"Xiaomi Smart Band 9 Pro", category:"Watches", price:1800, icon:"fa fa-clock", desc:"AMOLED display, 21-day battery, 150+ sports modes." },
  { id:16, name:"Garmin Fenix 8", category:"Watches", price:35000, icon:"fa fa-clock", desc:"Premium GPS watch, Solar charging, Advanced training metrics." },
];

// ============================================================
// THEME
// ============================================================
function applyTheme() {
  const theme = localStorage.getItem('tz-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = localStorage.getItem('tz-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('tz-theme', next);
  applyTheme();
}

applyTheme();

// ============================================================
// CART  (localStorage)
// ============================================================
function getCart() {
  return JSON.parse(localStorage.getItem('tz-cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('tz-cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: product.name, price: product.price, icon: product.icon, qty: 1 });
  }
  saveCart(cart);
  showToast(`✅ ${product.name} added to cart!`);
}
function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

// ============================================================
// SESSION STORAGE – recent views
// ============================================================
function recordView(productId) {
  let views = JSON.parse(sessionStorage.getItem('tz-recent') || '[]');
  if (!views.includes(productId)) {
    views.unshift(productId);
    if (views.length > 5) views = views.slice(0, 5);
    sessionStorage.setItem('tz-recent', JSON.stringify(views));
  }
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ============================================================
// NAV HAMBURGER
// ============================================================
function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

// Init badge
updateCartBadge();