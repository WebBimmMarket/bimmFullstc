/* ===========================
   BIMM Market - Full Stack Version
   - Optimized for Next.js API Routes
   - Preserves all original functionality
   =========================== */

const CLOUDINARY_CLOUD_NAME = 'dd15fn6zr';
const CLOUDINARY_UPLOAD_PRESET = 'Bimm Market';
const WA_DEFAULT = '6280000000000';

/* ===== DOM HELPERS ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const UI = {
  toast: $('#toast'),
  loader: $('#loader'),
  yearNow: $('#yearNow'),
  yearNow2: $('.yearNow2'),
  tabs: $$('.bottom-nav button'),
  secHome: $('#secHome'),
  secProduk: $('#secProduk'),
  secTransaksi: $('#secTransaksi'),
  secProfil: $('#secProfil'),
  secPengaturan: $('#secPengaturan'),
  btnResetPassProfile: $('#btnResetPassProfile'),
  btnBurger: $('#btnBurger'),
  drawerBackdrop: $('#drawerBackdrop'),
  drawer: $('#drawer'),
  btnCloseDrawer: $('#btnCloseDrawer'),
  drawerContacts: $('#drawerContacts'),
  btnOpenContacts: $('#btnOpenContacts'),
  btnOpenRanking: $('#btnOpenRanking'),
  btnLogin: $('#btnLogin'),
  loginModal: $('#loginModal'),
  btnCloseLogin: $('#btnCloseLogin'),
  btnGoogleAuth: $('#btnGoogleAuth'),
  authMsg: $('#authMsg'),
  profileBox: $('#profileBox'),
  profileEditor: $('#profileEditor'),
  pfName: $('#pfName'),
  pfPhoto: $('#pfPhoto'),
  btnSaveProfile: $('#btnSaveProfile'),
  btnLogout: $('#btnLogout'),
  btnVerifyResend: $('#btnVerifyResend'),
  zoomModal: $('#zoomModal'),
  zoomImg: $('#zoomImg'),
  btnCloseZoom: $('#btnCloseZoom'),
  searchInput: $('#searchInput'),
  sortSelect: $('#sortSelect'),
  breadcrumb: $('#breadcrumb'),
  levelWrap: $('#levelWrap'),
  btnCart: $('#btnCart'),
  cartCount: $('#cartCount'),
  cartModal: $('#cartModal'),
  btnCloseCart: $('#btnCloseCart'),
  cartItems: $('#cartItems'),
  cartTotal: $('#cartTotal'),
  btnClearCart: $('#btnClearCart'),
  btnCheckout: $('#btnCheckout'),
  checkoutModal: $('#checkoutModal'),
  btnCloseCheckout: $('#btnCloseCheckout'),
  checkoutNote: $('#checkoutNote'),
  coName: $('#coName'),
  coEmail: $('#coEmail'),
  coWA: $('#coWA'),
  coNotes: $('#coNotes'),
  coPayMethod: $('#coPayMethod'),
  coProof: $('#coProof'),
  coProofHint: $('#coProofHint'),
  btnUploadProof: $('#btnUploadProof'),
  proofStatus: $('#proofStatus'),
  coProofUrl: $('#coProofUrl'),
  payDetail: $('#payDetail'),
  payDetailText: $('#payDetailText'),
  payDetailActions: $('#payDetailActions'),
  payDetailQris: $('#payDetailQris'),
  btnSubmitOrder: $('#btnSubmitOrder'),
  btnCheckoutWA: $('#btnCheckoutWA'),
  annModal: $('#annModal'),
  annTitle: $('#annTitle'),
  annBody: $('#annBody'),
  annImg: $('#annImg'),
  btnCloseAnn: $('#btnCloseAnn'),
  rankModal: $('#rankModal'),
  rankList: $('#rankList'),
  btnCloseRank: $('#btnCloseRank'),
  txList: $('#txList'),
  txDetailModal: $('#txDetailModal'),
  btnCloseTxDetail: $('#btnCloseTxDetail'),
  txDetailContent: $('#txDetailContent'),
  contactButtons: $('#contactButtons'),
  statProducts: $('#statProducts'),
  statCategories: $('#statCategories'),
  statOrders: $('#statOrders'),
  popularProductsGrid: $('#popularProductsGrid'),
  popularCategoriesGrid: $('#popularCategoriesGrid'),
  recentTxSlides: $('#recentTxSlides'),
  txDots: $('#txDots')
};

/* ===== UI UTILS ===== */
function showToast(msg, ms = 2200) {
  if (!UI.toast) return;
  UI.toast.textContent = msg;
  UI.toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => UI.toast.classList.remove('show'), ms);
}

function showLoader(msg = 'Memuat...') {
  if (!UI.loader) return;
  UI.loader.textContent = msg;
  UI.loader.classList.add('show');
}

