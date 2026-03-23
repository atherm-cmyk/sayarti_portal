/**
 * Sayarti Portal — Main Application
 * Router, Templates & Interactions
 */
(function () {
  'use strict';
  const D = SayartiData;
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  /* ===== State ===== */
  const state = {
    cart: JSON.parse(localStorage.getItem('sayarti_cart') || '[]'),
    lang: localStorage.getItem('sayarti_lang') || 'en',
    currentRoute: '',
    user: JSON.parse(localStorage.getItem('sayarti_user') || 'null'),
    orders: JSON.parse(localStorage.getItem('sayarti_orders') || '[]'),
    inquiries: JSON.parse(localStorage.getItem('sayarti_inquiries') || '[]')
  };

  function saveUser() { localStorage.setItem('sayarti_user', JSON.stringify(state.user)); }
  function saveOrders() { localStorage.setItem('sayarti_orders', JSON.stringify(state.orders)); }
  function saveInquiries() { localStorage.setItem('sayarti_inquiries', JSON.stringify(state.inquiries)); }

  // Migrate legacy single-user to multi-user storage if needed
  (function migrateUsers() {
    const legacy = JSON.parse(localStorage.getItem('sayarti_user') || 'null');
    const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
    if (legacy && legacy.phone && users.length === 0) {
      if (!legacy.civilId) legacy.civilId = '000000000000';
      if (!legacy.password) legacy.password = 'Migrated@2026';
      users.push(legacy);
      localStorage.setItem('sayarti_users', JSON.stringify(users));
    }
  })();

  function updateAuthIcon() {
    const icon = $('#authIcon');
    if (!icon) return;
    if (state.user) {
      icon.href = '#/profile';
      icon.innerHTML = '<span class="material-symbols-outlined text-primary">account_circle</span>';
    } else {
      icon.href = '#/register';
      icon.innerHTML = '<span class="material-symbols-outlined">person</span>';
    }
  }

  /* ===== Helpers ===== */
  const fmt = (n) => Number(n).toFixed(3) + ' KWD';
  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const t = (key) => (SayartiI18n[state.lang] && SayartiI18n[state.lang][key]) || SayartiI18n.en[key] || key;

  function translateStaticUI() {
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (val) el.textContent = val;
    });
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key);
      if (val) el.placeholder = val;
    });
  }

  function stars(rating, count) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    let h = '<span class="stars">';
    for (let i = 0; i < full; i++) h += '<span class="material-symbols-outlined">star</span>';
    if (half) h += '<span class="material-symbols-outlined">star_half</span>';
    for (let i = full + half; i < 5; i++) h += '<span class="material-symbols-outlined" style="color:var(--outline-variant)">star</span>';
    h += '</span>';
    if (count !== undefined) h += `<span class="review-count">(${count})</span>`;
    return h;
  }

  function badgeHTML(badge) {
    if (!badge) return '';
    const cls = badge.toLowerCase().includes('best') ? 'badge-bestseller'
      : badge.toLowerCase().includes('new') ? 'badge-new'
      : badge.toLowerCase().includes('offer') || badge.toLowerCase().includes('low') ? 'badge-offer'
      : badge.toLowerCase().includes('premium') ? 'badge-premium'
      : badge.toLowerCase().includes('stock') ? 'badge-in-stock'
      : 'badge-essential';
    return `<span class="badge ${cls}">${badge}</span>`;
  }

  function productCard(p, detailHash) {
    return `
    <a href="${detailHash}" class="product-card block">
      <div class="overflow-hidden">
        <img src="${p.image || 'https://placehold.co/400x300/f5f0ee/5d5e60?text=' + encodeURIComponent(p.name)}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        ${p.badge ? badgeHTML(p.badge) : ''}
        <h3 class="product-card-title mt-1">${p.name}</h3>
        <p class="text-xs text-secondary mt-1 line-clamp-2">${p.description || ''}</p>
        <div class="flex items-center gap-2 mt-2">
          ${p.rating ? stars(p.rating, p.reviews) : ''}
        </div>
        <p class="product-card-price mt-2">${fmt(p.price)} <span class="currency"></span></p>
      </div>
    </a>`;
  }

  /* ===== Cart ===== */
  function saveCart() {
    localStorage.setItem('sayarti_cart', JSON.stringify(state.cart));
    updateCartUI();
  }
  function addToCart(product, qty = 1) {
    const existing = state.cart.find(i => i.id === product.id);
    if (existing) { existing.qty += qty; } else { state.cart.push({ ...product, qty }); }
    saveCart();
    toast(`${product.name} added to cart`, 'success');
  }
  function removeFromCart(id) {
    state.cart = state.cart.filter(i => i.id !== id);
    saveCart();
  }
  function updateCartUI() {
    const badge = $('#cartBadge');
    const total = state.cart.reduce((s, i) => s + i.qty, 0);
    if (total > 0) { badge.textContent = total; badge.classList.remove('hidden'); }
    else { badge.classList.add('hidden'); }
    renderCartDrawer();
  }
  function renderCartDrawer() {
    const container = $('#cartItems');
    const totalEl = $('#cartTotal');
    if (!state.cart.length) {
      container.innerHTML = `<div class="text-center py-12 text-secondary">
        <span class="material-symbols-outlined text-5xl mb-3 block opacity-30">shopping_cart</span>
        <p class="font-medium">Your cart is empty</p></div>`;
      totalEl.textContent = '0.000 KWD';
      return;
    }
    let sum = 0;
    container.innerHTML = state.cart.map(item => {
      sum += item.price * item.qty;
      return `<div class="flex gap-4 py-4 border-b border-surface-ctr last:border-0">
        <img src="${item.image || 'https://placehold.co/80x80/f5f0ee/5d5e60?text=Item'}" class="w-20 h-20 rounded-xl object-cover" alt="${item.name}">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold truncate">${item.name}</h4>
          <p class="text-sm font-bold text-primary mt-1">${fmt(item.price)}</p>
          <div class="flex items-center gap-3 mt-2">
            <div class="qty-selector">
              <button class="qty-btn" data-cart-qty="${item.id}" data-delta="-1">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" data-cart-qty="${item.id}" data-delta="1">+</button>
            </div>
            <button class="text-secondary hover:text-red-600 transition" data-cart-remove="${item.id}">
              <span class="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
    totalEl.textContent = fmt(sum);
  }

  /* ===== Toast ===== */
  function toast(msg, type = 'info') {
    const c = $('#toastContainer');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span class="material-symbols-outlined text-lg">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>${msg}`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100px)'; setTimeout(() => t.remove(), 300); }, 3000);
  }

  /* ===== Find product across all data ===== */
  function findProduct(id) {
    for (const cat of Object.values(D.lifestyleProducts)) {
      const found = cat.find(p => p.id === id);
      if (found) return found;
    }
    for (const cat of Object.values(D.vehicleProducts)) {
      const found = cat.find(p => p.id === id);
      if (found) return found;
    }
    return D.merchandise.find(p => p.id === id) || null;
  }

  /* ============================================================
     PAGE TEMPLATES
     ============================================================ */

  /* ----- HOME PAGE ----- */
  function homePage() {
    const cat = D.lifestyleCategories;
    const featured = D.featuredItems;
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <!-- Hero Carousel -->
      <div class="hero-carousel rounded-2xl" id="heroCarousel">
        <div class="hero-carousel-track" id="heroTrack">
          <div class="hero-slide active">
            <img class="hero-img" data-desktop="assets/Banners/desk%20and%20tablet/home%20page/Welcome.jpg" data-mobile="assets/Banners/mobile/home_page/welcome.jpg" alt="Welcome">
          </div>
          <div class="hero-slide">
            <img class="hero-img" data-desktop="assets/Banners/desk%20and%20tablet/home%20page/accessorized.jpg" data-mobile="assets/Banners/mobile/home_page/accessorised.jpg" alt="Accessorized">
          </div>
          <div class="hero-slide">
            <img class="hero-img" data-desktop="assets/Banners/desk%20and%20tablet/home%20page/drive%20smarter.jpg" data-mobile="assets/Banners/mobile/home_page/connected.jpg" alt="Drive Smarter">
          </div>
          <div class="hero-slide">
            <img class="hero-img" data-desktop="assets/Banners/desk%20and%20tablet/home%20page/off-grid.jpg" data-mobile="assets/Banners/mobile/home_page/off_grid.jpg" alt="Off-Grid">
          </div>
          <div class="hero-slide">
            <img class="hero-img" data-desktop="assets/Banners/desk%20and%20tablet/home%20page/protected.jpg" data-mobile="assets/Banners/mobile/home_page/protected.jpg" alt="Protected">
          </div>
        </div>
        <!-- Carousel Controls -->
        <button class="hero-carousel-arrow hero-carousel-prev" id="heroPrev" aria-label="Previous slide">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="hero-carousel-arrow hero-carousel-next" id="heroNext" aria-label="Next slide">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
        <!-- Indicators -->
        <div class="hero-carousel-indicators" id="heroIndicators">
          <button class="hero-indicator active" data-slide="0" aria-label="Slide 1"></button>
          <button class="hero-indicator" data-slide="1" aria-label="Slide 2"></button>
          <button class="hero-indicator" data-slide="2" aria-label="Slide 3"></button>
          <button class="hero-indicator" data-slide="3" aria-label="Slide 4"></button>
          <button class="hero-indicator" data-slide="4" aria-label="Slide 5"></button>
        </div>
      </div>

      <!-- Lifestyle Categories Grid -->
      <section>
        <h2 class="font-heading text-2xl font-bold mb-5">${t('browseByLifestyle')}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${cat.map(c => `
          <a href="#/${c.id}" class="category-card">
            <img src="${c.image}" alt="${c.name}" loading="lazy">
            <div class="overlay"></div>
            <div class="card-content">
              <span class="hero-label text-[10px] py-1 px-3">${c.tagline}</span>
              <h3 class="font-heading font-bold text-lg mt-2">${c.name}</h3>
              <p class="text-xs opacity-80 mt-1">${c.description}</p>
            </div>
          </a>`).join('')}
        </div>
      </section>

      <!-- Featured Products -->
      <section>
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-heading text-2xl font-bold">${t('featuredAccessories')}</h2>
          <a href="#/shop" class="text-sm font-semibold text-primary hover:underline">${t('viewAll')} →</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${featured.map(f => `
          <div class="bento-card overflow-hidden">
            <img src="${f.image}" alt="${f.name}" class="w-full aspect-[4/3] object-cover" loading="lazy">
            <div class="p-5">
              <span class="text-xs font-semibold text-primary uppercase">${f.category || ''}</span>
              <h3 class="font-heading font-bold text-base mt-1">${f.name}</h3>
              <p class="text-sm text-secondary mt-1 line-clamp-2">${f.description || ''}</p>
              <p class="font-bold text-primary mt-3">${fmt(f.price)}</p>
            </div>
          </div>`).join('')}
        </div>
      </section>

      <!-- Quick Vehicle Grid -->
      <section>
        <h2 class="font-heading text-2xl font-bold mb-5">${t('shopByVehicle')}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          ${D.vehicles.map(v => `
          <a href="#/shop/${v.id}" class="vehicle-card">
            <span class="material-symbols-outlined text-4xl text-primary mb-2">directions_car</span>
            <div class="vehicle-name">${v.name}</div>
            <div class="vehicle-type">${v.year} ${v.type}</div>
          </a>`).join('')}
        </div>
      </section>
    </div>`;
  }

  /* ----- LIFESTYLE CATALOG ----- */
  function catalogPage(categoryId) {
    const cat = D.lifestyleCategories.find(c => c.id === categoryId);
    if (!cat) return notFoundPage();
    const products = D.lifestyleProducts[categoryId] || [];
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- Hero -->
      <div class="hero-section" style="min-height:320px">
        <div class="hero-bg" style="background-image:url('${cat.image}')"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="hero-label"><span class="material-symbols-outlined text-sm mr-1">${cat.icon}</span>${cat.heroLabel}</span>
          <h1 class="hero-title">${cat.tagline}</h1>
          <p class="hero-subtitle">${cat.longDescription}</p>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a>
        <span class="sep">›</span>
        <span class="font-semibold text-on-surface">${cat.name}</span>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-sm text-secondary">${products.length} products</p>
        <div class="flex gap-2">
          <select class="form-input no-icon py-2 text-sm w-auto" id="sortSelect">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="productGrid">
        ${products.map(p => productCard(p, `#/${categoryId}/${p.id}`)).join('')}
      </div>
    </div>`;
  }

  /* ----- PRODUCT DETAIL ----- */
  function detailPage(product, breadcrumbs) {
    if (!product) return notFoundPage();
    const p = product;
    return `
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        ${breadcrumbs.map((b, i) => i < breadcrumbs.length - 1
          ? `<a href="${b.href}">${b.label}</a><span class="sep">›</span>`
          : `<span class="font-semibold text-on-surface">${b.label}</span>`).join('')}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <!-- Gallery -->
        <div class="detail-gallery">
          <img src="${p.image || 'https://placehold.co/600x450/f5f0ee/5d5e60?text=' + encodeURIComponent(p.name)}" alt="${p.name}">
        </div>

        <!-- Info -->
        <div class="space-y-6">
          <div>
            ${p.badge ? badgeHTML(p.badge) : ''}
            <h1 class="font-heading text-2xl font-bold mt-2">${p.name}</h1>
            ${p.sku ? `<p class="text-xs text-secondary mt-1">SKU: ${p.sku}</p>` : ''}
          </div>

          ${p.rating ? `<div class="flex items-center gap-2">${stars(p.rating, p.reviews)}</div>` : ''}

          <p class="text-3xl font-heading font-extrabold text-primary">${fmt(p.price)}</p>

          <p class="text-sm text-secondary leading-relaxed">${p.description || ''}</p>

          ${p.features ? `
          <div>
            <h3 class="font-semibold text-sm mb-3">Key Features</h3>
            <div class="flex flex-wrap gap-2">
              ${p.features.map(f => `<span class="feature-chip"><span class="material-symbols-outlined text-sm text-primary">check_circle</span>${f}</span>`).join('')}
            </div>
          </div>` : ''}

          <!-- Specs -->
          <div class="bg-surface-ctr rounded-2xl p-5">
            ${p.fitment ? `<div class="spec-row"><span class="spec-label"><span class="material-symbols-outlined text-sm">directions_car</span>Fitment</span><span class="spec-value">${p.fitment}</span></div>` : ''}
            ${p.installTime ? `<div class="spec-row"><span class="spec-label"><span class="material-symbols-outlined text-sm">schedule</span>Install Time</span><span class="spec-value">${p.installTime}</span></div>` : ''}
            ${p.installNote ? `<div class="spec-row"><span class="spec-label"><span class="material-symbols-outlined text-sm">build</span>Note</span><span class="spec-value">${p.installNote}</span></div>` : ''}
          </div>

          ${p.inBox ? `
          <div>
            <h3 class="font-semibold text-sm mb-3">What's in the Box</h3>
            <ul class="space-y-2">
              ${p.inBox.map(i => `<li class="flex items-center gap-2 text-sm"><span class="material-symbols-outlined text-sm text-primary">check</span>${i}</li>`).join('')}
            </ul>
          </div>` : ''}

          ${p.sizes ? `
          <div>
            <h3 class="font-semibold text-sm mb-3">Size</h3>
            <div class="flex gap-2 flex-wrap">${p.sizes.map(s => `<button class="size-btn px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition">${s}</button>`).join('')}</div>
          </div>` : ''}

          ${p.colors ? `
          <div>
            <h3 class="font-semibold text-sm mb-3">Color</h3>
            <div class="flex gap-2 flex-wrap">${p.colors.map(c => `<button class="px-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition">${c}</button>`).join('')}</div>
          </div>` : ''}

          <!-- Quantity + Add to Cart -->
          <div class="flex items-center gap-4 flex-wrap">
            <div class="qty-selector">
              <button class="qty-btn" id="detailQtyMinus">−</button>
              <span class="qty-value" id="detailQty">1</span>
              <button class="qty-btn" id="detailQtyPlus">+</button>
            </div>
            <button class="btn-hero flex-1" id="addToCartBtn" data-product-id="${p.id}">
              <span class="material-symbols-outlined">shopping_cart</span>
              Add to Cart
            </button>
          </div>

          <button class="btn-outline w-full" id="addToWishlistBtn" data-product-id="${p.id}">
            <span class="material-symbols-outlined text-lg" style="vertical-align:middle">favorite_border</span>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>`;
  }

  /* ----- SHOP HUB ----- */
  function shopHubPage() {
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('shop')}</span>
      </div>

      <!-- Hero -->
      <div class="hero-section" style="min-height:380px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)">
        <div class="hero-content">
          <span class="hero-label">Genuine Toyota Parts</span>
          <h1 class="hero-title">SHOP BY VEHICLE</h1>
          <p class="hero-subtitle">Select your model. Find the perfect accessories engineered specifically for your Toyota.</p>
        </div>
      </div>

      <!-- 3-Step Model Selector -->
      <div class="model-selector-card">
        <h2 class="font-heading font-bold text-xl mb-6">${t('findAccessories')}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <div>
            <label class="form-label">${t('selectModel')}</label>
            <div class="custom-select-wrapper">
              <select class="custom-select" disabled>
                <option>Toyota</option>
              </select>
              <span class="custom-select-icon"><span class="material-symbols-outlined">directions_car</span></span>
            </div>
          </div>
          <div>
            <label class="form-label">${t('selectModel')}</label>
            <div class="custom-select-wrapper">
              <select class="custom-select" id="modelSelect">
                <option value="">${t('selectModel')}...</option>
                ${D.vehicles.map(v => `<option value="${v.id}">${v.name} — ${v.year}</option>`).join('')}
              </select>
              <span class="custom-select-icon"><span class="material-symbols-outlined">expand_more</span></span>
            </div>
          </div>
          <div>
            <button class="btn-hero w-full justify-center py-3.5" id="findAccessoriesBtn">
              <span class="material-symbols-outlined text-lg">search</span>
              ${t('findAccessories')}
            </button>
          </div>
        </div>
      </div>

      <!-- Lifestyle Category Cards -->
      <section>
        <h2 class="font-heading text-2xl font-bold mb-5">${t('browseByLifestyle')}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${D.lifestyleCategories.map(c => `
          <a href="#/${c.id}" class="category-card">
            <img src="${c.image}" alt="${c.name}" loading="lazy">
            <div class="overlay"></div>
            <div class="card-content">
              <span class="material-symbols-outlined text-2xl mb-1">${c.icon}</span>
              <h3 class="font-heading font-bold text-lg">${c.name}</h3>
              <p class="text-xs opacity-80 mt-1">${c.description}</p>
            </div>
          </a>`).join('')}
        </div>
      </section>

      <!-- Vehicle Grid -->
      <section>
        <h2 class="font-heading text-2xl font-bold mb-5">${t('allModels')}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${D.vehicles.map(v => {
            const prodCount = (D.vehicleProducts[v.id] || []).length;
            return `
          <a href="#/shop/${v.id}" class="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-lg hover:border-primary transition group cursor-pointer block">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-surface-ctr flex items-center justify-center group-hover:bg-primary/10 transition">
                <span class="material-symbols-outlined text-3xl text-primary">directions_car</span>
              </div>
              <div>
                <h3 class="font-heading font-bold text-lg">${v.name}</h3>
                <p class="text-sm text-secondary">${v.year} ${v.type}</p>
                <p class="text-xs text-primary font-semibold mt-1">${prodCount} accessories →</p>
              </div>
            </div>
          </a>`;
          }).join('')}
        </div>
      </section>
    </div>`;
  }

  /* ----- VEHICLE ACCESSORIES ----- */
  function vehicleAccessoriesPage(vehicleId) {
    const vehicle = D.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return notFoundPage();
    const products = D.vehicleProducts[vehicleId] || [];
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- Hero -->
      <div class="hero-section" style="min-height:340px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)">
        <div class="hero-content">
          <span class="hero-label">${vehicle.year} ${vehicle.type}</span>
          <h1 class="hero-title">${vehicle.tagline}</h1>
          <p class="hero-subtitle">${vehicle.description}</p>
        </div>
      </div>

      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <a href="#/shop">${t('shop')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${vehicle.name} ${t('accessories')}</span>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4">
        <p class="text-sm text-secondary">${products.length} accessories for ${vehicle.name}</p>
        <select class="form-input no-icon py-2 text-sm w-auto" id="sortSelect">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="productGrid">
        ${products.map(p => productCard(p, `#/shop/${vehicleId}/${p.id}`)).join('')}
      </div>
    </div>`;
  }

  /* ----- MERCHANDISE ----- */
  function merchandisePage() {
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <div class="hero-section" style="min-height:300px;background:linear-gradient(135deg,#1a1a2e 0%,#0d0d1a 100%)">
        <div class="hero-content">
          <span class="hero-label">GR Performance Wear</span>
          <h1 class="hero-title">OFFICIAL MERCHANDISE</h1>
          <p class="hero-subtitle">GAZOO RACING lifestyle apparel and accessories. Wear the spirit of Toyota motorsport.</p>
        </div>
      </div>

      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('merchandise')}</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${D.merchandise.map(p => productCard(p, `#/merchandise/${p.id}`)).join('')}
      </div>
    </div>`;
  }

  /* ----- CHECKOUT ----- */
  function checkoutPage() {
    if (!state.user) { location.hash = '#/register'; return ''; }
    const items = state.cart;
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal > 0 ? 5.000 : 0;
    const total = subtotal + shipping;
    const u = state.user;
    return `
    <div class="p-6 max-w-5xl mx-auto">
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('checkout')}</span>
      </div>

      <h1 class="font-heading text-2xl font-bold mb-6">${t('checkout')}</h1>

      <!-- Steps -->
      <div class="flex items-center gap-4 mb-8 flex-wrap">
        <div class="checkout-step"><span class="step-number active">1</span><span class="text-sm font-semibold">${t('shippingInfo')}</span></div>
        <div class="w-8 h-px bg-outline-variant hidden sm:block"></div>
        <div class="checkout-step"><span class="step-number">2</span><span class="text-sm text-secondary">${t('paymentMethod')}</span></div>
        <div class="w-8 h-px bg-outline-variant hidden sm:block"></div>
        <div class="checkout-step"><span class="step-number">3</span><span class="text-sm text-secondary">${t('confirmation')}</span></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-outline-variant p-6">
            <h2 class="font-heading font-bold mb-4">${t('shippingInfo')}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label class="form-label">${t('firstName')}</label><input class="form-input no-icon" id="shipFirstName" value="${u.firstName}"></div>
              <div><label class="form-label">${t('lastName')}</label><input class="form-input no-icon" id="shipLastName" value="${u.lastName}"></div>
              <div class="sm:col-span-2"><label class="form-label">${t('email')}</label><input class="form-input no-icon" type="email" id="shipEmail" value="${u.email}"></div>
              <div><label class="form-label">${t('phone')}</label><input class="form-input no-icon" id="shipPhone" value="${u.phone}"></div>
              <div><label class="form-label">${t('governorate')}</label>
                <select class="form-input no-icon" id="shipGovernorate">${D.governorates.map(g => `<option ${g === u.governorate ? 'selected' : ''}>${g}</option>`).join('')}</select>
              </div>
              <div class="sm:col-span-2"><label class="form-label">${t('address')}</label><input class="form-input no-icon" id="shipAddress" value="${u.address || ''}"></div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-outline-variant p-6">
            <h2 class="font-heading font-bold mb-4">${t('paymentMethod')}</h2>
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-4 border border-outline-variant rounded-xl cursor-pointer hover:border-primary transition">
                <input type="radio" name="payment" value="knet" checked class="accent-primary"> <span class="font-semibold text-sm">${t('knet')}</span></label>
              <label class="flex items-center gap-3 p-4 border border-outline-variant rounded-xl cursor-pointer hover:border-primary transition">
                <input type="radio" name="payment" value="visa" class="accent-primary"> <span class="font-semibold text-sm">${t('visaMastercard')}</span></label>
              <label class="flex items-center gap-3 p-4 border border-outline-variant rounded-xl cursor-pointer hover:border-primary transition">
                <input type="radio" name="payment" value="cod" class="accent-primary"> <span class="font-semibold text-sm">${t('cashOnDelivery')}</span></label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="bg-white rounded-2xl border border-outline-variant p-6 sticky top-20">
            <h2 class="font-heading font-bold mb-4">${t('orderSummary')}</h2>
            <div class="space-y-3 border-b border-surface-ctr pb-4 mb-4">
              ${items.map(i => `
              <div class="flex justify-between text-sm">
                <span class="text-secondary">${i.name} ×${i.qty}</span>
                <span class="font-semibold">${fmt(i.price * i.qty)}</span>
              </div>`).join('') || `<p class="text-sm text-secondary">${t('cartEmpty')}</p>`}
            </div>
            <div class="flex justify-between text-sm"><span class="text-secondary">${t('subtotal')}</span><span>${fmt(subtotal)}</span></div>
            <div class="flex justify-between text-sm mt-2"><span class="text-secondary">${t('shipping')}</span><span>${subtotal > 0 ? fmt(shipping) : t('free')}</span></div>
            <div class="flex justify-between font-heading font-bold text-lg mt-4 pt-4 border-t border-surface-ctr">
              <span>${t('total')}</span><span class="text-primary">${fmt(total)}</span>
            </div>
            <button class="btn-hero w-full mt-5 justify-center" id="placeOrderBtn">${t('placeOrder')}</button>
            <button class="btn-outline w-full mt-3 justify-center text-sm" id="submitInquiryBtn">
              <span class="material-symbols-outlined text-base mr-1">help_outline</span>${t('submitInquiry')}
            </button>
            <p class="text-xs text-secondary text-center mt-2">${t('inquiryHint')}</p>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ----- REGISTRATION ----- */
  function registerPage(tab) {
    const activeTab = tab || 'register';
    const vehicleModels = D.vehicles.map(v => v.name);
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 15}, (_, i) => currentYear - i);

    return `
    <div class="p-6 max-w-3xl mx-auto">
      <div class="breadcrumbs justify-center">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface" id="authBreadcrumbLabel">${activeTab === 'register' ? t('createAccount') : t('signIn')}</span>
      </div>

      <!-- Tab Switcher -->
      <div class="flex rounded-xl bg-surface-ctr p-1 mb-8 max-w-sm mx-auto" id="authTabs">
        <button class="auth-tab ${activeTab === 'register' ? 'active' : ''}" data-auth-tab="register">${t('createAccount')}</button>
        <button class="auth-tab ${activeTab === 'login' ? 'active' : ''}" data-auth-tab="login">${t('signIn')}</button>
      </div>

      <!-- ===================== REGISTER FORM ===================== -->
      <div id="authRegister" class="${activeTab !== 'register' ? 'hidden' : ''}">

        <div class="text-center mb-10">
          <h1 class="font-heading text-3xl font-bold">${t('createAccount')}</h1>
          <p class="text-secondary mt-2">Join the Sayarti community for premium accessories and vehicle management.</p>
        </div>

        <!-- ── PERSONAL INFORMATION ── -->
        <div class="reg-section">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">person</span>
            <h2 class="reg-section-title">PERSONAL INFORMATION</h2>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="float-field">
              <select class="float-input" id="regSalutation">
                <option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Dr.</option>
              </select>
              <label class="float-label">Salutation</label>
              <span class="float-hint">Title or prefix</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regFirstName" placeholder=" " required>
              <label class="float-label">${t('firstName')} <span class="required">*</span></label>
              <span class="float-hint">As per your Civil ID</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regLastName" placeholder=" " required>
              <label class="float-label">${t('lastName')} <span class="required">*</span></label>
              <span class="float-hint">Family / surname</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-5">
            <div class="float-field">
              <input class="float-input" id="regCivilId" placeholder=" " maxlength="12" required>
              <label class="float-label">Civil ID <span class="required">*</span></label>
              <span class="float-hint">12-digit Kuwait Civil ID number</span>
            </div>
            <div class="float-field">
              <input class="float-input" type="email" id="regEmail" placeholder=" " required>
              <label class="float-label">Email Address <span class="required">*</span></label>
              <span class="float-hint">For order updates & password recovery</span>
            </div>
          </div>
          <div class="mt-5">
            <div class="float-field">
              <div class="flex">
                <span class="phone-prefix">+965</span>
                <input class="float-input phone-input" id="regPhone" placeholder=" " maxlength="8" required>
              </div>
              <label class="float-label" style="left:72px">Mobile Number <span class="required">*</span></label>
              <span class="float-hint">8-digit Kuwait mobile (e.g. 9XXXXXXX)</span>
            </div>
          </div>
        </div>

        <!-- ── VEHICLE DETAILS ── -->
        <div class="reg-section">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">directions_car</span>
            <h2 class="reg-section-title">VEHICLE DETAILS</h2>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="float-field">
              <input class="float-input" id="regPlateNumber" placeholder=" " required>
              <label class="float-label">Plate Number <span class="required">*</span></label>
              <span class="float-hint">Vehicle license plate number</span>
            </div>
            <div class="float-field">
              <select class="float-input" id="regModel" required>
                <option value="">Select model...</option>
                ${vehicleModels.map(m => `<option>${m}</option>`).join('')}
              </select>
              <label class="float-label">Model <span class="required">*</span></label>
              <span class="float-hint">Toyota vehicle model</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-5">
            <div class="float-field">
              <select class="float-input" id="regYear" required>
                ${years.map(y => `<option>${y}</option>`).join('')}
              </select>
              <label class="float-label">Year <span class="required">*</span></label>
              <span class="float-hint">Model manufacturing year</span>
            </div>
            <div>
              <label class="form-label">VEHICLE REGISTRATION COPY</label>
              <label class="upload-btn" id="regUploadLabel">
                <span class="material-symbols-outlined text-lg">upload_file</span>
                <span id="regFileName">Upload Document</span>
                <input type="file" class="hidden" id="regVehicleDoc" accept=".pdf,.jpg,.jpeg,.png">
              </label>
              <span class="float-hint" style="margin-top:6px">PDF, JPG or PNG (optional)</span>
            </div>
          </div>
        </div>

        <!-- ── ADDRESS DETAILS ── -->
        <div class="reg-section">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon" style="color:#bd0014">location_on</span>
            <h2 class="reg-section-title">ADDRESS DETAILS</h2>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="float-field">
              <select class="float-input" id="regGovernorate" required>
                <option value="">Select...</option>
                ${D.governorates.map(g => `<option>${g}</option>`).join('')}
              </select>
              <label class="float-label">Governorate <span class="required">*</span></label>
              <span class="float-hint">Kuwait governorate</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regArea" placeholder=" " required>
              <label class="float-label">Area <span class="required">*</span></label>
              <span class="float-hint">Neighbourhood name</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regBlock" placeholder=" " required>
              <label class="float-label">Block <span class="required">*</span></label>
              <span class="float-hint">Block number</span>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 mt-5">
            <div class="float-field">
              <input class="float-input" id="regStreet" placeholder=" ">
              <label class="float-label">Street</label>
              <span class="float-hint">Street name or no.</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regBuilding" placeholder=" ">
              <label class="float-label">Building</label>
              <span class="float-hint">Building number</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regFloor" placeholder=" ">
              <label class="float-label">Floor</label>
              <span class="float-hint">Floor level</span>
            </div>
            <div class="float-field">
              <input class="float-input" id="regFlat" placeholder=" ">
              <label class="float-label">Flat</label>
              <span class="float-hint">Apartment / unit</span>
            </div>
          </div>
        </div>

        <!-- ── ACCOUNT SECURITY ── -->
        <div class="reg-section">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">lock</span>
            <h2 class="reg-section-title">ACCOUNT SECURITY</h2>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="float-field">
                <div class="relative">
                  <input class="float-input pr-10" type="password" id="regPassword" placeholder=" " required>
                  <label class="float-label">Password <span class="required">*</span></label>
                  <button type="button" class="pwd-toggle" id="toggleRegPwd">
                    <span class="material-symbols-outlined text-lg">visibility_off</span>
                  </button>
                </div>
                <span class="float-hint">Minimum 10 characters with mixed case, number & symbol</span>
              </div>
              <!-- Strength Meter -->
              <div class="mt-3">
                <div class="pwd-strength-bar">
                  <div class="pwd-strength-fill" id="pwdStrengthFill"></div>
                </div>
                <div class="flex justify-between items-center mt-1.5">
                  <span class="text-xs font-semibold" id="pwdStrengthLabel" style="color:#9ca3af">Enter a password</span>
                </div>
              </div>
              <!-- Validation Rules -->
              <ul class="pwd-rules mt-3" id="pwdRules">
                <li id="ruleLength"><span class="material-symbols-outlined">close</span> At least 10 characters</li>
                <li id="ruleUpper"><span class="material-symbols-outlined">close</span> One uppercase letter (A-Z)</li>
                <li id="ruleLower"><span class="material-symbols-outlined">close</span> One lowercase letter (a-z)</li>
                <li id="ruleNumber"><span class="material-symbols-outlined">close</span> One number (0-9)</li>
                <li id="ruleSpecial"><span class="material-symbols-outlined">close</span> One special character (!@#$...)</li>
              </ul>
            </div>
            <div>
              <div class="float-field">
                <div class="relative">
                  <input class="float-input pr-10" type="password" id="regConfirmPassword" placeholder=" ">
                  <label class="float-label">Confirm Password <span class="required">*</span></label>
                  <button type="button" class="pwd-toggle" id="toggleRegConfirmPwd">
                    <span class="material-symbols-outlined text-lg">visibility_off</span>
                  </button>
                </div>
                <span class="float-hint">Re-enter your password to confirm</span>
              </div>
              <p class="text-xs mt-2" id="pwdMatchMsg" style="color:#9ca3af">&nbsp;</p>
            </div>
          </div>
        </div>

        <!-- ── COMMUNICATION PREFERENCES ── -->
        <div class="reg-section">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">notifications</span>
            <h2 class="reg-section-title">COMMUNICATION PREFERENCES</h2>
          </div>
          <p class="text-sm text-secondary mb-4">How would you like to receive updates about your orders and vehicle maintenance?</p>
          <div class="grid grid-cols-4 gap-3">
            <label class="comm-pref-check"><input type="checkbox" id="prefSMS" checked><span>SMS</span></label>
            <label class="comm-pref-check"><input type="checkbox" id="prefWhatsApp"><span>WhatsApp</span></label>
            <label class="comm-pref-check"><input type="checkbox" id="prefEmail"><span>Email</span></label>
            <label class="comm-pref-check"><input type="checkbox" id="prefCall"><span>Call</span></label>
          </div>
        </div>

        <!-- ── ACTIONS ── -->
        <div class="flex items-center justify-center gap-4 mt-8 mb-4">
          <a href="#/home" class="btn-cancel">CANCEL</a>
          <button class="btn-hero px-10 justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all" id="registerBtn">REGISTER ACCOUNT</button>
        </div>

      </div>

      <!-- ===================== LOGIN FORM ===================== -->
      <div id="authLogin" class="${activeTab !== 'login' ? 'hidden' : ''}">
        <div class="text-center mb-10">
          <h1 class="font-heading text-3xl font-bold">${t('signIn')}</h1>
          <p class="text-secondary mt-2">Welcome back! Enter your details to access your account.</p>
        </div>
        <div class="reg-section max-w-md mx-auto">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">login</span>
            <h2 class="reg-section-title">ACCOUNT LOGIN</h2>
          </div>
          <p class="text-sm text-secondary mb-5">Enter your Civil ID and password to sign in.</p>
          <div class="space-y-5">
            <div class="float-field">
              <input class="float-input" id="loginCivilId" placeholder=" " maxlength="12">
              <label class="float-label">Civil ID <span class="required">*</span></label>
              <span class="float-hint">12-digit Kuwait Civil ID number</span>
            </div>
            <div class="float-field">
              <div class="relative">
                <input class="float-input pr-10" type="password" id="loginPassword" placeholder=" ">
                <label class="float-label">Password <span class="required">*</span></label>
                <button type="button" class="pwd-toggle" id="toggleLoginPwd">
                  <span class="material-symbols-outlined text-lg">visibility_off</span>
                </button>
              </div>
              <span class="float-hint">Enter your account password</span>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            <button type="button" class="text-sm text-primary font-semibold hover:underline cursor-pointer" id="forgotPwdLink">Forgot Password?</button>
          </div>
          <button class="btn-hero w-full justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all mt-4" id="loginBtn">${t('signIn')}</button>
          <p class="text-center text-sm text-secondary mt-4">Don't have an account? <a href="#/register" class="text-primary font-semibold hover:underline">${t('createAccount')}</a></p>
        </div>
      </div>

      <!-- ===================== FORGOT PASSWORD ===================== -->
      <div id="authForgot" class="hidden">
        <div class="text-center mb-10">
          <h1 class="font-heading text-3xl font-bold">Forgot Password</h1>
          <p class="text-secondary mt-2">Verify your identity to reset your password.</p>
        </div>
        <div class="reg-section max-w-md mx-auto">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">help</span>
            <h2 class="reg-section-title">IDENTITY VERIFICATION</h2>
          </div>
          <p class="text-sm text-secondary mb-5">Please enter the following mandatory details to verify your account.</p>
          <div class="space-y-5">
            <div class="float-field">
              <input class="float-input" id="forgotCivilId" placeholder=" " maxlength="12">
              <label class="float-label">Civil ID <span class="required">*</span></label>
              <span class="float-hint">12-digit Kuwait Civil ID number</span>
            </div>
            <div class="float-field">
              <div class="flex">
                <span class="phone-prefix">+965</span>
                <input class="float-input phone-input" id="forgotPhone" placeholder=" " maxlength="8">
              </div>
              <label class="float-label" style="left:72px">Mobile Number <span class="required">*</span></label>
              <span class="float-hint">8-digit registered mobile number</span>
            </div>
            <div class="float-field">
              <input class="float-input" type="email" id="forgotEmail" placeholder=" ">
              <label class="float-label">Email Address <span class="required">*</span></label>
              <span class="float-hint">Email used during registration</span>
            </div>
          </div>
          <button class="btn-hero w-full justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all mt-6" id="forgotSubmitBtn">VERIFY &amp; SEND RESET LINK</button>
          <p class="text-center text-sm text-secondary mt-4"><button type="button" class="text-primary font-semibold hover:underline cursor-pointer" id="backToLoginFromForgot">← Back to Sign In</button></p>
        </div>
      </div>

      <!-- ===================== RESET PASSWORD ===================== -->
      <div id="authReset" class="hidden">
        <div class="text-center mb-10">
          <h1 class="font-heading text-3xl font-bold">Reset Password</h1>
          <p class="text-secondary mt-2">Create a new password for your account.</p>
        </div>
        <div class="reg-section max-w-md mx-auto">
          <div class="reg-section-header">
            <span class="material-symbols-outlined reg-section-icon">lock_reset</span>
            <h2 class="reg-section-title">NEW PASSWORD</h2>
          </div>
          <p class="text-sm text-secondary mb-3" id="resetUserInfo"></p>
          <div class="space-y-5">
            <div>
              <div class="float-field">
                <div class="relative">
                  <input class="float-input pr-10" type="password" id="resetPassword" placeholder=" ">
                  <label class="float-label">New Password <span class="required">*</span></label>
                  <button type="button" class="pwd-toggle" id="toggleResetPwd">
                    <span class="material-symbols-outlined text-lg">visibility_off</span>
                  </button>
                </div>
                <span class="float-hint">Minimum 10 characters with mixed case, number & symbol</span>
              </div>
                  <span class="material-symbols-outlined text-lg">visibility_off</span>
                </button>
              </div>
              <div class="mt-3">
                <div class="pwd-strength-bar"><div class="pwd-strength-fill" id="resetPwdStrengthFill"></div></div>
                <span class="text-xs font-semibold mt-1 block" id="resetPwdStrengthLabel" style="color:#9ca3af">Enter a password</span>
              </div>
              <ul class="pwd-rules mt-3" id="resetPwdRules">
                <li id="resetRuleLength"><span class="material-symbols-outlined">close</span> At least 10 characters</li>
                <li id="resetRuleUpper"><span class="material-symbols-outlined">close</span> One uppercase letter (A-Z)</li>
                <li id="resetRuleLower"><span class="material-symbols-outlined">close</span> One lowercase letter (a-z)</li>
                <li id="resetRuleNumber"><span class="material-symbols-outlined">close</span> One number (0-9)</li>
                <li id="resetRuleSpecial"><span class="material-symbols-outlined">close</span> One special character (!@#$...)</li>
              </ul>
            </div>
            <div>
              <div class="float-field">
                <div class="relative">
                  <input class="float-input pr-10" type="password" id="resetConfirmPassword" placeholder=" ">
                  <label class="float-label">Confirm New Password <span class="required">*</span></label>
                  <button type="button" class="pwd-toggle" id="toggleResetConfirmPwd">
                    <span class="material-symbols-outlined text-lg">visibility_off</span>
                  </button>
                </div>
                <span class="float-hint">Re-enter your new password to confirm</span>
              </div>
              <p class="text-xs mt-2" id="resetPwdMatchMsg" style="color:#9ca3af">&nbsp;</p>
            </div>
          </div>
          <button class="btn-hero w-full justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all mt-6" id="resetSubmitBtn">RESET PASSWORD</button>
          <p class="text-center text-sm text-secondary mt-4"><button type="button" class="text-primary font-semibold hover:underline cursor-pointer" id="backToLoginFromReset">← Back to Sign In</button></p>
        </div>
      </div>

      <!-- ===================== ACCOUNT EXISTS MODAL ===================== -->
      <div id="accountExistsModal" class="auth-modal-overlay hidden">
        <div class="auth-modal">
          <div class="auth-modal-header">
            <span class="material-symbols-outlined" style="font-size:40px;color:#bd0014">account_circle</span>
            <h2 class="font-heading text-xl font-bold mt-3">Account Already Exists</h2>
            <p class="text-sm text-secondary mt-2" id="existsModalMsg">An account with this information already exists.</p>
          </div>
          <div class="auth-modal-body">
            <button class="auth-modal-option" id="existsForgotBtn">
              <span class="material-symbols-outlined">help</span>
              <div>
                <strong>Forgot Password</strong>
                <p class="text-xs text-secondary mt-0.5">I don't remember my login credentials</p>
              </div>
            </button>
            <button class="auth-modal-option" id="existsResetBtn">
              <span class="material-symbols-outlined">lock_reset</span>
              <div>
                <strong>Reset Password</strong>
                <p class="text-xs text-secondary mt-0.5">I want to set a new password</p>
              </div>
            </button>
          </div>
          <button class="text-sm text-secondary hover:text-on-surface mt-4 cursor-pointer" id="existsCloseBtn">Cancel</button>
        </div>
      </div>

      <!-- ===================== EMAIL SENT CONFIRMATION ===================== -->
      <div id="emailSentModal" class="auth-modal-overlay hidden">
        <div class="auth-modal">
          <div class="auth-modal-header">
            <span class="material-symbols-outlined" style="font-size:48px;color:#16a34a">mark_email_read</span>
            <h2 class="font-heading text-xl font-bold mt-3">Reset Link Sent!</h2>
            <p class="text-sm text-secondary mt-2" id="emailSentMsg">A password reset link has been sent to your email address.</p>
          </div>
          <div class="auth-modal-body">
            <p class="text-sm text-secondary">Please check your inbox and follow the link to reset your password. The link will expire in 30 minutes.</p>
            <p class="text-xs text-secondary mt-3">Didn't receive the email? Check your spam folder or try again.</p>
          </div>
          <button class="btn-hero px-8 justify-center mt-4" id="emailSentOkBtn">CONTINUE TO RESET</button>
        </div>
      </div>

    </div>`;
  }

  /* ----- PROFILE / DASHBOARD ----- */
  function profilePage() {
    if (!state.user) { location.hash = '#/register'; return ''; }
    const u = state.user;
    const userOrders = state.orders;
    const userInquiries = state.inquiries;
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('myAccount')}</span>
      </div>

      <!-- User Header -->
      <div class="bg-white rounded-2xl border border-outline-variant p-6 flex flex-wrap items-center gap-6">
        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-primary">person</span>
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="font-heading text-xl font-bold">${u.firstName} ${u.lastName}</h1>
          <p class="text-sm text-secondary">${u.email || ''} · ${u.phone}</p>
          <p class="text-xs text-secondary mt-1">Civil ID: ${u.civilId || '—'} · ${t('governorate')}: ${u.address?.governorate || u.governorate || '—'}</p>
        </div>
        <button class="btn-outline text-sm" id="logoutBtn">${t('logout')}</button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div class="stat-card"><div class="stat-value text-primary">${userOrders.length}</div><div class="stat-label">${t('orders')}</div></div>
        <div class="stat-card"><div class="stat-value">${userInquiries.length}</div><div class="stat-label">${t('inquiries')}</div></div>
        <div class="stat-card"><div class="stat-value">${state.cart.length}</div><div class="stat-label">${t('yourCart')}</div></div>
      </div>

      <!-- Tabs -->
      <div>
        <div class="tab-group" id="profileTabs">
          <button class="tab-btn active" data-tab="orders">${t('orders')}</button>
          <button class="tab-btn" data-tab="inquiries">${t('inquiries')}</button>
          <button class="tab-btn" data-tab="info">${t('personalInfo')}</button>
        </div>

        <!-- Orders Tab -->
        <div class="mt-6" id="tab-orders">
          ${userOrders.length ? `<div class="bg-white rounded-2xl border border-outline-variant overflow-hidden">
            <table class="admin-table">
              <thead><tr><th>${t('orderId')}</th><th>${t('items')}</th><th>${t('date')}</th><th>${t('total')}</th><th>${t('status')}</th></tr></thead>
              <tbody>
                ${userOrders.map(o => `<tr>
                  <td class="font-mono text-xs">${o.id}</td>
                  <td>${o.items.map(i => i.name).join(', ')}</td>
                  <td class="text-sm text-secondary">${o.date}</td>
                  <td class="font-semibold">${fmt(o.total)}</td>
                  <td><span class="badge ${o.status === 'Delivered' ? 'badge-in-stock' : 'badge-offer'}">${o.status}</span></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>` : `<div class="text-center py-12 text-secondary"><span class="material-symbols-outlined text-5xl mb-3 block opacity-30">receipt_long</span><p>${t('noOrders')}</p></div>`}
        </div>

        <!-- Inquiries Tab -->
        <div class="mt-6 hidden" id="tab-inquiries">
          ${userInquiries.length ? `<div class="bg-white rounded-2xl border border-outline-variant overflow-hidden">
            <table class="admin-table">
              <thead><tr><th>${t('inquiryId')}</th><th>${t('items')}</th><th>${t('status')}</th><th>${t('date')}</th></tr></thead>
              <tbody>
                ${userInquiries.map(q => `<tr>
                  <td class="font-mono text-xs">${q.id}</td>
                  <td>${q.items.map(i => i.name).join(', ')}</td>
                  <td><span class="badge ${q.status === 'Responded' ? 'badge-in-stock' : 'badge-offer'}">${q.status}</span></td>
                  <td class="text-sm text-secondary">${q.date}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>` : `<div class="text-center py-12 text-secondary"><span class="material-symbols-outlined text-5xl mb-3 block opacity-30">help_outline</span><p>${t('noInquiries')}</p></div>`}
        </div>

        <!-- Personal Info Tab -->
        <div class="mt-6 hidden" id="tab-info">
          <div class="bg-white rounded-2xl border border-outline-variant p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><span class="text-secondary">${t('firstName')}</span><p class="font-semibold mt-1">${u.firstName}</p></div>
              <div><span class="text-secondary">${t('lastName')}</span><p class="font-semibold mt-1">${u.lastName}</p></div>
              <div><span class="text-secondary">Civil ID</span><p class="font-semibold mt-1">${u.civilId}</p></div>
              <div><span class="text-secondary">${t('email')}</span><p class="font-semibold mt-1">${u.email}</p></div>
              <div><span class="text-secondary">${t('phone')}</span><p class="font-semibold mt-1">${u.phone}</p></div>
              <div><span class="text-secondary">${t('governorate')}</span><p class="font-semibold mt-1">${u.governorate || '—'}</p></div>
              <div class="sm:col-span-2"><span class="text-secondary">${t('address')}</span><p class="font-semibold mt-1">${u.address || '—'}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  /* ----- OFFERS PAGE ----- */
  function offersPage() {
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('offersDeals')}</span>
      </div>
      <h1 class="font-heading text-2xl font-bold">${t('offersDeals')}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${D.cmsCampaigns.filter(c => c.status === 'Active').map(c => `
        <div class="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition">
          <span class="badge badge-offer mb-3">${c.type === 'percentage' ? c.value + '% OFF' : fmt(c.value) + ' OFF'}</span>
          <h3 class="font-heading font-bold text-lg">${c.name}</h3>
          <p class="text-sm text-secondary mt-2">Applies to: ${c.categories.join(', ')}</p>
          <a href="#/shop" class="btn-hero mt-4 text-sm py-2 px-5">Shop Now</a>
        </div>`).join('')}
      </div>
    </div>`;
  }

  /* ----- LOCATIONS PAGE ----- */
  function locationsPage() {
    return `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <div class="breadcrumbs">
        <a href="#/home">${t('home')}</a><span class="sep">›</span>
        <span class="font-semibold text-on-surface">${t('ourLocations')}</span>
      </div>
      <h1 class="font-heading text-2xl font-bold">${t('ourLocations')}</h1>
      <p class="text-secondary">Find an AlSayer showroom or service center near you.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${D.governorates.map(g => `
        <div class="bg-white rounded-2xl border border-outline-variant p-6 hover:shadow-md transition">
          <span class="material-symbols-outlined text-3xl text-primary mb-3">location_on</span>
          <h3 class="font-heading font-bold">${g}</h3>
          <p class="text-sm text-secondary mt-2">AlSayer ${g} Showroom</p>
          <p class="text-xs text-secondary mt-1">Sat–Thu: 9AM — 9PM</p>
        </div>`).join('')}
      </div>
    </div>`;
  }

  /* ----- 404 ----- */
  function notFoundPage() {
    return `
    <div class="p-6 max-w-lg mx-auto text-center py-24">
      <span class="material-symbols-outlined text-7xl text-outline-variant mb-4 block">explore_off</span>
      <h1 class="font-heading text-3xl font-bold">Page Not Found</h1>
      <p class="text-secondary mt-2">The page you're looking for doesn't exist.</p>
      <a href="#/home" class="btn-hero mt-6 inline-flex">Back to Home</a>
    </div>`;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function route() {
    const hash = location.hash || '#/home';
    const parts = hash.replace('#/', '').split('/');
    state.currentRoute = hash;

    const app = $('#app');
    let html = '';
    const lifestyleIds = D.lifestyleCategories.map(c => c.id);
    const vehicleIds = D.vehicles.map(v => v.id);

    if (parts[0] === 'home' || parts[0] === '') {
      html = homePage();
    } else if (lifestyleIds.includes(parts[0]) && !parts[1]) {
      html = catalogPage(parts[0]);
    } else if (lifestyleIds.includes(parts[0]) && parts[1]) {
      const product = findProduct(parts[1]);
      const cat = D.lifestyleCategories.find(c => c.id === parts[0]);
      html = detailPage(product, [
        { label: t('home'), href: '#/home' },
        { label: cat ? cat.name : parts[0], href: `#/${parts[0]}` },
        { label: product ? product.name : 'Detail' }
      ]);
    } else if (parts[0] === 'shop' && !parts[1]) {
      html = shopHubPage();
    } else if (parts[0] === 'shop' && vehicleIds.includes(parts[1]) && !parts[2]) {
      html = vehicleAccessoriesPage(parts[1]);
    } else if (parts[0] === 'shop' && vehicleIds.includes(parts[1]) && parts[2]) {
      const product = findProduct(parts[2]);
      const vehicle = D.vehicles.find(v => v.id === parts[1]);
      html = detailPage(product, [
        { label: t('home'), href: '#/home' },
        { label: t('shop'), href: '#/shop' },
        { label: vehicle ? vehicle.name : parts[1], href: `#/shop/${parts[1]}` },
        { label: product ? product.name : 'Detail' }
      ]);
    } else if (parts[0] === 'merchandise' && !parts[1]) {
      html = merchandisePage();
    } else if (parts[0] === 'merchandise' && parts[1]) {
      const product = D.merchandise.find(p => p.id === parts[1]);
      html = detailPage(product, [
        { label: t('home'), href: '#/home' },
        { label: t('merchandise'), href: '#/merchandise' },
        { label: product ? product.name : 'Detail' }
      ]);
    } else if (parts[0] === 'checkout') {
      html = checkoutPage();
    } else if (parts[0] === 'register') {
      html = registerPage(parts[1] === 'login' ? 'login' : 'register');
    } else if (parts[0] === 'profile') {
      html = profilePage();
    } else if (parts[0] === 'offers') {
      html = offersPage();
    } else if (parts[0] === 'locations') {
      html = locationsPage();
    } else {
      html = notFoundPage();
    }

    app.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateSidebar();
    updateActiveNav();
    bindPageEvents();
    translateStaticUI();
  }

  /* ===== Sidebar ===== */
  function updateSidebar() {
    const nav = $('#sidebarNav');
    nav.innerHTML = D.lifestyleCategories.map(c => `
      <a href="#/${c.id}" class="sidebar-link ${state.currentRoute === '#/' + c.id ? 'active' : ''}">
        <span class="material-symbols-outlined">${c.icon}</span>
        ${c.name}
      </a>
    `).join('');
  }

  function updateActiveNav() {
    $$('[data-nav]', $('#desktopNav')).forEach(a => {
      a.classList.toggle('bg-surface-ctr-high', state.currentRoute.includes(a.dataset.nav));
    });
    $$('.mobile-nav-item', $('#mobileNav')).forEach(btn => {
      btn.classList.toggle('active', state.currentRoute === btn.dataset.route);
    });
  }

  /* ===== Page-Specific Event Binding ===== */
  function bindPageEvents() {
    // Quantity selectors on detail page
    const qtyEl = $('#detailQty');
    const minus = $('#detailQtyMinus');
    const plus = $('#detailQtyPlus');
    if (qtyEl && minus && plus) {
      let qty = 1;
      minus.addEventListener('click', () => { if (qty > 1) { qty--; qtyEl.textContent = qty; } });
      plus.addEventListener('click', () => { qty++; qtyEl.textContent = qty; });
    }

    // Add to Cart button
    const addBtn = $('#addToCartBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const product = findProduct(addBtn.dataset.productId);
        if (product) {
          const qty = parseInt(qtyEl ? qtyEl.textContent : '1');
          addToCart(product, qty);
        }
      });
    }

    // Profile tabs
    const tabs = $$('.tab-btn', $('#profileTabs'));
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        ['orders', 'inquiries', 'info'].forEach(t => {
          const panel = $(`#tab-${t}`);
          if (panel) panel.classList.toggle('hidden', t !== btn.dataset.tab);
        });
      });
    });

    // Auth tab switching (register / login)
    const authTabs = $$('.auth-tab', $('#authTabs'));
    authTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.authTab;
        const regPanel = $('#authRegister');
        const loginPanel = $('#authLogin');
        if (regPanel) regPanel.classList.toggle('hidden', tab !== 'register');
        if (loginPanel) loginPanel.classList.toggle('hidden', tab !== 'login');
        // Update breadcrumb
        const bcLabel = $('#authBreadcrumbLabel');
        if (bcLabel) bcLabel.textContent = tab === 'register' ? t('createAccount') : t('signIn');
      });
    });

    // Register form submit
    const registerBtn = $('#registerBtn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        const salutation = ($('#regSalutation') || {}).value;
        const firstName = ($('#regFirstName') || {}).value?.trim();
        const lastName = ($('#regLastName') || {}).value?.trim();
        const civilId = ($('#regCivilId') || {}).value?.trim();
        const email = ($('#regEmail') || {}).value?.trim();
        const phone = ($('#regPhone') || {}).value?.trim();
        const password = ($('#regPassword') || {}).value;
        const confirmPassword = ($('#regConfirmPassword') || {}).value;
        const plateNumber = ($('#regPlateNumber') || {}).value?.trim();
        const model = ($('#regModel') || {}).value;
        const year = ($('#regYear') || {}).value;
        const governorate = ($('#regGovernorate') || {}).value;
        const area = ($('#regArea') || {}).value?.trim();
        const block = ($('#regBlock') || {}).value?.trim();
        const street = ($('#regStreet') || {}).value?.trim();
        const building = ($('#regBuilding') || {}).value?.trim();
        const floor = ($('#regFloor') || {}).value?.trim();
        const flat = ($('#regFlat') || {}).value?.trim();
        const commPrefs = {
          sms: ($('#prefSMS') || {}).checked,
          whatsapp: ($('#prefWhatsApp') || {}).checked,
          email: ($('#prefEmail') || {}).checked,
          call: ($('#prefCall') || {}).checked
        };

        // Validate required fields
        const reqFields = [
          ['#regFirstName', firstName, 'First Name is required'],
          ['#regLastName', lastName, 'Last Name is required'],
          ['#regCivilId', civilId, 'Civil ID is required'],
          ['#regEmail', email, 'Email Address is required'],
          ['#regPhone', phone, 'Mobile Number is required'],
          ['#regPassword', password, 'Password is required']
        ];
        for (const [sel, val, msg] of reqFields) {
          if (!val) {
            toast(msg, 'error');
            $(sel)?.classList.add('input-error');
            $(sel)?.focus();
            return;
          }
        }
        if (civilId.length < 12) { toast('Civil ID must be 12 digits', 'error'); $('#regCivilId')?.classList.add('input-error'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('Please enter a valid email address', 'error'); $('#regEmail')?.classList.add('input-error'); return; }
        if (phone.length < 8) { toast('Please enter a valid 8-digit Kuwait mobile number', 'error'); $('#regPhone')?.classList.add('input-error'); return; }
        if (!plateNumber) { toast('Plate Number is required', 'error'); $('#regPlateNumber')?.classList.add('input-error'); return; }
        if (!model) { toast('Please select a vehicle model', 'error'); $('#regModel')?.classList.add('input-error'); return; }
        if (!governorate) { toast('Please select a governorate', 'error'); $('#regGovernorate')?.classList.add('input-error'); return; }
        if (!area) { toast('Area is required', 'error'); $('#regArea')?.classList.add('input-error'); return; }
        if (!block) { toast('Block is required', 'error'); $('#regBlock')?.classList.add('input-error'); return; }
        if (password.length < 10) { toast('Password must be at least 10 characters', 'error'); return; }
        if (!/[A-Z]/.test(password)) { toast('Password must contain an uppercase letter', 'error'); return; }
        if (!/[a-z]/.test(password)) { toast('Password must contain a lowercase letter', 'error'); return; }
        if (!/[0-9]/.test(password)) { toast('Password must contain a number', 'error'); return; }
        if (!/[^A-Za-z0-9]/.test(password)) { toast('Password must contain a special character', 'error'); return; }
        if (password !== confirmPassword) { toast('Passwords do not match', 'error'); return; }

        // Check for duplicate user (Civil ID or Phone)
        const existingUsers = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
        const duplicateByCivil = existingUsers.find(u => u.civilId === civilId);
        const duplicateByPhone = existingUsers.find(u => u.phone === '+965' + phone);
        const duplicateByEmail = existingUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());

        if (duplicateByCivil || duplicateByPhone || duplicateByEmail) {
          const dup = duplicateByCivil || duplicateByPhone || duplicateByEmail;
          let reason = '';
          if (duplicateByCivil) reason = 'Civil ID <strong>' + civilId + '</strong>';
          else if (duplicateByPhone) reason = 'Mobile Number <strong>+965 ' + phone + '</strong>';
          else reason = 'Email <strong>' + email + '</strong>';

          const modal = $('#accountExistsModal');
          const msg = $('#existsModalMsg');
          if (msg) msg.innerHTML = 'An account registered with ' + reason + ' already exists. Would you like to recover your account?';
          if (modal) modal.classList.remove('hidden');
          // Store the found user's civil ID for forgot/reset flow
          modal.dataset.civilId = dup.civilId;
          return;
        }

        // Create new user
        const newUser = {
          civilId, salutation, firstName, lastName,
          email, phone: '+965' + phone, password,
          vehicle: { plateNumber, model, year },
          address: { governorate, area, block, street, building, floor, flat },
          commPrefs,
          createdAt: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('sayarti_users', JSON.stringify(existingUsers));

        // Also set as current logged-in user
        const sessionUser = { ...newUser };
        delete sessionUser.password;
        state.user = sessionUser;
        saveUser();
        updateAuthIcon();
        toast(t('accountCreated'), 'success');
        setTimeout(() => { location.hash = state.cart.length ? '#/checkout' : '#/profile'; }, 800);
      });
    }

    // File upload label
    const vehicleDocInput = $('#regVehicleDoc');
    if (vehicleDocInput) {
      vehicleDocInput.addEventListener('change', (e) => {
        const name = e.target.files[0]?.name;
        const label = $('#regFileName');
        if (label && name) label.textContent = name;
      });
    }

    // Password strength & toggle
    const regPwd = $('#regPassword');
    const regConfirmPwd = $('#regConfirmPassword');
    if (regPwd) {
      regPwd.addEventListener('input', () => {
        const val = regPwd.value;
        const checks = {
          length: val.length >= 10,
          upper: /[A-Z]/.test(val),
          lower: /[a-z]/.test(val),
          number: /[0-9]/.test(val),
          special: /[^A-Za-z0-9]/.test(val)
        };
        const ruleMap = { length: '#ruleLength', upper: '#ruleUpper', lower: '#ruleLower', number: '#ruleNumber', special: '#ruleSpecial' };
        Object.entries(ruleMap).forEach(([key, sel]) => {
          const el = $(sel);
          if (!el) return;
          const icon = el.querySelector('.material-symbols-outlined');
          if (checks[key]) {
            el.classList.add('pass'); el.classList.remove('fail');
            if (icon) icon.textContent = 'check';
          } else {
            el.classList.remove('pass'); el.classList.add('fail');
            if (icon) icon.textContent = 'close';
          }
        });
        const score = Object.values(checks).filter(Boolean).length;
        const fill = $('#pwdStrengthFill');
        const label = $('#pwdStrengthLabel');
        const levels = [
          { w: '0%', color: '#9ca3af', text: 'Enter a password' },
          { w: '20%', color: '#ef4444', text: 'Very Weak' },
          { w: '40%', color: '#f97316', text: 'Weak' },
          { w: '60%', color: '#eab308', text: 'Fair' },
          { w: '80%', color: '#22c55e', text: 'Strong' },
          { w: '100%', color: '#16a34a', text: 'Very Strong' }
        ];
        const lvl = val.length === 0 ? levels[0] : levels[score];
        if (fill) { fill.style.width = lvl.w; fill.style.background = lvl.color; }
        if (label) { label.textContent = lvl.text; label.style.color = lvl.color; }
        // Check confirm match
        if (regConfirmPwd && regConfirmPwd.value) {
          const msg = $('#pwdMatchMsg');
          if (msg) {
            if (val === regConfirmPwd.value) { msg.textContent = '\u2713 Passwords match'; msg.style.color = '#16a34a'; }
            else { msg.textContent = '\u2717 Passwords do not match'; msg.style.color = '#ef4444'; }
          }
        }
      });
    }
    if (regConfirmPwd) {
      regConfirmPwd.addEventListener('input', () => {
        const msg = $('#pwdMatchMsg');
        if (!msg || !regPwd) return;
        if (!regConfirmPwd.value) { msg.innerHTML = '&nbsp;'; return; }
        if (regPwd.value === regConfirmPwd.value) { msg.textContent = '\u2713 Passwords match'; msg.style.color = '#16a34a'; }
        else { msg.textContent = '\u2717 Passwords do not match'; msg.style.color = '#ef4444'; }
      });
    }
    // Toggle password visibility
    [['#toggleRegPwd','#regPassword'],['#toggleRegConfirmPwd','#regConfirmPassword']].forEach(([btnSel, inputSel]) => {
      const btn = $(btnSel), inp = $(inputSel);
      if (btn && inp) {
        btn.addEventListener('click', () => {
          const show = inp.type === 'password';
          inp.type = show ? 'text' : 'password';
          btn.querySelector('.material-symbols-outlined').textContent = show ? 'visibility' : 'visibility_off';
        });
      }
    });

    // Clear error state on input focus
    $$('.form-input, .float-input').forEach(inp => {
      inp.addEventListener('focus', () => inp.classList.remove('input-error'));
    });

    // Login form submit
    const loginBtn = $('#loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const civilId = ($('#loginCivilId') || {}).value?.trim();
        const password = ($('#loginPassword') || {}).value;

        if (!civilId || !password) {
          toast(t('fillAllFields'), 'error');
          if (!civilId) $('#loginCivilId')?.classList.add('input-error');
          if (!password) $('#loginPassword')?.classList.add('input-error');
          return;
        }

        // Check against stored users
        const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
        const found = users.find(u => u.civilId === civilId);

        if (!found) {
          toast('No account found with this Civil ID. Please register first.', 'error');
          $('#loginCivilId')?.classList.add('input-error');
          return;
        }

        if (found.password !== password) {
          toast('Incorrect password. Please try again or use Forgot Password.', 'error');
          $('#loginPassword')?.classList.add('input-error');
          return;
        }

        // Check if account is inactive (deactivated by admin)
        const cmsCustomers = JSON.parse(localStorage.getItem('sayarti_cms_customers') || '[]');
        const cmsMatch = cmsCustomers.find(c => c.civilId === civilId);
        const isInactive = found.status === 'Inactive' || (cmsMatch && cmsMatch.status === 'Inactive');
        if (isInactive) {
          toast('Your account has been deactivated. Please contact our support team for assistance.', 'error');
          return;
        }

        // Successful login
        const sessionUser = { ...found };
        delete sessionUser.password;
        state.user = sessionUser;
        saveUser();
        updateAuthIcon();
        toast(t('welcomeBack') + ' ' + found.firstName + '!', 'success');
        setTimeout(() => { location.hash = state.cart.length ? '#/checkout' : '#/profile'; }, 800);
      });
    }

    // Login password toggle
    const toggleLoginPwd = $('#toggleLoginPwd');
    if (toggleLoginPwd) {
      toggleLoginPwd.addEventListener('click', () => {
        const inp = $('#loginPassword');
        if (!inp) return;
        const show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        toggleLoginPwd.querySelector('.material-symbols-outlined').textContent = show ? 'visibility' : 'visibility_off';
      });
    }

    // Forgot password link
    const forgotPwdLink = $('#forgotPwdLink');
    if (forgotPwdLink) {
      forgotPwdLink.addEventListener('click', () => {
        showAuthPanel('forgot');
      });
    }

    // Back to login buttons
    const backToLoginFromForgot = $('#backToLoginFromForgot');
    if (backToLoginFromForgot) {
      backToLoginFromForgot.addEventListener('click', () => {
        showAuthPanel('login');
      });
    }
    const backToLoginFromReset = $('#backToLoginFromReset');
    if (backToLoginFromReset) {
      backToLoginFromReset.addEventListener('click', () => {
        showAuthPanel('login');
      });
    }

    // Helper to show/hide auth panels
    function showAuthPanel(panel) {
      ['authRegister', 'authLogin', 'authForgot', 'authReset'].forEach(id => {
        const el = $('#' + id);
        if (el) el.classList.toggle('hidden', id !== 'auth' + panel.charAt(0).toUpperCase() + panel.slice(1));
      });
      const bcLabel = $('#authBreadcrumbLabel');
      if (bcLabel) {
        const labels = { register: t('createAccount'), login: t('signIn'), forgot: 'Forgot Password', reset: 'Reset Password' };
        bcLabel.textContent = labels[panel] || t('signIn');
      }
    }

    // Forgot password submit
    const forgotSubmitBtn = $('#forgotSubmitBtn');
    if (forgotSubmitBtn) {
      forgotSubmitBtn.addEventListener('click', () => {
        const civilId = ($('#forgotCivilId') || {}).value?.trim();
        const phone = ($('#forgotPhone') || {}).value?.trim();
        const email = ($('#forgotEmail') || {}).value?.trim();

        if (!civilId || !phone || !email) {
          toast('All fields are required for verification', 'error');
          if (!civilId) $('#forgotCivilId')?.classList.add('input-error');
          if (!phone) $('#forgotPhone')?.classList.add('input-error');
          if (!email) $('#forgotEmail')?.classList.add('input-error');
          return;
        }

        const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
        const found = users.find(u =>
          u.civilId === civilId &&
          u.phone === '+965' + phone &&
          u.email?.toLowerCase() === email.toLowerCase()
        );

        if (!found) {
          toast('No matching account found. Please check your details.', 'error');
          return;
        }

        // Show email sent confirmation
        const emailModal = $('#emailSentModal');
        const emailMsg = $('#emailSentMsg');
        if (emailMsg) {
          const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
          emailMsg.innerHTML = 'A password reset link has been sent to <strong>' + maskedEmail + '</strong>.';
        }
        if (emailModal) emailModal.classList.remove('hidden');
        // Store civil ID for reset flow
        emailModal.dataset.civilId = civilId;
      });
    }

    // Email sent OK → go to reset panel
    const emailSentOkBtn = $('#emailSentOkBtn');
    if (emailSentOkBtn) {
      emailSentOkBtn.addEventListener('click', () => {
        const emailModal = $('#emailSentModal');
        const civilId = emailModal?.dataset.civilId;
        if (emailModal) emailModal.classList.add('hidden');
        if (civilId) {
          const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
          const user = users.find(u => u.civilId === civilId);
          const info = $('#resetUserInfo');
          if (info && user) info.textContent = 'Resetting password for ' + user.firstName + ' ' + user.lastName + ' (' + user.civilId + ')';
          const resetPanel = $('#authReset');
          if (resetPanel) resetPanel.dataset.civilId = civilId;
        }
        showAuthPanel('reset');
      });
    }

    // Account exists modal buttons
    const existsForgotBtn = $('#existsForgotBtn');
    if (existsForgotBtn) {
      existsForgotBtn.addEventListener('click', () => {
        const modal = $('#accountExistsModal');
        const civilId = modal?.dataset.civilId;
        if (modal) modal.classList.add('hidden');
        showAuthPanel('forgot');
        if (civilId) $('#forgotCivilId').value = civilId;
      });
    }

    const existsResetBtn = $('#existsResetBtn');
    if (existsResetBtn) {
      existsResetBtn.addEventListener('click', () => {
        const modal = $('#accountExistsModal');
        const civilId = modal?.dataset.civilId;
        if (modal) modal.classList.add('hidden');
        showAuthPanel('forgot');
        if (civilId) $('#forgotCivilId').value = civilId;
      });
    }

    const existsCloseBtn = $('#existsCloseBtn');
    if (existsCloseBtn) {
      existsCloseBtn.addEventListener('click', () => {
        $('#accountExistsModal')?.classList.add('hidden');
      });
    }

    // Reset password submit
    const resetSubmitBtn = $('#resetSubmitBtn');
    if (resetSubmitBtn) {
      resetSubmitBtn.addEventListener('click', () => {
        const newPwd = ($('#resetPassword') || {}).value;
        const confirmPwd = ($('#resetConfirmPassword') || {}).value;

        if (!newPwd) { toast('Please enter a new password', 'error'); return; }
        if (newPwd.length < 10) { toast('Password must be at least 10 characters', 'error'); return; }
        if (!/[A-Z]/.test(newPwd)) { toast('Password must contain an uppercase letter', 'error'); return; }
        if (!/[a-z]/.test(newPwd)) { toast('Password must contain a lowercase letter', 'error'); return; }
        if (!/[0-9]/.test(newPwd)) { toast('Password must contain a number', 'error'); return; }
        if (!/[^A-Za-z0-9]/.test(newPwd)) { toast('Password must contain a special character', 'error'); return; }
        if (newPwd !== confirmPwd) { toast('Passwords do not match', 'error'); return; }

        const resetPanel = $('#authReset');
        const civilId = resetPanel?.dataset.civilId;
        if (!civilId) { toast('Session expired. Please try again.', 'error'); showAuthPanel('forgot'); return; }

        const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
        const idx = users.findIndex(u => u.civilId === civilId);
        if (idx === -1) { toast('Account not found. Please try again.', 'error'); return; }

        users[idx].password = newPwd;
        localStorage.setItem('sayarti_users', JSON.stringify(users));

        toast('Password reset successful! You can now sign in with your new password.', 'success');
        setTimeout(() => showAuthPanel('login'), 1000);
      });
    }

    // Reset password strength meter
    const resetPwd = $('#resetPassword');
    const resetConfirmPwd = $('#resetConfirmPassword');
    if (resetPwd) {
      resetPwd.addEventListener('input', () => {
        const val = resetPwd.value;
        const checks = {
          length: val.length >= 10,
          upper: /[A-Z]/.test(val),
          lower: /[a-z]/.test(val),
          number: /[0-9]/.test(val),
          special: /[^A-Za-z0-9]/.test(val)
        };
        const ruleMap = { length: '#resetRuleLength', upper: '#resetRuleUpper', lower: '#resetRuleLower', number: '#resetRuleNumber', special: '#resetRuleSpecial' };
        Object.entries(ruleMap).forEach(([key, sel]) => {
          const el = $(sel);
          if (!el) return;
          const icon = el.querySelector('.material-symbols-outlined');
          if (checks[key]) {
            el.classList.add('pass'); el.classList.remove('fail');
            if (icon) icon.textContent = 'check';
          } else {
            el.classList.remove('pass'); el.classList.add('fail');
            if (icon) icon.textContent = 'close';
          }
        });
        const score = Object.values(checks).filter(Boolean).length;
        const fill = $('#resetPwdStrengthFill');
        const label = $('#resetPwdStrengthLabel');
        const levels = [
          { w: '0%', color: '#9ca3af', text: 'Enter a password' },
          { w: '20%', color: '#ef4444', text: 'Very Weak' },
          { w: '40%', color: '#f97316', text: 'Weak' },
          { w: '60%', color: '#eab308', text: 'Fair' },
          { w: '80%', color: '#22c55e', text: 'Strong' },
          { w: '100%', color: '#16a34a', text: 'Very Strong' }
        ];
        const lvl = val.length === 0 ? levels[0] : levels[score];
        if (fill) { fill.style.width = lvl.w; fill.style.background = lvl.color; }
        if (label) { label.textContent = lvl.text; label.style.color = lvl.color; }
        if (resetConfirmPwd && resetConfirmPwd.value) {
          const msg = $('#resetPwdMatchMsg');
          if (msg) {
            if (val === resetConfirmPwd.value) { msg.textContent = '\u2713 Passwords match'; msg.style.color = '#16a34a'; }
            else { msg.textContent = '\u2717 Passwords do not match'; msg.style.color = '#ef4444'; }
          }
        }
      });
    }
    if (resetConfirmPwd) {
      resetConfirmPwd.addEventListener('input', () => {
        const msg = $('#resetPwdMatchMsg');
        if (msg && resetPwd) {
          if (resetPwd.value === resetConfirmPwd.value) { msg.textContent = '\u2713 Passwords match'; msg.style.color = '#16a34a'; }
          else { msg.textContent = '\u2717 Passwords do not match'; msg.style.color = '#ef4444'; }
        }
      });
    }
    // Reset password toggles
    ['toggleResetPwd', 'toggleResetConfirmPwd'].forEach(id => {
      const btn = $('#' + id);
      if (btn) {
        btn.addEventListener('click', () => {
          const inp = id === 'toggleResetPwd' ? $('#resetPassword') : $('#resetConfirmPassword');
          if (!inp) return;
          const show = inp.type === 'password';
          inp.type = show ? 'text' : 'password';
          btn.querySelector('.material-symbols-outlined').textContent = show ? 'visibility' : 'visibility_off';
        });
      }
    });

    // Logout button
    const logoutBtn = $('#logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.user = null;
        saveUser();
        updateAuthIcon();
        toast(t('loggedOut'), 'success');
        setTimeout(() => { location.hash = '#/home'; }, 800);
      });
    }

    // Shop Hub model selector
    const findBtn = $('#findAccessoriesBtn');
    if (findBtn) {
      findBtn.addEventListener('click', () => {
        const sel = $('#modelSelect');
        if (sel && sel.value) location.hash = `#/shop/${sel.value}`;
      });
    }

    // Place order
    const placeBtn = $('#placeOrderBtn');
    if (placeBtn) {
      placeBtn.addEventListener('click', () => {
        if (!state.cart.length) { toast(t('cartEmpty'), 'error'); return; }
        const order = {
          id: 'ORD-' + Date.now().toString(36).toUpperCase(),
          items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: state.cart.reduce((s, i) => s + i.price * i.qty, 0) + 5,
          date: new Date().toLocaleDateString('en-GB'),
          status: 'Processing'
        };
        state.orders.push(order);
        saveOrders();
        state.cart = [];
        saveCart();
        toast(t('orderPlaced'), 'success');
        setTimeout(() => { location.hash = '#/profile'; }, 1200);
      });
    }

    // Submit Inquiry
    const inquiryBtn = $('#submitInquiryBtn');
    if (inquiryBtn) {
      inquiryBtn.addEventListener('click', () => {
        if (!state.cart.length) { toast(t('cartEmpty'), 'error'); return; }
        const inquiry = {
          id: 'INQ-' + Date.now().toString(36).toUpperCase(),
          items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          date: new Date().toLocaleDateString('en-GB'),
          status: 'Pending'
        };
        state.inquiries.push(inquiry);
        saveInquiries();
        state.cart = [];
        saveCart();
        toast(t('inquirySubmitted'), 'success');
        setTimeout(() => { location.hash = '#/profile'; }, 1200);
      });
    }

    // Sort select
    const sortSel = $('#sortSelect');
    if (sortSel) {
      sortSel.addEventListener('change', () => {
        const grid = $('#productGrid');
        if (!grid) return;
        const cards = [...grid.children];
        const priceRe = /(\d+\.\d{3})/;
        cards.sort((a, b) => {
          const pa = parseFloat((a.querySelector('.product-card-price')?.textContent.match(priceRe) || [0, 0])[1]);
          const pb = parseFloat((b.querySelector('.product-card-price')?.textContent.match(priceRe) || [0, 0])[1]);
          if (sortSel.value === 'price-asc') return pa - pb;
          if (sortSel.value === 'price-desc') return pb - pa;
          return 0;
        });
        cards.forEach(c => grid.appendChild(c));
      });
    }

    // Hero Carousel
    const carousel = $('#heroCarousel');
    if (carousel) {
      const slides = $$('.hero-slide', carousel);
      const indicators = $$('.hero-indicator', carousel);
      const imgEls = $$('.hero-img', carousel);
      let current = 0;
      let autoTimer = null;

      function setCarouselImages() {
        const isMobile = window.innerWidth <= 768;
        imgEls.forEach(img => {
          const src = isMobile ? img.dataset.mobile : img.dataset.desktop;
          if (src) img.src = src;
        });
      }

      setCarouselImages();
      window.addEventListener('resize', setCarouselImages);

      function goToSlide(idx) {
        slides[current].classList.remove('active');
        indicators[current].classList.remove('active');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        indicators[current].classList.add('active');
      }

      function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => goToSlide(current + 1), 5000);
      }

      function stopAuto() {
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
      }

      $('#heroPrev').addEventListener('click', () => { goToSlide(current - 1); startAuto(); });
      $('#heroNext').addEventListener('click', () => { goToSlide(current + 1); startAuto(); });
      indicators.forEach(dot => {
        dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.slide)); startAuto(); });
      });

      startAuto();
    }
  }

  /* ============================================================
     GLOBAL EVENT LISTENERS
     ============================================================ */
  function init() {
    // Hash route
    window.addEventListener('hashchange', route);

    // Glass nav scroll effect
    window.addEventListener('scroll', () => {
      $('#mainHeader').classList.toggle('scrolled', window.scrollY > 8);
    });

    // Search toggle
    $('#searchToggle').addEventListener('click', () => {
      const bar = $('#searchBar');
      bar.classList.toggle('hidden');
      if (!bar.classList.contains('hidden')) $('#searchInput').focus();
    });

    // Language toggle
    $('#langToggle').addEventListener('click', () => {
      const isEn = state.lang === 'en';
      state.lang = isEn ? 'ar' : 'en';
      localStorage.setItem('sayarti_lang', state.lang);
      document.documentElement.lang = state.lang;
      document.documentElement.dir = isEn ? 'rtl' : 'ltr';
      const btn = $('#langToggle');
      btn.textContent = isEn ? 'EN' : 'ع';
      btn.style.fontFamily = isEn ? 'Inter, sans-serif' : "'Almarai', sans-serif";
      btn.style.fontSize = isEn ? '12px' : '18px';
      btn.style.color = isEn ? '' : '#bd0014';
      translateStaticUI();
      route();
    });

    // Mobile menu toggle
    const menuToggle = $('#menuToggle');
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebar.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebar.classList.add('hidden');
      overlay.classList.add('hidden');
    });

    // Mobile nav buttons
    $$('.mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => { location.hash = btn.dataset.route; });
    });

    // Cart drawer
    const cartBtn = $('#cartBtn');
    const cartDrawer = $('#cartDrawer');
    const cartPanel = $('#cartPanel');
    const cartClose = $('#cartClose');
    const cartOverlay = $('#cartOverlay');
    const checkoutBtn = $('#checkoutBtn');
    function openCart() {
      cartDrawer.classList.remove('hidden');
      requestAnimationFrame(() => { cartPanel.classList.remove('translate-x-full'); });
    }
    function closeCart() {
      cartPanel.classList.add('translate-x-full');
      setTimeout(() => cartDrawer.classList.add('hidden'), 300);
    }
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', closeCart);

    // Cart item interactions (delegated)
    $('#cartItems').addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('[data-cart-qty]');
      if (qtyBtn) {
        const id = qtyBtn.dataset.cartQty;
        const delta = parseInt(qtyBtn.dataset.delta);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.qty += delta;
          if (item.qty < 1) removeFromCart(id);
          else saveCart();
        }
      }
      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) removeFromCart(removeBtn.dataset.cartRemove);
    });

    // Initialize
    updateCartUI();
    updateAuthIcon();

    // Restore persisted language
    if (state.lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      const btn = $('#langToggle');
      btn.textContent = 'EN';
      btn.style.fontFamily = 'Inter, sans-serif';
      btn.style.fontSize = '12px';
      btn.style.color = '';
    }

    if (!location.hash || location.hash === '#' || location.hash === '#/') location.hash = '#/home';
    else route();
  }

  // Boot
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