function hideLoader() {
  if (!UI.loader) return;
  UI.loader.classList.remove('show');
  UI.loader.textContent = '';
}

function closeModal(el) {
  if (!el) return;
  const backdrop = el.classList.contains('modal-backdrop') ? el : el.closest('.modal-backdrop');
  if (backdrop) backdrop.classList.remove('show');
}

function openModal(el) {
  if (el) el.classList.add('show');
}

function fmtRp(v) {
  const n = Number(String(v ?? '0').replace(/[^0-9]/g, '')) || 0;
  return 'Rp ' + n.toLocaleString('id-ID');
}

function escapeHtml(s) {
  return (s ?? '').toString().replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function getTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Baru saja';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  return `${Math.floor(seconds / 86400)} hari lalu`;
}

function normalizeImageUrl(u) {
  u = (u || '').toString().trim();
  if (!u) return '';

  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('//')) return 'https:' + u;

  if (u.match(/^images\/\d+\//)) {
    return 'https://img1.pixhost.to/' + u;
  }

  if (u.startsWith('images/') || u.startsWith('image/upload/') || u.startsWith('video/upload/')) {
    return 'https://res.cloudinary.com/dovx3ruli/' + u.replace(/^\//, '');
  }

  if (u.includes('res.cloudinary.com') && !/^https?:/i.test(u)) {
    return 'https://' + u.replace(/^\/+/, '');
  }
  if (u.startsWith('/')) return window.location.origin + u;
  return window.location.origin + '/' + u;
}

/* ===== CLOUDINARY UPLOAD ===== */
async function uploadToCloudinary(file, folder = 'bys/orders') {
  if (!file) throw new Error('File bukti wajib');
  if (!file.type?.startsWith('image/')) throw new Error('Bukti harus gambar');
  if (file.size > 10 * 1024 * 1024) throw new Error('Ukuran gambar max 10MB');
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', String(CLOUDINARY_UPLOAD_PRESET || '').trim());
  form.append('folder', folder);
  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    let msg = res.statusText || 'Upload gagal';
    try {
      const j = await res.json();
      msg = j?.error?.message || j?.message || JSON.stringify(j);
    } catch (_) {
      try {
        msg = await res.text();
      } catch (__) {}
    }
    throw new Error(msg);
  }
  const data = await res.json();
  if (!data?.secure_url) throw new Error('Upload gagal (no url)');
  return data.secure_url;
}

/* ===== APP STATE ===== */
const State = {
  user: null,
  categories: [],
  products: [],
  popularProducts: [],
  cart: [],
  directCheckoutItem: null,
  paymentMethods: [],
  waAdmins: [],
  contactLinks: [],
  announcements: [],
  rankings: [],
  welcome: null,
  level: 'category',
  pickedMain: null,
  pickedSub: null,
  search: '',
  sort: 'popular'
};

/* ===== AUTH (Mock for now - can integrate with Firebase later) ===== */
function checkAuth() {
  const storedUser = localStorage.getItem('bimm_user');
  if (storedUser) {
    try {
      State.user = JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse stored user', e);
    }
  }
  updateAuthUI();
}

function updateAuthUI() {
  if (State.user) {
    UI.btnLogin.textContent = 'Profil';
  } else {
    UI.btnLogin.textContent = 'Login';
  }
}

async function loginWithGoogle() {
  showToast('Google login akan diimplementasikan dengan Firebase backend');
  // TODO: Implement Firebase Google Auth
}

async function logout() {
  State.user = null;
  localStorage.removeItem('bimm_user');
  State.cart = [];
  saveCart();
  updateCartBadge();
  updateAuthUI();
  setActiveTab('home');
  showToast('Logout berhasil');
}

/* ===== DATA FETCHING ===== */
async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    if (data.products) UI.statProducts.textContent = data.products;
    if (data.categories) UI.statCategories.textContent = data.categories;
    if (data.orders) UI.statOrders.textContent = data.orders;
  } catch (e) {
    console.error('Failed to load stats', e);
  }
}

async function loadProducts() {
  try {
    const params = new URLSearchParams();
    if (State.search) params.append('search', State.search);
    if (State.sort) params.append('sort', State.sort);
    if (State.pickedMain) params.append('category', State.pickedMain.key);
    if (State.pickedSub) params.append('subCategory', State.pickedSub.key);

    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    State.products = data.products || [];
  } catch (e) {
    console.error('Failed to load products', e);
  }
}

async function loadCategories() {
  try {
    const res = await fetch('/api/categories');
    const data = await res.json();
    State.categories = data.categories || [];
  } catch (e) {
    console.error('Failed to load categories', e);
  }
}

async function loadPaymentMethods() {
  try {
    const res = await fetch('/api/payment-methods');
    const data = await res.json();
    State.paymentMethods = data.paymentMethods || [];
  } catch (e) {
    console.error('Failed to load payment methods', e);
  }
}

async function loadContactLinks() {
  try {
    const res = await fetch('/api/contact-links');
    const data = await res.json();
    State.contactLinks = data.contactLinks || [];
  } catch (e) {
    console.error('Failed to load contact links', e);
  }
}

async function loadWaAdmins() {
  try {
    const res = await fetch('/api/wa-admins');
    const data = await res.json();
    State.waAdmins = data.waAdmins || [];
  } catch (e) {
    console.error('Failed to load WA admins', e);
  }
}

async function loadAnnouncements() {
  try {
    const res = await fetch('/api/announcements');
    const data = await res.json();
    State.announcements = data.announcements || [];
    renderAnnouncements();
  } catch (e) {
    console.error('Failed to load announcements', e);
  }
}

async function loadOrders() {
  if (!State.user) return;
  try {
    const res = await fetch(`/api/orders?userId=${State.user.id}`);
    const data = await res.json();
    renderOrders(data.orders || []);
  } catch (e) {
    console.error('Failed to load orders', e);
  }
}

async function loadRecentTransactions() {
  try {
    const res = await fetch('/api/orders?status=success&limit=10');
    const data = await res.json();
    renderRecentTransactions(data.orders || []);
  } catch (e) {
    console.error('Failed to load recent transactions', e);
  }
}

/* ===== RENDER FUNCTIONS ===== */
function renderCategories() {
  if (State.level === 'category') {
    const mainCats = State.categories.filter(c => c.isMain);
    UI.levelWrap.innerHTML = mainCats.map(cat => `
      <div class="cat-card" data-key="${escapeHtml(cat.key)}">
        <div class="cat-img-area">
          ${cat.iconUrl ? `<img src="${normalizeImageUrl(cat.iconUrl)}" alt="${escapeHtml(cat.name)}" />` : ''}
          <div class="cat-placeholder">${cat.name.charAt(0)}</div>
        </div>
        <div class="cat-info">
          <div class="cat-title">${escapeHtml(cat.name)}</div>
          <div class="cat-price-info">
            <div class="cat-price-label">Mulai dari</div>
            <div class="cat-price">Lihat Produk</div>
          </div>
        </div>
      </div>
    `).join('');

    // Add click handlers
    $$('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.key;
        const cat = State.categories.find(c => c.key === key);
        if (cat) {
          State.pickedMain = cat;
          State.level = 'subcategory';
          renderBreadcrumb();
          renderCategories();
        }
      });
    });
  } else if (State.level === 'subcategory') {
    const subCats = State.categories.filter(c => !c.isMain);
    UI.levelWrap.innerHTML = subCats.map(cat => `
      <div class="cat-card" data-key="${escapeHtml(cat.key)}">
        <div class="cat-img-area">
          ${cat.iconUrl ? `<img src="${normalizeImageUrl(cat.iconUrl)}" alt="${escapeHtml(cat.name)}" />` : ''}
          <div class="cat-placeholder">${cat.name.charAt(0)}</div>
        </div>
        <div class="cat-info">
          <div class="cat-title">${escapeHtml(cat.name)}</div>
          <div class="cat-price-info">
            <div class="cat-price-label">Mulai dari</div>
            <div class="cat-price">Lihat Produk</div>
          </div>
        </div>
      </div>
    `).join('');

    $$('.cat-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.key;
        const cat = State.categories.find(c => c.key === key);
        if (cat) {
          State.pickedSub = cat;
          State.level = 'products';
          renderBreadcrumb();
          loadProducts().then(() => renderProducts());
        }
      });
    });
  } else if (State.level === 'products') {
    renderProducts();
  }
}

function renderBreadcrumb() {
  let html = `<span class="crumb ${State.level === 'category' ? 'active' : ''}" data-level="category">🏠 Home</span>`;

  if (State.pickedMain) {
    html += `<span class="crumb ${State.level === 'subcategory' ? 'active' : ''}" data-level="subcategory">${escapeHtml(State.pickedMain.name)}</span>`;
  }

  if (State.pickedSub) {
    html += `<span class="crumb ${State.level === 'products' ? 'active' : ''}" data-level="products">${escapeHtml(State.pickedSub.name)}</span>`;
  }

  UI.breadcrumb.innerHTML = html;

  // Add click handlers
  $$('.crumb').forEach(crumb => {
    crumb.addEventListener('click', () => {
      const level = crumb.dataset.level;
      if (level === 'category') {
        State.level = 'category';
        State.pickedMain = null;
        State.pickedSub = null;
      } else if (level === 'subcategory') {
        State.level = 'subcategory';
        State.pickedSub = null;
      }
      renderBreadcrumb();
      renderCategories();
    });
  });
}

function renderProducts() {
  const products = State.products.map(p => {
    let price = p.price;
    let showDiscount = false;

    if (p.discountActive && p.discountPercent) {
      const now = new Date();
      const start = p.discountStart ? new Date(p.discountStart) : null;
      const end = p.discountEnd ? new Date(p.discountEnd) : null;

      if ((!start || now >= start) && (!end || now <= end)) {
        price = p.price * (1 - p.discountPercent / 100);
        showDiscount = true;
      }
    }

    return { ...p, finalPrice: price, showDiscount };
  });

  UI.levelWrap.innerHTML = products.map(p => `
    <div class="prod-grid-card" data-id="${p.id}">
      <div class="img-area">
        ${p.image || p.imageUrl ? `<img src="${normalizeImageUrl(p.image || p.imageUrl)}" alt="${escapeHtml(p.name)}" />` : '<div class="cat-placeholder">📦</div>'}
        ${p.showDiscount ? `<div class="cat-badge">-${p.discountPercent}%</div>` : ''}
      </div>
      <div class="info">
        <div class="p-title">${escapeHtml(p.name)}</div>
        <div class="p-price">${fmtRp(p.finalPrice)}</div>
        ${p.showDiscount ? `<div class="small" style="text-decoration: line-through; color: var(--muted);">${fmtRp(p.price)}</div>` : ''}
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="pixel-btn" style="flex: 1; font-size: 10px;" data-action="cart">Tambah</button>
          <button class="pixel-btn yellow" style="flex: 1; font-size: 10px;" data-action="checkout">Checkout</button>
        </div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  $$('.prod-grid-card').forEach(card => {
    const prodId = card.dataset.id;
    const product = State.products.find(p => p.id === prodId);

    card.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const subKey = State.pickedSub ? State.pickedSub.key : State.pickedMain.key;

        if (action === 'cart') {
          addToCart(product, subKey);
        } else if (action === 'checkout') {
          directCheckout(product, subKey);
        }
      });
    });

    // Zoom on image click
    const img = card.querySelector('.img-area img');
    if (img) {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openZoom(normalizeImageUrl(img.src));
      });
    }
  });
}

function renderOrders(orders) {
  if (!orders || orders.length === 0) {
    UI.txList.innerHTML = '<div class="small" style="text-align: center; padding: 20px;">Belum ada transaksi.</div>';
    return;
  }

  UI.txList.innerHTML = orders.map(order => {
    const statusColor = {
      'pending': 'var(--muted)',
      'paid': 'var(--success)',
      'proses': 'var(--accent1)',
      'selesai': 'var(--accent2)',
      'canceled': 'var(--danger)'
    }[order.status] || 'var(--muted)';

    const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

    return `
      <div class="pixel-card item" style="padding: 12px; cursor: pointer;" data-id="${order.id}">
        <div class="ico">📦</div>
        <div class="txt">
          <div class="t">${escapeHtml(order.orderNumber)}</div>
          <div class="d">${escapeHtml(order.name)} - ${fmtRp(order.total)}</div>
          <div class="d" style="color: ${statusColor}; font-weight: bold;">${order.status.toUpperCase()}</div>
          <div class="d" style="color: var(--muted);">${getTimeAgo(createdAt)}</div>
        </div>
        <div class="tile-chev">›</div>
      </div>
    `;
  }).join('');

  // Add click handlers for order details
  $$('#txList [data-id]').forEach(item => {
    item.addEventListener('click', () => {
      const orderId = item.dataset.id;
      const order = orders.find(o => o.id === orderId);
      if (order) openOrderDetail(order);
    });
  });
}

function renderRecentTransactions(orders) {
  if (!orders || orders.length === 0) {
    UI.recentTxSlides.innerHTML = `
      <div class="recent-tx-empty" style="min-width: 100%; padding: 40px 20px;">
        <div class="recent-tx-empty-icon">📦</div>
        <div class="recent-tx-empty-text">Belum ada transaksi sukses</div>
      </div>
    `;
    if (UI.txDots) UI.txDots.innerHTML = '';
    return;
  }

  const recentTx = orders.slice(0, 10);

  UI.recentTxSlides.innerHTML = recentTx.map((tx, index) => {
    const userName = tx.name || 'Anonymous';
    const userInitial = userName.charAt(0).toUpperCase();

    const firstItem = (tx.items && tx.items[0]) ? tx.items[0].name : 'Produk';
    const itemCount = (tx.items && tx.items.length > 1) ? ` (+${tx.items.length - 1})` : '';

    const createdAt = tx.createdAt ? new Date(tx.createdAt) : new Date();
    const timeAgo = getTimeAgo(createdAt);

    const total = tx.total || 0;

    return `
      <div class="recent-tx-card" data-index="${index}">
        <div class="recent-tx-card-header">
          <div class="recent-tx-avatar">${userInitial}</div>
          <div class="recent-tx-user-info">
            <div class="recent-tx-user">${escapeHtml(userName)}</div>
            <div class="recent-tx-badge">✅ SUCCESS</div>
          </div>
        </div>
        <div class="recent-tx-product">🎮 ${escapeHtml(firstItem)}${itemCount}</div>
        <div class="recent-tx-footer">
          <div class="recent-tx-time">⏰ ${timeAgo}</div>
          <div class="recent-tx-price">${fmtRp(total)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAnnouncements() {
  if (State.announcements.length === 0) return;

  const ann = State.announcements[0];
  UI.annTitle.textContent = ann.title;
  UI.annBody.textContent = ann.body;

  if (ann.image || ann.imageUrl) {
    const imgUrl = normalizeImageUrl(ann.image || ann.imageUrl);
    if (imgUrl) {
      UI.annImg.src = imgUrl;
      UI.annImg.style.display = 'block';
    } else {
      UI.annImg.style.display = 'none';
    }
  } else {
    UI.annImg.style.display = 'none';
  }

  openModal(UI.annModal);
}

function renderContactButtons() {
  UI.contactButtons.innerHTML = State.contactLinks.map(link => `
    <a href="${escapeHtml(link.url)}" target="_blank" class="pixel-btn secondary" style="width: 100%; margin-bottom: 8px; text-decoration: none;">
      ${link.icon ? `<span style="margin-right: 8px;">${escapeHtml(link.icon)}</span>` : ''}
      ${escapeHtml(link.label)}
    </a>
  `).join('');
}

function renderProfile() {
  if (!State.user) {
    UI.profileBox.innerHTML = 'Belum login.';
    UI.profileEditor.style.display = 'none';
    UI.btnLogout.style.display = 'none';
    UI.btnVerifyResend.style.display = 'none';
    UI.btnResetPassProfile.style.display = 'none';
    return;
  }

  UI.profileBox.innerHTML = `
    <div><b>Email</b>: ${escapeHtml(State.user.email || '-')}</div>
    <div style="margin-top: 8px;"><b>Nama</b>: ${escapeHtml(State.user.displayName || '-')}</div>
  `;

  UI.pfName.value = State.user.displayName || '';
  UI.pfPhoto.value = State.user.photoURL || '';
  UI.profileEditor.style.display = 'block';
  UI.btnLogout.style.display = 'inline-flex';
}

/* ===== CART ===== */
function saveCart() {
  try {
    localStorage.setItem('bys_cart', JSON.stringify(State.cart));
  } catch (e) {}
}

function loadCart() {
  try {
    State.cart = JSON.parse(localStorage.getItem('bys_cart') || '[]') || [];
  } catch (e) {
    State.cart = [];
  }
}

function cartCount() {
  return State.cart.reduce((a, i) => a + (Number(i.qty) || 0), 0);
}

function cartSum() {
  return State.cart.reduce((a, i) => a + (Number(i.price) || 0) * (Number(i.qty) || 0), 0);
}

function updateCartBadge() {
  UI.cartCount.textContent = String(cartCount());
}

function addToCart(prod, subKey, requestedQty = 1) {
  if (!prod || !prod.id) {
    showToast('Produk tidak valid');
    return;
  }

  const prodName = prod.name || prod.nama || prod.title || 'Produk';
  const status = String(prod.status || '').toLowerCase();
  let stockNum = (prod.stock === 0 || prod.stock === '0') ? 0 : (Number(prod.stock) || null);
  const isSold = (status === 'sold') || (prod.available === false) || (stockNum === 0);

  if (isSold) {
    showToast('Produk SOLD / Habis');
    return;
  }

  const exist = State.cart.find(x => x.subKey === subKey && x.id === prod.id);
  const qtyToAdd = Number(requestedQty) || 1;

  if (exist) {
    const maxQty = (stockNum == null ? null : Number(stockNum));
    const next = (Number(exist.qty) || 0) + qtyToAdd;

    if (maxQty != null && next > maxQty) {
      exist.qty = maxQty;
      showToast('Mencapai batas stok');
    } else {
      exist.qty = next;
    }
  } else {
    State.cart.push({
      subKey: subKey,
      id: prod.id,
      name: prodName,
      price: prod.finalPrice || prod.price,
      qty: qtyToAdd,
      stock: stockNum,
      image: prod.image || prod.imageUrl || prod.img || ''
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`${qtyToAdd} item masuk keranjang`);
}

function directCheckout(prod, subKey) {
  State.directCheckoutItem = { ...prod, subKey, qty: 1 };
  openCart();
}

function removeFromCart(idx) {
  State.cart.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartItemQty(idx, delta) {
  const item = State.cart[idx];
  if (!item) return;

  const maxQty = (item.stock == null ? 999 : Number(item.stock));
  const next = (Number(item.qty) || 0) + delta;

  if (next < 1) return;
  if (maxQty != null && next > maxQty) {
    item.qty = maxQty;
    showToast('Stok maksimal tercapai');
  } else {
    item.qty = next;
  }

  saveCart();
  updateCartBadge();
  renderCart();
}

function renderCart() {
  updateCartBadge();
  const items = State.cart;

  if (!items.length) {
    UI.cartItems.innerHTML = '<div class="small" style="text-align: center; padding: 20px;">Keranjang kosong.</div>';
    UI.cartTotal.textContent = 'Rp 0';
    return;
  }

  UI.cartItems.innerHTML = items.map((it, idx) => `
    <div class="pixel-card product" style="margin-bottom: 10px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        ${it.image ? `<img src="${normalizeImageUrl(it.image)}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(0,229,255,0.2)">` : ''}
        <div style="flex: 1; min-width: 0;">
          <div class="name" style="font-size: 10px; margin-bottom: 4px;">${escapeHtml(it.name)}</div>
          <div class="price" style="font-size: 10px;">${fmtRp(it.price)}</div>
        </div>
      </div>

      <hr class="sep" style="margin: 10px 0; opacity: 0.3;">

      <div class="row" style="justify-content: space-between; flex-wrap: nowrap;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="pixel-btn secondary" style="padding: 4px 8px; min-width: 30px; font-size: 10px;" data-act="dec" data-idx="${idx}">-</button>
          <span style="font-size: 10px; min-width: 20px; text-align: center;">${it.qty}</span>
          <button class="pixel-btn secondary" style="padding: 4px 8px; min-width: 30px; font-size: 10px;" data-act="inc" data-idx="${idx}">+</button>
        </div>

        <button class="pixel-btn danger" data-act="del" data-idx="${idx}" style="padding: 8px 12px; font-size: 9px;">Hapus</button>
      </div>
    </div>
  `).join('');

  UI.cartTotal.textContent = fmtRp(cartSum());

  // Add event listeners
  $$('#cartItems [data-act]').forEach(b => {
    b.addEventListener('click', () => {
      const idx = Number(b.dataset.idx);
      const act = b.dataset.act;

      if (act === 'inc') updateCartItemQty(idx, 1);
      else if (act === 'dec') updateCartItemQty(idx, -1);
      else if (act === 'del') removeFromCart(idx);
    });
  });
}

function openCart() {
  renderCart();
  openModal(UI.cartModal);
}

/* ===== NAVIGATION ===== */
function setActiveTab(tab) {
  UI.tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  UI.secHome.classList.toggle('active', tab === 'home');
  UI.secProduk.classList.toggle('active', tab === 'produk');
  UI.secTransaksi.classList.toggle('active', tab === 'transaksi');
  UI.secProfil.classList.toggle('active', tab === 'profil');
  UI.secPengaturan.classList.toggle('active', tab === 'pengaturan');

  if (tab === 'home') {
    loadStats();
    loadRecentTransactions();
  }
  if (tab === 'produk') {
    renderCategories();
  }
  if (tab === 'transaksi') {
    loadOrders();
  }
  if (tab === 'profil') {
    renderProfile();
  }
  if (tab === 'pengaturan') {
    renderContactButtons();
  }
}

/* ===== ORDER SUBMISSION ===== */
async function submitOrder() {
  const name = UI.coName.value.trim();
  const email = UI.coEmail.value.trim();
  const wa = UI.coWA.value.trim();
  const notes = UI.coNotes.value.trim();
  const paymentMethod = UI.coPayMethod.value;
  const proofUrl = UI.coProofUrl.value;

  if (!email) {
    showToast('Email wajib diisi');
    return;
  }

  if (!wa) {
    showToast('Nomor WA wajib diisi');
    return;
  }

  if (!paymentMethod) {
    showToast('Pilih metode pembayaran');
    return;
  }

  let items = State.cart;
  if (State.directCheckoutItem) {
    items = [{
      id: State.directCheckoutItem.id,
      productId: State.directCheckoutItem.id,
      name: State.directCheckoutItem.name,
      price: State.directCheckoutItem.finalPrice || State.directCheckoutItem.price,
      qty: State.directCheckoutItem.qty,
      image: State.directCheckoutItem.image
    }];
  }

  if (!items.length) {
    showToast('Keranjang kosong');
    return;
  }

  showLoader('Mengirim order...');

  try {
    const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: State.user?.id,
        name: name || email,
        email,
        whatsapp: wa,
        notes,
        paymentMethod,
        paymentProofUrl: proofUrl,
        total,
        items
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Gagal mengirim order');
    }

    showToast('Order berhasil dikirim!');

    // Clear cart
    State.cart = [];
    State.directCheckoutItem = null;
    saveCart();
    updateCartBadge();

    closeModal(UI.checkoutModal);
    setActiveTab('transaksi');
  } catch (error) {
    console.error('Order submission error:', error);
    showToast('Gagal mengirim order: ' + error.message);
  } finally {
    hideLoader();
  }
}

/* ===== ZOOM ===== */
function openZoom(url) {
  if (url) {
    UI.zoomImg.src = url;
  } else {
    UI.zoomImg.removeAttribute('src');
  }
  openModal(UI.zoomModal);
}

/* ===== ORDER DETAIL ===== */
function openOrderDetail(order) {
  const items = order.items || [];
  const itemsHtml = items.map(item => `
    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
      <div>
        <div style="font-size: 11px;">${escapeHtml(item.name)}</div>
        <div style="font-size: 10px; color: var(--muted);">x${item.qty}</div>
      </div>
      <div style="font-size: 11px;">${fmtRp(item.price)}</div>
    </div>
  `).join('');

  const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

  UI.txDetailContent.innerHTML = `
    <div className="small" style="margin-bottom: 12px;">
      <div><b>Order Number:</b> ${escapeHtml(order.orderNumber)}</div>
      <div><b>Tanggal:</b> ${createdAt.toLocaleString('id-ID')}</div>
      <div><b>Status:</b> <span style="color: ${{
        'pending': 'var(--muted)',
        'paid': 'var(--success)',
        'proses': 'var(--accent1)',
        'selesai': 'var(--accent2)',
        'canceled': 'var(--danger)'
      }[order.status] || 'var(--muted)'}">${order.status.toUpperCase()}</span></div>
      <div><b>Nama:</b> ${escapeHtml(order.name)}</div>
      <div><b>Email:</b> ${escapeHtml(order.email)}</div>
      <div><b>WhatsApp:</b> ${escapeHtml(order.whatsapp)}</div>
      <div><b>Metode Pembayaran:</b> ${escapeHtml(order.paymentMethod)}</div>
      ${order.notes ? `<div><b>Catatan:</b> ${escapeHtml(order.notes)}</div>` : ''}
      ${order.paymentProofUrl ? `<div style="margin-top: 8px;"><b>Bukti Pembayaran:</b> <a href="${escapeHtml(order.paymentProofUrl)}" target="_blank" style="color: var(--neon);">Lihat</a></div>` : ''}
      <div style="margin-top: 12px;"><b>Items:</b></div>
      ${itemsHtml}
      <div style="text-align: right; margin-top: 12px; font-size: 14px; color: var(--neon);">
        <b>Total: ${fmtRp(order.total)}</b>
      </div>
      ${order.deliveryData ? `<div style="margin-top: 12px; padding: 8px; background: rgba(0,255,156,0.1); border-radius: 8px;"><b>Data Pengiriman:</b> ${escapeHtml(order.deliveryData)}</div>` : ''}
    </div>
  `;

  openModal(UI.txDetailModal);
}

/* ===== DRAWER ===== */
function openDrawer() {
  UI.drawerBackdrop.classList.add('show');
  UI.drawer.classList.add('open');
}

function closeDrawer() {
  UI.drawerBackdrop.classList.remove('show');
  UI.drawer.classList.remove('open');
}

/* ===== EVENT LISTENERS ===== */
document.addEventListener('DOMContentLoaded', async () => {
  // Load initial data
  checkAuth();
  loadCart();
  updateCartBadge();

  await Promise.all([
    loadStats(),
    loadCategories(),
    loadPaymentMethods(),
    loadContactLinks(),
    loadWaAdmins(),
    loadAnnouncements()
  ]);

  // Tab navigation
  UI.tabs.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
  });

  // Drawer
  UI.btnBurger.addEventListener('click', openDrawer);
  UI.btnCloseDrawer.addEventListener('click', closeDrawer);
  UI.drawerBackdrop.addEventListener('click', closeDrawer);

  // Cart
  UI.btnCart.addEventListener('click', openCart);
  UI.btnCloseCart.addEventListener('click', () => closeModal(UI.cartModal));
  UI.btnClearCart.addEventListener('click', () => {
    State.cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
    showToast('Keranjang dibersihkan');
  });

  // Checkout
  UI.btnCheckout.addEventListener('click', () => {
    closeModal(UI.cartModal);

    if (!State.user) {
      UI.checkoutNote.textContent = 'Silakan login terlebih dahulu.';
      openModal(UI.checkoutModal);
      return;
    }

    if (State.cart.length === 0 && !State.directCheckoutItem) {
      showToast('Keranjang kosong');
      return;
    }

    UI.checkoutNote.textContent = '';

    // Populate form
    if (State.user) {
      UI.coName.value = State.user.displayName || '';
      UI.coEmail.value = State.user.email || '';
    }

    // Populate payment methods
    UI.coPayMethod.innerHTML = '<option value="">Pilih metode pembayaran</option>' +
      State.paymentMethods.map(pm => `<option value="${pm.id}">${escapeHtml(pm.label)}</option>`).join('');

    openModal(UI.checkoutModal);
  });

  UI.btnCloseCheckout.addEventListener('click', () => closeModal(UI.checkoutModal));
  UI.checkoutModal?.addEventListener('click', (e) => {
    if (e.target === UI.checkoutModal) closeModal(UI.checkoutModal);
  });

  // Submit order
  UI.btnSubmitOrder?.addEventListener('click', submitOrder);

  // Upload proof
  UI.btnUploadProof?.addEventListener('click', async () => {
    const file = UI.coProof.files?.[0];
    if (!file) {
      showToast('Pilih file bukti pembayaran');
      return;
    }

    try {
      showLoader('Mengupload bukti...');
      const url = await uploadToCloudinary(file);
      UI.coProofUrl.value = url;
      UI.proofStatus.textContent = 'Upload berhasil!';
      showToast('Bukti berhasil diupload');
    } catch (error) {
      console.error('Upload error:', error);
      UI.proofStatus.textContent = 'Upload gagal: ' + error.message;
      showToast('Upload gagal: ' + error.message);
    } finally {
      hideLoader();
    }
  });

  // Login
  UI.btnLogin.addEventListener('click', () => {
    if (State.user) {
      setActiveTab('profil');
    } else {
      openModal(UI.loginModal);
    }
  });

  UI.btnCloseLogin.addEventListener('click', () => closeModal(UI.loginModal));
  UI.loginModal?.addEventListener('click', (e) => {
    if (e.target === UI.loginModal) closeModal(UI.loginModal);
  });

  UI.btnGoogleAuth.addEventListener('click', loginWithGoogle);

  // Logout
  UI.btnLogout?.addEventListener('click', logout);

  // Save profile
  UI.btnSaveProfile?.addEventListener('click', async () => {
    const name = UI.pfName.value.trim();
    const photo = UI.pfPhoto.value.trim();

    if (State.user) {
      State.user.displayName = name;
      State.user.photoURL = photo;
      localStorage.setItem('bimm_user', JSON.stringify(State.user));
      showToast('Profil disimpan');
      renderProfile();
    }
  });

  // Search & Sort
  let searchDebounce;
  UI.searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      State.search = e.target.value;
      if (State.level === 'products') {
        loadProducts().then(() => renderProducts());
      }
    }, 300);
  });

  UI.sortSelect?.addEventListener('change', (e) => {
    State.sort = e.target.value;
    if (State.level === 'products') {
      loadProducts().then(() => renderProducts());
    }
  });

  // Quick actions
  $('#quickCheckOrder')?.addEventListener('click', () => setActiveTab('transaksi'));
  $('#quickTopUp')?.addEventListener('click', () => setActiveTab('produk'));
  $('#viewAllProducts')?.addEventListener('click', () => setActiveTab('produk'));
  $('#viewAllCategories')?.addEventListener('click', () => setActiveTab('produk'));
  $('#btnViewAllTransactions')?.addEventListener('click', () => setActiveTab('transaksi'));

  // Ranking (mock for now)
  UI.btnOpenRanking?.addEventListener('click', () => {
    UI.rankList.innerHTML = '<div class="small" style="text-align: center; padding: 20px;">Daftar peringkat akan ditampilkan di sini</div>';
    openModal(UI.rankModal);
  });

  UI.btnCloseRank?.addEventListener('click', () => closeModal(UI.rankModal));
  UI.rankModal?.addEventListener('click', (e) => {
    if (e.target === UI.rankModal) closeModal(UI.rankModal);
  });

  // Contacts in drawer
  UI.btnOpenContacts?.addEventListener('click', async () => {
    const panel = $('#contactsPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';

    if (panel.style.display !== 'none') {
      UI.drawerContacts.innerHTML = State.waAdmins.map(wa => `
        <div class="pixel-card item" style="padding: 12px; margin-bottom: 8px;">
          <div class="ico">📱</div>
          <div class="txt">
            <div class="t">${escapeHtml(wa.label)}</div>
            <div class="d">${escapeHtml(wa.number)}</div>
          </div>
        </div>
      `).join('');
    }
  });

  // Close modals on backdrop click
  UI.btnCloseZoom?.addEventListener('click', () => closeModal(UI.zoomModal));
  UI.zoomModal?.addEventListener('click', (e) => {
    if (e.target === UI.zoomModal) closeModal(UI.zoomModal);
  });

  UI.btnCloseAnn?.addEventListener('click', () => closeModal(UI.annModal));
  UI.annModal?.addEventListener('click', (e) => {
    if (e.target === UI.annModal) closeModal(UI.annModal);
  });

  UI.btnCloseTxDetail?.addEventListener('click', () => closeModal(UI.txDetailModal));
  UI.txDetailModal?.addEventListener('click', (e) => {
    if (e.target === UI.txDetailModal) closeModal(UI.txDetailModal);
  });

  // Initialize home tab
  setActiveTab('home');
});
