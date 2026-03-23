/**
 * Sayarti CMS — Admin Application
 * Router & Dashboard Templates
 */
(function () {
  'use strict';
  const D = SayartiData;
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];
  const fmt = (n) => Number(n).toFixed(3) + ' KWD';

  /* ===== Auth Helpers ===== */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem('sayarti_admin')); } catch { return null; }
  }
  function setSession(user) {
    sessionStorage.setItem('sayarti_admin', JSON.stringify({ email: user.email, name: user.name, role: user.role, permissions: user.permissions || [], ts: Date.now() }));
  }
  function clearSession() {
    sessionStorage.removeItem('sayarti_admin');
  }
  function isAuthenticated() {
    return !!getSession();
  }

  /* ===== Toast ===== */
  function toast(msg, type = 'info') {
    const c = $('#toastContainer');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span class="material-symbols-outlined text-lg">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>${msg}`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
  }

  /* ============================================================
     CMS PAGE TEMPLATES
     ============================================================ */

  /* ----- ANALYTICS DASHBOARD ----- */
  function analyticsPage() {
    const a = D.cmsAnalytics;
    const maxSales = Math.max(...a.monthlySales.map(m => m.sales));
    const totalAnnualSales = a.monthlySales.reduce((s, m) => s + m.sales, 0);
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Analytics Dashboard</h1>
          <p class="text-sm text-secondary mt-1">Real-time overview of your store performance.</p>
        </div>
        <div class="flex gap-2">
          <select class="form-input py-2 text-sm w-auto">
            <option>Last 30 Days</option><option>Last 7 Days</option><option>This Year</option>
          </select>
          <button class="btn-hero text-sm py-2 px-4"><span class="material-symbols-outlined text-sm">download</span>Export</button>
        </div>
      </div>

      <!-- Metric Cards Row 1 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="admin-card">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><span class="material-symbols-outlined text-green-600">paid</span></div>
            <span class="text-sm text-secondary">Total Revenue</span>
          </div>
          <p class="admin-metric text-green-700">${a.totalSales.toLocaleString()} <span class="text-sm font-normal text-secondary">KWD</span></p>
          <p class="text-xs text-green-600 mt-1"><span class="material-symbols-outlined text-xs">trending_up</span> +18.5% vs last year</p>
        </div>
        <div class="admin-card">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><span class="material-symbols-outlined text-blue-600">shopping_cart</span></div>
            <span class="text-sm text-secondary">Total Orders</span>
          </div>
          <p class="admin-metric text-blue-700">${a.totalOrders.toLocaleString()}</p>
          <p class="text-xs text-blue-600 mt-1"><span class="material-symbols-outlined text-xs">trending_up</span> +24.3% vs last year</p>
        </div>
        <div class="admin-card">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><span class="material-symbols-outlined text-primary">support_agent</span></div>
            <span class="text-sm text-secondary">Total Inquiries</span>
          </div>
          <p class="admin-metric text-primary">${a.totalInquiries.toLocaleString()}</p>
          <p class="text-xs text-green-600 mt-1"><span class="material-symbols-outlined text-xs">trending_up</span> +31.2% vs last year</p>
        </div>
        <div class="admin-card">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><span class="material-symbols-outlined text-purple-600">group</span></div>
            <span class="text-sm text-secondary">Active Customers</span>
          </div>
          <p class="admin-metric text-purple-700">${a.activeCustomers.toLocaleString()}</p>
          <p class="text-xs text-purple-600 mt-1">${a.returningRate}% returning</p>
        </div>
      </div>

      <!-- Metric Cards Row 2 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="admin-card bg-gradient-to-br from-green-50 to-white">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-sm text-secondary">Avg. Order Value</span>
          </div>
          <p class="admin-metric text-lg">${a.avgOrderValue.toFixed(1)} <span class="text-xs font-normal text-secondary">KWD</span></p>
        </div>
        <div class="admin-card bg-gradient-to-br from-blue-50 to-white">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-sm text-secondary">Conversion Rate</span>
          </div>
          <p class="admin-metric text-lg">${a.conversionRate}%</p>
        </div>
        <div class="admin-card bg-gradient-to-br from-amber-50 to-white">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-sm text-secondary">Avg. Days to Close</span>
          </div>
          <p class="admin-metric text-lg">${a.avgDaysToClose} <span class="text-xs font-normal text-secondary">days</span></p>
        </div>
        <div class="admin-card bg-gradient-to-br from-primary/5 to-white">
          <div class="flex items-center gap-3 mb-1">
            <span class="text-sm text-secondary">Annual Sales</span>
          </div>
          <p class="admin-metric text-lg">${totalAnnualSales.toLocaleString()} <span class="text-xs font-normal text-secondary">KWD</span></p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Monthly Sales Chart -->
        <div class="admin-card">
          <h3 class="font-heading font-bold mb-4">Monthly Sales (KWD)</h3>
          <div class="chart-placeholder" style="height:220px">
            ${a.monthlySales.map(m => `
            <div class="flex flex-col items-center gap-1">
              <div class="chart-bar" style="height:${(m.sales / maxSales) * 160}px" title="${m.month}: ${m.sales.toLocaleString()} KWD"></div>
              <span class="text-[10px] text-secondary font-semibold">${m.month}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="admin-card">
          <h3 class="font-heading font-bold mb-4">Inquiries by Category</h3>
          <div class="space-y-3 mt-4">
            ${Object.entries(a.inquiryByCategory).map(([cat, count]) => {
              const pct = Math.round(count / a.totalInquiries * 100);
              const colors = ['bg-primary', 'bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500', 'bg-teal-500'];
              const ci = Object.keys(a.inquiryByCategory).indexOf(cat);
              return `
              <div>
                <div class="flex justify-between text-sm mb-1"><span class="font-medium">${cat}</span><span class="text-secondary">${count} (${pct}%)</span></div>
                <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full ${colors[ci % colors.length]} rounded-full transition-all" style="width:${pct}%"></div></div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Top Products & Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Top Products -->
        <div class="admin-card">
          <h3 class="font-heading font-bold mb-4">Top Selling Products</h3>
          <div class="space-y-3">
            ${(a.topProducts || []).map((p, i) => `
            <div class="flex items-center gap-3 p-3 rounded-xl ${i === 0 ? 'bg-amber-50/60 border border-amber-100' : 'bg-gray-50'}">
              <span class="w-7 h-7 rounded-lg ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-gray-400 text-white' : i === 2 ? 'bg-amber-700 text-white' : 'bg-gray-200 text-secondary'} flex items-center justify-center text-xs font-bold">${i + 1}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold truncate">${p.name}</p>
                <p class="text-xs text-secondary">${p.sales} units sold</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold">${p.revenue.toLocaleString()} <span class="text-xs font-normal text-secondary">KWD</span></p>
                <span class="text-xs ${p.trend === 'up' ? 'text-green-600' : 'text-red-500'}">
                  <span class="material-symbols-outlined text-xs">${p.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                </span>
              </div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="admin-card">
          <h3 class="font-heading font-bold mb-4">Recent Activity</h3>
          <div class="space-y-1 max-h-[340px] overflow-y-auto">
            ${(a.recentActivity || []).map(act => `
            <div class="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition">
              <div class="w-8 h-8 rounded-lg bg-${act.color}-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-${act.color}-600 text-base">${act.icon}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm leading-snug">${act.msg}</p>
                <p class="text-[11px] text-secondary mt-0.5">${act.time}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Vehicle Breakdown -->
      <div class="admin-card">
        <h3 class="font-heading font-bold mb-4">Inquiries by Vehicle Model</h3>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
          ${Object.entries(a.vehicleBreakdown).map(([vehicle, count]) => {
            const pct = Math.round(count / a.totalInquiries * 100);
            return `
          <div class="text-center p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition cursor-default">
            <p class="admin-metric text-lg">${count}</p>
            <p class="text-xs text-secondary mt-1 font-medium">${vehicle}</p>
            <p class="text-[10px] text-secondary">${pct}% of total</p>
          </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  /* ----- PRODUCTS MANAGEMENT ----- */
  function productsPage() {
    const allProducts = [];
    for (const [cat, prods] of Object.entries(D.lifestyleProducts)) {
      prods.forEach(p => allProducts.push({ ...p, source: cat }));
    }
    for (const [veh, prods] of Object.entries(D.vehicleProducts)) {
      prods.forEach(p => allProducts.push({ ...p, source: veh }));
    }
    D.merchandise.forEach(p => allProducts.push({ ...p, source: 'merchandise' }));

    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Product Management</h1>
          <p class="text-sm text-secondary mt-1">${allProducts.length} products across all categories</p>
        </div>
        <button class="btn-hero text-sm py-2.5 px-5" id="addProductBtn">
          <span class="material-symbols-outlined text-lg">add</span>Add Product
        </button>
      </div>

      <!-- Filters -->
      <div class="admin-card">
        <div class="flex flex-wrap gap-3">
          <input class="form-input flex-1 min-w-[200px]" placeholder="Search products..." id="productSearch">
          <select class="form-input w-auto" id="categoryFilter">
            <option value="">All Categories</option>
            ${D.lifestyleCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            ${D.vehicles.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
            <option value="merchandise">Merchandise</option>
          </select>
        </div>
      </div>

      <!-- Products Table -->
      <div class="admin-card overflow-x-auto">
        <table class="admin-table" id="productsTable">
          <thead>
            <tr><th>Product</th><th>SKU</th><th>Category</th><th>Price</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${allProducts.slice(0, 25).map(p => `
            <tr data-source="${p.source}">
              <td>
                <div class="flex items-center gap-3">
                  <img src="${p.image || 'https://placehold.co/40x40/f5f0ee/5d5e60?text=P'}" class="w-10 h-10 rounded-lg object-cover" alt="">
                  <div>
                    <p class="font-semibold text-sm">${p.name}</p>
                    ${p.badge ? `<span class="text-[10px] font-semibold text-primary">${p.badge}</span>` : ''}
                  </div>
                </div>
              </td>
              <td class="font-mono text-xs text-secondary">${p.sku || '—'}</td>
              <td class="text-sm capitalize">${p.source}</td>
              <td class="font-semibold">${fmt(p.price)}</td>
              <td class="text-sm">${p.rating ? p.rating + ' ★' : '—'}</td>
              <td>
                <div class="flex gap-1">
                  <button class="p-1.5 rounded-lg hover:bg-gray-100 transition" title="Edit"><span class="material-symbols-outlined text-lg">edit</span></button>
                  <button class="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition" title="Delete"><span class="material-symbols-outlined text-lg">delete</span></button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ----- INVENTORY MANAGEMENT ----- */
  function inventoryPage() {
    const inv = D.cmsInventory;
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Inventory Management</h1>
          <p class="text-sm text-secondary mt-1">Monitor stock levels across all warehouses.</p>
        </div>
        <button class="btn-hero text-sm py-2.5 px-5"><span class="material-symbols-outlined text-lg">download</span>Export CSV</button>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="admin-card flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center"><span class="material-symbols-outlined text-green-600 text-2xl">check_circle</span></div>
          <div><p class="admin-metric text-lg text-green-700">${inv.filter(i => i.status === 'In Stock').length}</p><p class="text-xs text-secondary">In Stock</p></div>
        </div>
        <div class="admin-card flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center"><span class="material-symbols-outlined text-amber-600 text-2xl">warning</span></div>
          <div><p class="admin-metric text-lg text-amber-600">${inv.filter(i => i.status === 'Low Stock').length}</p><p class="text-xs text-secondary">Low Stock</p></div>
        </div>
        <div class="admin-card flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center"><span class="material-symbols-outlined text-red-600 text-2xl">error</span></div>
          <div><p class="admin-metric text-lg text-red-600">${inv.filter(i => i.status === 'Out of Stock').length}</p><p class="text-xs text-secondary">Out of Stock</p></div>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="admin-card overflow-x-auto">
        <table class="admin-table">
          <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>Stock</th><th>Reorder Point</th><th>Status</th><th>Location</th></tr></thead>
          <tbody>
            ${inv.map(i => {
              const dotColor = i.status === 'In Stock' ? 'green' : i.status === 'Low Stock' ? 'yellow' : 'red';
              return `
            <tr>
              <td class="font-mono text-xs">${i.sku}</td>
              <td class="font-semibold text-sm">${i.name}</td>
              <td class="text-sm text-secondary">${i.category}</td>
              <td class="font-semibold ${i.stock === 0 ? 'text-red-600' : i.stock <= i.reorderPoint ? 'text-amber-600' : ''}">${i.stock}</td>
              <td class="text-sm text-secondary">${i.reorderPoint}</td>
              <td><span class="status-dot ${dotColor}"></span><span class="text-sm">${i.status}</span></td>
              <td class="text-sm text-secondary">${i.location}</td>
            </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ----- BANNER MANAGEMENT ----- */
  function bannersPage() {
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Banner Management</h1>
          <p class="text-sm text-secondary mt-1">Manage homepage promotional banners.</p>
        </div>
        <button class="btn-hero text-sm py-2.5 px-5" id="addBannerBtn">
          <span class="material-symbols-outlined text-lg">add</span>Add Banner
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${D.banners.map(b => `
        <div class="admin-card flex flex-wrap items-center gap-6">
          <div class="flex items-center gap-3 flex-1 min-w-[200px]">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold">${b.order}</div>
            <div>
              <h3 class="font-semibold">${b.headline}</h3>
              <p class="text-sm text-secondary">${b.subtext}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge ${b.visible ? 'badge-in-stock' : 'badge-new'}">${b.visible ? 'Visible' : 'Hidden'}</span>
          </div>
          <div class="flex gap-1">
            <button class="p-2 rounded-lg hover:bg-gray-100 transition" title="Edit"><span class="material-symbols-outlined">edit</span></button>
            <button class="p-2 rounded-lg hover:bg-gray-100 transition" title="Reorder"><span class="material-symbols-outlined">drag_indicator</span></button>
            <button class="p-2 rounded-lg hover:bg-red-50 text-red-500 transition" title="Delete"><span class="material-symbols-outlined">delete</span></button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  /* ----- INQUIRY MANAGEMENT ----- */
  function inquiriesPage() {
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Inquiry Management</h1>
          <p class="text-sm text-secondary mt-1">${D.cmsInquiries.length} customer inquiries</p>
        </div>
        <div class="flex gap-2">
          <select class="form-input py-2 text-sm w-auto">
            <option>All Status</option><option>New</option><option>Processing</option><option>Responded</option>
          </select>
        </div>
      </div>

      <div class="space-y-4">
        ${D.cmsInquiries.map(inq => {
          const statusColor = inq.status === 'New' ? 'blue' : inq.status === 'Processing' ? 'yellow' : 'green';
          const prioColor = inq.priority === 'High' ? 'text-red-600 bg-red-50' : inq.priority === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-gray-600 bg-gray-100';
          return `
        <div class="admin-card">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex-1 min-w-[200px]">
              <div class="flex items-center gap-3 mb-2">
                <span class="font-mono text-xs text-secondary">${inq.id}</span>
                <span class="status-dot ${statusColor}"></span><span class="text-sm font-semibold">${inq.status}</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${prioColor}">${inq.priority}</span>
              </div>
              <h3 class="font-semibold">${inq.customer}</h3>
              <p class="text-sm text-secondary">${inq.email}</p>
              <p class="text-sm mt-2">${inq.message}</p>
              ${inq.vehicle ? `<p class="text-xs text-secondary mt-1">Vehicle: ${inq.vehicle} ${inq.plate ? '· ' + inq.plate : ''}</p>` : ''}
            </div>
            <div class="text-right">
              <p class="text-xs text-secondary">${inq.date}</p>
              ${inq.item ? `
              <div class="mt-3 p-3 bg-gray-50 rounded-xl text-left">
                <p class="text-xs font-semibold">${inq.item.name}</p>
                <p class="text-[10px] text-secondary">${inq.item.sku}</p>
                <p class="text-sm font-bold text-primary mt-1">${fmt(inq.item.price)}</p>
              </div>` : ''}
            </div>
          </div>
          <div class="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <button class="btn-hero text-xs py-1.5 px-4">Reply</button>
            <button class="btn-secondary text-xs py-1.5 px-4">Mark Resolved</button>
          </div>
        </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  /* ----- OFFERS & CAMPAIGNS ----- */
  function campaignsPage() {
    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Offers & Discounts</h1>
          <p class="text-sm text-secondary mt-1">Manage promotional campaigns and discount codes.</p>
        </div>
        <button class="btn-hero text-sm py-2.5 px-5" id="addCampaignBtn">
          <span class="material-symbols-outlined text-lg">add</span>New Campaign
        </button>
      </div>

      <div class="admin-card overflow-x-auto">
        <table class="admin-table">
          <thead><tr><th>Campaign</th><th>Type</th><th>Value</th><th>Categories</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${D.cmsCampaigns.map(c => `
            <tr>
              <td class="font-semibold">${c.name}</td>
              <td class="text-sm capitalize">${c.type}</td>
              <td class="font-semibold">${c.type === 'percentage' ? c.value + '%' : fmt(c.value)}</td>
              <td class="text-sm text-secondary">${c.categories.join(', ')}</td>
              <td><span class="badge ${c.status === 'Active' ? 'badge-in-stock' : 'badge-new'}">${c.status}</span></td>
              <td>
                <div class="flex gap-1">
                  <button class="p-1.5 rounded-lg hover:bg-gray-100 transition"><span class="material-symbols-outlined text-lg">edit</span></button>
                  <button class="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><span class="material-symbols-outlined text-lg">delete</span></button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ----- TRANSLATIONS MANAGEMENT ----- */
  function translationsPage() {
    const base = D.translations || { en: {}, ar: {} };
    const overrides = JSON.parse(localStorage.getItem('sayarti_translations') || '{}');
    const merged = {
      en: Object.assign({}, base.en, overrides.en || {}),
      ar: Object.assign({}, base.ar, overrides.ar || {})
    };
    const keys = [...new Set([...Object.keys(merged.en), ...Object.keys(merged.ar)])].sort();
    const totalKeys = keys.length;
    const overrideCount = Object.keys(overrides.en || {}).length + Object.keys(overrides.ar || {}).length;

    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Translations Management</h1>
          <p class="text-sm text-secondary mt-1">${totalKeys} translation keys · ${overrideCount} custom overrides</p>
        </div>
        <div class="flex gap-2">
          <button class="btn-secondary text-sm py-2 px-4" id="resetTranslationsBtn">
            <span class="material-symbols-outlined text-sm">restart_alt</span>Reset All
          </button>
          <button class="btn-hero text-sm py-2 px-4" id="addTranslationBtn">
            <span class="material-symbols-outlined text-sm">add</span>Add Key
          </button>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="admin-card">
        <div class="flex flex-wrap gap-3">
          <input class="form-input flex-1 min-w-[200px]" placeholder="Search translation keys or values..." id="translationSearch">
          <select class="form-input w-auto" id="translationFilter">
            <option value="">All Keys</option>
            <option value="modified">Modified Only</option>
            <option value="missing">Missing Arabic</option>
          </select>
        </div>
      </div>

      <!-- Add Key Form (hidden by default) -->
      <div class="admin-card hidden" id="addKeyForm">
        <h3 class="font-heading font-bold mb-4">Add New Translation Key</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label class="form-label">Key (camelCase)</label><input class="form-input" id="newKeyName" placeholder="e.g. welcomeMessage"></div>
          <div><label class="form-label">English Value</label><input class="form-input" id="newKeyEn" placeholder="English text"></div>
          <div><label class="form-label">Arabic Value</label><input class="form-input" id="newKeyAr" placeholder="النص العربي" dir="rtl"></div>
        </div>
        <div class="flex gap-2 mt-4">
          <button class="btn-hero text-sm py-2 px-5" id="saveNewKeyBtn">Save Key</button>
          <button class="btn-secondary text-sm py-2 px-5" id="cancelNewKeyBtn">Cancel</button>
        </div>
      </div>

      <!-- Translations Table -->
      <div class="admin-card overflow-x-auto">
        <table class="admin-table" id="translationsTable">
          <thead>
            <tr>
              <th class="w-[200px]">Key</th>
              <th>English</th>
              <th>Arabic (العربية)</th>
              <th class="w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${keys.map(key => {
              const enVal = merged.en[key] || '';
              const arVal = merged.ar[key] || '';
              const isOverridden = (overrides.en && overrides.en[key] !== undefined) || (overrides.ar && overrides.ar[key] !== undefined);
              return `
            <tr data-key="${key}" class="${isOverridden ? 'bg-amber-50/50' : ''}">
              <td>
                <code class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">${key}</code>
                ${isOverridden ? '<span class="ml-1 text-[10px] text-amber-600 font-bold">MODIFIED</span>' : ''}
              </td>
              <td>
                <input class="form-input text-sm py-1.5 translation-input" data-key="${key}" data-lang="en" value="${enVal.replace(/"/g, '&quot;')}">
              </td>
              <td>
                <input class="form-input text-sm py-1.5 translation-input" data-key="${key}" data-lang="ar" value="${arVal.replace(/"/g, '&quot;')}" dir="rtl" style="font-family:'Almarai',sans-serif;">
              </td>
              <td>
                <div class="flex gap-1">
                  <button class="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition save-translation-btn" data-key="${key}" title="Save">
                    <span class="material-symbols-outlined text-lg">save</span>
                  </button>
                  ${isOverridden ? `<button class="p-1.5 rounded-lg hover:bg-gray-100 transition revert-translation-btn" data-key="${key}" title="Revert to default">
                    <span class="material-symbols-outlined text-lg">undo</span>
                  </button>` : ''}
                  <button class="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition delete-translation-btn" data-key="${key}" title="Delete">
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ----- CMS LOGIN ----- */
  function loginPage() {
    return `
    <div class="min-h-screen flex items-center justify-center bg-white" style="margin-left:-260px;">
      <div class="w-full max-w-[420px] px-6">

        <!-- Logo & Branding -->
        <div class="text-center mb-10">
          <a href="index.html"><img src="assets/sayarti.png" alt="Sayarti" class="h-16 w-auto object-contain mx-auto mb-5"></a>
          <h1 class="font-heading text-[26px] font-extrabold text-on-surface tracking-tight">Team Login</h1>
          <p class="text-sm text-secondary mt-2">Sign in to access the Content Management System</p>
        </div>

        <!-- Login Card -->
        <div class="space-y-5">
          <div id="loginError" class="hidden bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3.5 flex items-center gap-2.5">
            <span class="material-symbols-outlined text-lg flex-shrink-0">error</span>
            <span id="loginErrorMsg">Invalid email or password.</span>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-on-surface mb-1.5">Email Address</label>
            <div class="relative group">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px] group-focus-within:text-primary transition">mail</span>
              <input class="w-full rounded-xl border border-gray-300 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-on-surface placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 focus:bg-white transition" type="email" placeholder="you@sayarti.kw" id="loginEmail" autocomplete="email">
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-on-surface mb-1.5">Password</label>
            <div class="relative group">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px] group-focus-within:text-primary transition">lock</span>
              <input class="w-full rounded-xl border border-gray-300 bg-gray-50/60 py-3 pl-11 pr-11 text-sm text-on-surface placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 focus:bg-white transition" type="password" placeholder="Enter your password" id="loginPassword" autocomplete="current-password">
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-on-surface transition" id="togglePasswordBtn">
                <span class="material-symbols-outlined text-[20px]" id="togglePasswordIcon">visibility</span>
              </button>
            </div>
          </div>

          <!-- Sign In Button -->
          <button class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-ctr text-white font-semibold py-3.5 rounded-xl text-[15px] transition shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]" id="loginBtn">
            <span id="loginBtnText">Sign In</span>
            <span id="loginSpinner" class="hidden material-symbols-outlined text-lg animate-spin">progress_activity</span>
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 pt-1">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="text-[11px] text-gray-400 uppercase font-semibold tracking-wider">Authorized Access</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <p class="text-center text-xs text-secondary leading-relaxed">For Sayarti staff only. Contact your administrator<br>if you need an account or have forgotten your password.</p>
        </div>

        <!-- Footer -->
        <p class="text-center text-[11px] text-gray-400 mt-10">&copy; 2026 Sayarti by Al Sayer Group. All rights reserved.</p>
      </div>
    </div>`;
  }

  /* ----- USER MANAGEMENT ----- */
  function getStoredUsers() {
    const custom = JSON.parse(localStorage.getItem('sayarti_admin_users') || '[]');
    const base = (D.adminUsers || []).map(u => Object.assign({}, u));
    // Merge: custom users override base users by email
    const merged = [...base];
    custom.forEach(cu => {
      const idx = merged.findIndex(m => m.email === cu.email);
      if (idx >= 0) merged[idx] = cu;
      else merged.push(cu);
    });
    return merged.filter(u => !u._deleted);
  }
  function saveStoredUsers(users) {
    localStorage.setItem('sayarti_admin_users', JSON.stringify(users));
  }

  const PERMISSION_DEFS = [
    { key: 'analytics', label: 'Analytics Dashboard', icon: 'analytics', desc: 'View sales, inquiries, and performance data' },
    { key: 'products', label: 'Products', icon: 'inventory_2', desc: 'Manage product catalog and details' },
    { key: 'inventory', label: 'Inventory', icon: 'warehouse', desc: 'View and manage stock levels' },
    { key: 'banners', label: 'Banners & Content', icon: 'ad_units', desc: 'Post and manage homepage banners' },
    { key: 'inquiries', label: 'Inquiries', icon: 'support_agent', desc: 'View and respond to customer inquiries' },
    { key: 'campaigns', label: 'Offers & Pricing', icon: 'local_offer', desc: 'Manage pricing, offers, and discounts' },
    { key: 'translations', label: 'Arabic Translations', icon: 'translate', desc: 'Manage English/Arabic website text' },
    { key: 'customers', label: 'Customer Management', icon: 'people', desc: 'View customer profiles, orders, and interactions' },
    { key: 'users', label: 'User Management', icon: 'group', desc: 'Create users and assign permissions' }
  ];

  /* ===== Customer Management Page ===== */
  function getCustomers() {
    const stored = localStorage.getItem('sayarti_cms_customers');
    const seed = (window.SayartiData && SayartiData.cmsCustomers) || [];
    if (stored) {
      const list = JSON.parse(stored);
      // Merge any new seed customers not yet in stored data
      let updated = false;
      seed.forEach(s => {
        if (!list.find(c => c.id === s.id)) { list.push(s); updated = true; }
      });
      if (updated) localStorage.setItem('sayarti_cms_customers', JSON.stringify(list));
      return list;
    }
    localStorage.setItem('sayarti_cms_customers', JSON.stringify(seed));
    return seed;
  }

  function customersPage() {
    const customers = getCustomers();
    const registered = (JSON.parse(localStorage.getItem('sayarti_users') || '[]'));
    // Merge portal-registered users that aren't in CMS customers yet
    const allCustomers = [...customers];
    registered.forEach(u => {
      if (!allCustomers.find(c => c.civilId === u.civilId)) {
        allCustomers.push({
          id: 'CUS-REG-' + u.civilId,
          civilId: u.civilId || '',
          firstName: u.firstName || u.name || '',
          lastName: u.lastName || '',
          salutation: '',
          email: u.email || '',
          phone: u.phone || '',
          status: u.status || 'Active',
          registeredDate: u.createdAt ? u.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
          lastLogin: '',
          vehicle: u.vehicle ? { model: u.vehicle.model || '', year: u.vehicle.year || '', plateNumber: u.vehicle.plateNumber || '' } : null,
          address: u.address || {},
          commPrefs: u.commPrefs || {},
          orders: [],
          inquiries: [],
          totalSpent: 0,
          lifetimeOrders: 0,
          avgOrderValue: 0
        });
      }
    });

    const total = allCustomers.length;
    const active = allCustomers.filter(c => c.status === 'Active').length;
    const totalRevenue = allCustomers.reduce((s, c) => s + (c.totalSpent || 0), 0);
    const avgOrder = total > 0 ? (totalRevenue / Math.max(allCustomers.reduce((s, c) => s + (c.lifetimeOrders || 0), 0), 1)) : 0;
    const newThisMonth = allCustomers.filter(c => {
      const d = new Date(c.registeredDate);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">Customer Management</h1>
          <p class="text-sm text-secondary mt-1">${total} customers · 360° view of customer interactions</p>
        </div>
        <button class="btn-hero text-sm py-2 px-5" id="exportCustomersBtn">
          <span class="material-symbols-outlined text-sm">download</span>Export CSV
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="cms-stat-card">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-blue-500">group</span>
            </div>
            <div>
              <p class="text-xs text-secondary">Total Customers</p>
              <p class="text-xl font-bold">${total}</p>
            </div>
          </div>
        </div>
        <div class="cms-stat-card">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500">verified</span>
            </div>
            <div>
              <p class="text-xs text-secondary">Active Customers</p>
              <p class="text-xl font-bold">${active}</p>
            </div>
          </div>
        </div>
        <div class="cms-stat-card">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-amber-500">payments</span>
            </div>
            <div>
              <p class="text-xs text-secondary">Total Revenue</p>
              <p class="text-xl font-bold">${totalRevenue.toFixed(3)} <span class="text-xs font-normal">KD</span></p>
            </div>
          </div>
        </div>
        <div class="cms-stat-card">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-500">person_add</span>
            </div>
            <div>
              <p class="text-xs text-secondary">New This Month</p>
              <p class="text-xl font-bold">${newThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div class="flex flex-wrap gap-3 items-center">
          <div class="relative flex-1 min-w-[200px]">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">search</span>
            <input type="text" id="customerSearch" placeholder="Search by name, civil ID, email, phone..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
          </div>
          <select id="customerStatusFilter" class="py-2.5 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select id="customerVehicleFilter" class="py-2.5 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary">
            <option value="">All Vehicles</option>
            <option value="Land Cruiser">Land Cruiser</option>
            <option value="GR Supra">GR Supra</option>
            <option value="Hilux">Hilux</option>
            <option value="Camry">Camry</option>
            <option value="Corolla">Corolla</option>
            <option value="RAV4">RAV4</option>
          </select>
        </div>
      </div>

      <!-- Customers Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm" id="customersTable">
            <thead class="bg-gray-50 text-xs text-secondary uppercase tracking-wider">
              <tr>
                <th class="text-left p-4">Customer</th>
                <th class="text-left p-4">Civil ID</th>
                <th class="text-left p-4">Vehicle</th>
                <th class="text-center p-4">Orders</th>
                <th class="text-right p-4">Total Spent</th>
                <th class="text-center p-4">Status</th>
                <th class="text-left p-4">Last Active</th>
                <th class="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${allCustomers.map(c => {
                const initials = (c.firstName?.[0] || '') + (c.lastName?.[0] || '');
                const statusClass = c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500';
                const vehicleName = c.vehicle ? c.vehicle.model + ' ' + (c.vehicle.year || '') : '—';
                const lastActive = c.lastLogin ? c.lastLogin.split(' ')[0] : (c.registeredDate || '—');
                return `<tr class="hover:bg-gray-50/50 transition-colors cursor-pointer customer-row" data-id="${c.id}" data-status="${c.status}" data-vehicle="${c.vehicle ? c.vehicle.model : ''}">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">${initials}</div>
                      <div>
                        <p class="font-medium">${c.salutation || ''} ${c.firstName} ${c.lastName}</p>
                        <p class="text-xs text-secondary">${c.email || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4 font-mono text-xs">${c.civilId || '—'}</td>
                  <td class="p-4">${vehicleName}</td>
                  <td class="p-4 text-center font-medium">${c.lifetimeOrders || 0}</td>
                  <td class="p-4 text-right font-medium">${(c.totalSpent || 0).toFixed(3)} KD</td>
                  <td class="p-4 text-center"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${statusClass}">${c.status}</span></td>
                  <td class="p-4 text-xs text-secondary">${lastActive}</td>
                  <td class="p-4 text-center">
                    <button class="view-customer-btn p-1.5 rounded-lg hover:bg-gray-100 transition-colors" data-id="${c.id}" title="View Details">
                      <span class="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  }

  function bindCustomerEvents() {
    const search = $('#customerSearch');
    const statusFilter = $('#customerStatusFilter');
    const vehicleFilter = $('#customerVehicleFilter');

    function filterRows() {
      const q = (search ? search.value : '').toLowerCase();
      const status = statusFilter ? statusFilter.value : '';
      const vehicle = vehicleFilter ? vehicleFilter.value : '';
      $$('#customersTable tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowStatus = row.dataset.status;
        const rowVehicle = row.dataset.vehicle || '';
        const matchText = !q || text.includes(q);
        const matchStatus = !status || rowStatus === status;
        const matchVehicle = !vehicle || rowVehicle.includes(vehicle);
        row.style.display = (matchText && matchStatus && matchVehicle) ? '' : 'none';
      });
    }

    if (search) search.addEventListener('input', filterRows);
    if (statusFilter) statusFilter.addEventListener('change', filterRows);
    if (vehicleFilter) vehicleFilter.addEventListener('change', filterRows);

    // View customer detail
    $$('.view-customer-btn, .customer-row').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.dataset.id || el.closest('tr')?.dataset.id;
        if (id) {
          sessionStorage.setItem('sayarti_view_customer', id);
          location.hash = '#/customer-detail?id=' + encodeURIComponent(id);
        }
      });
    });

    // Export CSV
    const exportBtn = $('#exportCustomersBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const customers = getCustomers();
        const headers = ['Name', 'Civil ID', 'Email', 'Phone', 'Vehicle', 'Orders', 'Total Spent', 'Status'];
        const rows = customers.map(c => [
          `${c.firstName} ${c.lastName}`, c.civilId, c.email, c.phone,
          c.vehicle ? c.vehicle.model : '', c.lifetimeOrders, c.totalSpent, c.status
        ]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'sayarti_customers.csv'; a.click();
        URL.revokeObjectURL(url);
        toast('Customer data exported successfully', 'success');
      });
    }
  }

  /* ===== Customer 360° Detail Page ===== */
  function customerDetailPage(urlId) {
    const id = urlId || sessionStorage.getItem('sayarti_view_customer');
    if (!id) { location.hash = '#/customers'; return ''; }
    const customers = getCustomers();
    // Also check portal-registered users
    const registered = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
    let c = customers.find(x => x.id === id);
    if (!c) {
      const regUser = registered.find(u => ('CUS-REG-' + u.civilId) === id);
      if (regUser) {
        c = {
          id: id, civilId: regUser.civilId || '', firstName: regUser.firstName || regUser.name || '', lastName: regUser.lastName || '',
          email: regUser.email || '', phone: regUser.phone || '', status: regUser.status || 'Active',
          registeredDate: regUser.createdAt ? regUser.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10), lastLogin: '',
          vehicle: regUser.vehicle ? { model: regUser.vehicle.model || '', year: regUser.vehicle.year || '', plateNumber: regUser.vehicle.plateNumber || '' } : null,
          address: regUser.address || {}, commPrefs: regUser.commPrefs || {},
          orders: [], inquiries: [], totalSpent: 0, lifetimeOrders: 0, avgOrderValue: 0
        };
      }
    }
    if (!c) {
      return `<div class="flex flex-col items-center justify-center h-64 text-center">
        <span class="material-symbols-outlined text-5xl text-secondary mb-4">person_off</span>
        <h2 class="text-xl font-bold">Customer Not Found</h2>
        <p class="text-secondary mt-2">The customer record could not be located.</p>
        <a href="#/customers" class="mt-4 text-primary hover:underline text-sm">← Back to Customer List</a>
      </div>`;
    }

    const initials = (c.firstName?.[0] || '') + (c.lastName?.[0] || '');
    const statusClass = c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500';
    const orders = c.orders || [];
    const inquiries = c.inquiries || [];
    const vehicle = c.vehicle;
    const address = c.address || {};
    const prefs = c.commPrefs || {};

    return `
    <div class="space-y-6">
      <!-- Breadcrumb / Back -->
      <div class="flex items-center gap-2 text-sm text-secondary">
        <a href="#/customers" class="hover:text-primary transition-colors flex items-center gap-1">
          <span class="material-symbols-outlined text-base">arrow_back</span>All Customers
        </a>
        <span>/</span>
        <span class="text-gray-800 font-medium">${c.firstName} ${c.lastName}</span>
      </div>

      <!-- Customer Header Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex flex-col md:flex-row md:items-center gap-6">
          <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">${initials}</div>
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl font-bold font-heading">${c.salutation || ''} ${c.firstName} ${c.lastName}</h1>
              <span class="px-3 py-1 rounded-full text-xs font-medium ${statusClass}">${c.status}</span>
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-secondary">
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">badge</span>${c.civilId}</span>
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">mail</span>${c.email}</span>
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">phone</span>${c.phone}</span>
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">calendar_today</span>Joined ${c.registeredDate}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors" id="resetPasswordBtn" data-civilid="${c.civilId}" data-email="${c.email}" data-name="${c.firstName} ${c.lastName}">
              <span class="material-symbols-outlined text-base align-middle mr-1">lock_reset</span>Reset Password
            </button>
            <button class="px-4 py-2 rounded-xl border text-sm transition-colors ${c.status === 'Active' ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}" id="toggleStatusBtn" data-id="${c.id}" data-civilid="${c.civilId}" data-status="${c.status}">
              <span class="material-symbols-outlined text-base align-middle mr-1">${c.status === 'Active' ? 'block' : 'check_circle'}</span>${c.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </div>

      <!-- KPI Summary -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p class="text-2xl font-bold text-primary">${c.lifetimeOrders || 0}</p>
          <p class="text-xs text-secondary mt-1">Total Orders</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p class="text-2xl font-bold text-green-600">${(c.totalSpent || 0).toFixed(3)} <span class="text-xs">KD</span></p>
          <p class="text-xs text-secondary mt-1">Total Spent</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p class="text-2xl font-bold text-blue-600">${(c.avgOrderValue || 0).toFixed(3)} <span class="text-xs">KD</span></p>
          <p class="text-xs text-secondary mt-1">Avg Order Value</p>
        </div>
        <div class="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p class="text-2xl font-bold text-purple-600">${inquiries.length}</p>
          <p class="text-xs text-secondary mt-1">Inquiries</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="border-b border-gray-100">
          <nav class="flex gap-0 overflow-x-auto" id="customerTabs">
            <button class="customer-tab active px-6 py-3.5 text-sm font-medium transition-colors relative" data-tab="orders">
              <span class="material-symbols-outlined text-base align-middle mr-1">shopping_bag</span>Orders (${orders.length})
            </button>
            <button class="customer-tab px-6 py-3.5 text-sm font-medium transition-colors relative" data-tab="inquiries">
              <span class="material-symbols-outlined text-base align-middle mr-1">support_agent</span>Inquiries (${inquiries.length})
            </button>
            <button class="customer-tab px-6 py-3.5 text-sm font-medium transition-colors relative" data-tab="vehicle">
              <span class="material-symbols-outlined text-base align-middle mr-1">directions_car</span>Vehicle
            </button>
            <button class="customer-tab px-6 py-3.5 text-sm font-medium transition-colors relative" data-tab="profile">
              <span class="material-symbols-outlined text-base align-middle mr-1">person</span>Profile & Address
            </button>
          </nav>
        </div>

        <!-- Tab: Orders -->
        <div class="customer-tab-panel p-6" id="tab-orders">
          ${orders.length === 0 ? `<div class="text-center py-12 text-secondary">
            <span class="material-symbols-outlined text-4xl mb-3">shopping_cart</span>
            <p>No orders yet</p>
          </div>` : `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-xs text-secondary uppercase tracking-wider">
                <tr>
                  <th class="text-left p-3">Order ID</th>
                  <th class="text-left p-3">Items</th>
                  <th class="text-left p-3">Date</th>
                  <th class="text-right p-3">Total</th>
                  <th class="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${orders.map(o => {
                  const oStatus = o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    o.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                    o.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600';
                  const hasDetail = o.items.length > 0 && typeof o.items[0] === 'object';
                  const itemsHtml = hasDetail
                    ? o.items.map(it => `<div class="flex items-center gap-3 py-1.5">
                        <img src="${it.image}" alt="${it.name}" class="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0">
                        <div class="min-w-0">
                          <p class="font-medium text-sm truncate">${it.name}</p>
                          <p class="text-xs text-secondary">${it.price.toFixed(3)} KD × ${it.qty}</p>
                        </div>
                      </div>`).join('')
                    : `<p class="py-1">${(o.items || []).join(', ')}</p>`;
                  return `<tr class="hover:bg-gray-50/50 align-top">
                    <td class="p-3 font-mono text-xs font-medium">${o.id}</td>
                    <td class="p-3">${itemsHtml}</td>
                    <td class="p-3 text-secondary">${o.date}</td>
                    <td class="p-3 text-right font-medium">${o.total.toFixed(3)} KD</td>
                    <td class="p-3 text-center"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${oStatus}">${o.status}</span></td>
                  </tr>`;
                }).join('')}
                }).join('')}
              </tbody>
            </table>
          </div>`}
        </div>

        <!-- Tab: Inquiries -->
        <div class="customer-tab-panel p-6 hidden" id="tab-inquiries">
          ${inquiries.length === 0 ? `<div class="text-center py-12 text-secondary">
            <span class="material-symbols-outlined text-4xl mb-3">inbox</span>
            <p>No inquiries</p>
          </div>` : `
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-xs text-secondary uppercase tracking-wider">
                <tr>
                  <th class="text-left p-3">Inquiry ID</th>
                  <th class="text-left p-3">Subject</th>
                  <th class="text-left p-3">Date</th>
                  <th class="text-center p-3">Priority</th>
                  <th class="text-center p-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${inquiries.map(inq => {
                  const iStatus = inq.status === 'Responded' ? 'bg-green-100 text-green-700' :
                    inq.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                    inq.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600';
                  const iPriority = inq.priority === 'High' ? 'bg-red-100 text-red-700' :
                    inq.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600';
                  return `<tr class="hover:bg-gray-50/50">
                    <td class="p-3 font-mono text-xs font-medium">${inq.id}</td>
                    <td class="p-3">${inq.subject}</td>
                    <td class="p-3 text-secondary">${inq.date}</td>
                    <td class="p-3 text-center"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${iPriority}">${inq.priority || '—'}</span></td>
                    <td class="p-3 text-center"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${iStatus}">${inq.status}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>`}
        </div>

        <!-- Tab: Vehicle -->
        <div class="customer-tab-panel p-6 hidden" id="tab-vehicle">
          ${!vehicle ? `<div class="text-center py-12 text-secondary">
            <span class="material-symbols-outlined text-4xl mb-3">no_crash</span>
            <p>No vehicle registered</p>
          </div>` : `
          <div class="max-w-md">
            <div class="bg-gray-50 rounded-xl p-5 space-y-4">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary text-xl">directions_car</span>
                </div>
                <div>
                  <p class="font-bold text-lg">${vehicle.model}</p>
                  <p class="text-sm text-secondary">${vehicle.year}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div><p class="text-secondary text-xs uppercase tracking-wider mb-1">Model</p><p class="font-medium">${vehicle.model}</p></div>
                <div><p class="text-secondary text-xs uppercase tracking-wider mb-1">Year</p><p class="font-medium">${vehicle.year}</p></div>
                <div><p class="text-secondary text-xs uppercase tracking-wider mb-1">Plate Number</p><p class="font-medium">${vehicle.plateNumber || '—'}</p></div>
              </div>
            </div>
          </div>`}
        </div>

        <!-- Tab: Profile & Address -->
        <div class="customer-tab-panel p-6 hidden" id="tab-profile">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Address -->
            <div class="bg-gray-50 rounded-xl p-5">
              <h3 class="font-bold text-sm uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-base">location_on</span>Address
              </h3>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div><p class="text-secondary text-xs mb-0.5">Governorate</p><p class="font-medium">${address.governorate || '—'}</p></div>
                <div><p class="text-secondary text-xs mb-0.5">Area</p><p class="font-medium">${address.area || '—'}</p></div>
                <div><p class="text-secondary text-xs mb-0.5">Block</p><p class="font-medium">${address.block || '—'}</p></div>
                <div><p class="text-secondary text-xs mb-0.5">Street</p><p class="font-medium">${address.street || '—'}</p></div>
                <div><p class="text-secondary text-xs mb-0.5">Building</p><p class="font-medium">${address.building || '—'}</p></div>
                <div><p class="text-secondary text-xs mb-0.5">Floor / Flat</p><p class="font-medium">${address.floor || '—'} / ${address.flat || '—'}</p></div>
              </div>
            </div>
            <!-- Communication Preferences -->
            <div class="bg-gray-50 rounded-xl p-5">
              <h3 class="font-bold text-sm uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-base">notifications</span>Communication Preferences
              </h3>
              <div class="space-y-3">
                ${[['sms', 'SMS', 'sms'], ['whatsapp', 'WhatsApp', 'chat'], ['email', 'Email', 'email'], ['call', 'Phone Call', 'call']].map(([key, label, icon]) =>
                  `<div class="flex items-center justify-between">
                    <span class="flex items-center gap-2 text-sm"><span class="material-symbols-outlined text-base text-secondary">${icon}</span>${label}</span>
                    <span class="w-5 h-5 rounded-full flex items-center justify-center ${prefs[key] ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}">
                      <span class="material-symbols-outlined text-sm">${prefs[key] ? 'check' : 'close'}</span>
                    </span>
                  </div>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function bindCustomerDetailEvents() {
    // Tab switching
    $$('.customer-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.customer-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        $$('.customer-tab-panel').forEach(p => p.classList.add('hidden'));
        const panel = $('#tab-' + tab.dataset.tab);
        if (panel) panel.classList.remove('hidden');
      });
    });

    // Toggle status (Deactivate / Activate)
    const toggleBtn = $('#toggleStatusBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const id = toggleBtn.dataset.id;
        const civilId = toggleBtn.dataset.civilid;
        const current = toggleBtn.dataset.status;
        const newStatus = current === 'Active' ? 'Inactive' : 'Active';
        const action = current === 'Active' ? 'deactivate' : 'activate';

        if (!confirm(`Are you sure you want to ${action} this customer? ${current === 'Active' ? 'They will not be able to log in.' : 'They will regain access to their account.'}`)) return;

        // Update in CMS customers
        const customers = getCustomers();
        const idx = customers.findIndex(c => c.id === id);
        if (idx >= 0) {
          customers[idx].status = newStatus;
          localStorage.setItem('sayarti_cms_customers', JSON.stringify(customers));
        }

        // Also sync status to sayarti_users (portal-registered users)
        if (civilId) {
          const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
          const uIdx = users.findIndex(u => u.civilId === civilId);
          if (uIdx >= 0) {
            users[uIdx].status = newStatus;
            localStorage.setItem('sayarti_users', JSON.stringify(users));
          }
        }

        toast(`Customer ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`, 'success');
        route();
      });
    }

    // Reset Password
    const resetBtn = $('#resetPasswordBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const civilId = resetBtn.dataset.civilid;
        const email = resetBtn.dataset.email;
        const name = resetBtn.dataset.name;

        if (!confirm(`Reset password for ${name}? A temporary password will be set.`)) return;

        const tempPassword = 'Sayarti@Reset2026';
        const users = JSON.parse(localStorage.getItem('sayarti_users') || '[]');
        const uIdx = users.findIndex(u => u.civilId === civilId || u.email === email);
        if (uIdx >= 0) {
          users[uIdx].password = tempPassword;
          localStorage.setItem('sayarti_users', JSON.stringify(users));
          toast(`Password reset successfully. Temporary password: ${tempPassword}`, 'success');
        } else {
          toast('No portal account found for this customer. They may need to register first.', 'warning');
        }
      });
    }
  }

  function usersPage() {
    const users = getStoredUsers();
    const session = getSession();
    const isSuperAdmin = session && (session.permissions || []).includes('users');

    return `
    <div class="space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="font-heading text-2xl font-bold">User Management</h1>
          <p class="text-sm text-secondary mt-1">${users.length} team members · Manage access and permissions</p>
        </div>
        ${isSuperAdmin ? `<button class="btn-hero text-sm py-2 px-5" id="addUserBtn">
          <span class="material-symbols-outlined text-sm">person_add</span>Add Team Member
        </button>` : ''}
      </div>

      <!-- Add/Edit User Form (hidden by default) -->
      <div class="admin-card hidden" id="userForm">
        <h3 class="font-heading font-bold mb-4" id="userFormTitle">Add New Team Member</h3>
        <input type="hidden" id="editUserEmail">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Full Name</label>
            <input class="form-input" id="userFormName" placeholder="e.g. Ahmad Al-Sayer">
          </div>
          <div>
            <label class="form-label">Email (Username)</label>
            <input class="form-input" type="email" id="userFormEmail" placeholder="name@sayarti.kw">
          </div>
          <div>
            <label class="form-label">Password</label>
            <input class="form-input" type="password" id="userFormPassword" placeholder="Min 6 characters">
          </div>
          <div>
            <label class="form-label">Role / Title</label>
            <input class="form-input" id="userFormRole" placeholder="e.g. Content Manager">
          </div>
        </div>

        <div class="mt-5">
          <label class="form-label mb-3">Section Permissions</label>
          <p class="text-xs text-secondary mb-3">Choose which sections this user can access and manage.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" id="permCheckboxes">
            ${PERMISSION_DEFS.map(p => `
            <label class="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition perm-label" data-perm="${p.key}">
              <input type="checkbox" class="accent-primary mt-1 perm-check" value="${p.key}">
              <div>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-secondary">${p.icon}</span>
                  <span class="text-sm font-semibold">${p.label}</span>
                </div>
                <p class="text-[11px] text-secondary mt-0.5 leading-tight">${p.desc}</p>
              </div>
            </label>`).join('')}
          </div>
        </div>

        <div class="flex gap-2 mt-5">
          <button class="btn-hero text-sm py-2 px-6" id="saveUserBtn">Save User</button>
          <button class="btn-secondary text-sm py-2 px-6" id="cancelUserBtn">Cancel</button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="admin-card overflow-x-auto">
        <table class="admin-table" id="usersTable">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Last Login</th>
              ${isSuperAdmin ? '<th class="w-[100px]">Actions</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${users.map(u => {
              const perms = u.permissions || [];
              const isCurrentUser = session && session.email === u.email;
              return `
            <tr data-email="${u.email}">
              <td>
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">${u.avatar || u.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</div>
                  <div>
                    <p class="font-semibold text-sm">${u.name}${isCurrentUser ? ' <span class="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-1">You</span>' : ''}</p>
                    <p class="text-xs text-secondary">${u.email}</p>
                  </div>
                </div>
              </td>
              <td><span class="text-sm">${u.role}</span></td>
              <td>
                <div class="flex flex-wrap gap-1">
                  ${perms.map(p => {
                    const def = PERMISSION_DEFS.find(d => d.key === p);
                    return `<span class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-secondary"><span class="material-symbols-outlined text-[12px]">${def ? def.icon : 'check'}</span>${def ? def.label : p}</span>`;
                  }).join('')}
                </div>
              </td>
              <td>
                <span class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${u.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-secondary'}">
                  <span class="w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}"></span>
                  ${u.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td><span class="text-xs text-secondary">${u.lastLogin || '—'}</span></td>
              ${isSuperAdmin ? `<td>
                <div class="flex gap-1">
                  <button class="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition edit-user-btn" data-email="${u.email}" title="Edit">
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                  ${!isCurrentUser ? `<button class="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition delete-user-btn" data-email="${u.email}" title="Delete">
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>` : ''}
                </div>
              </td>` : ''}
            </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  function updateSidebarAuth() {
    const sidebar = $('#adminSidebar');
    const session = getSession();
    if (sidebar) {
      sidebar.style.display = session ? '' : 'none';
    }
    // Update user info in sidebar
    const nameEl = $('#adminUserName');
    const emailEl = $('#adminUserEmail');
    if (session && nameEl) nameEl.textContent = session.name;
    if (session && emailEl) emailEl.textContent = session.email;

    // Permission-based sidebar visibility
    if (session) {
      const perms = session.permissions || [];
      const hasAll = perms.includes('users'); // Super admins see everything
      $$('.admin-sidebar-link[data-page]').forEach(link => {
        const page = link.dataset.page;
        const allowed = hasAll || perms.includes(page);
        link.style.display = allowed ? '' : 'none';
      });
      // Show/hide Administration section heading
      $$('.admin-perm-users').forEach(el => {
        el.style.display = perms.includes('users') ? '' : 'none';
      });
    }
  }

  function hasPermission(page) {
    const session = getSession();
    if (!session) return false;
    const perms = session.permissions || [];
    return perms.includes('users') || perms.includes(page);
  }

  function route() {
    const hash = location.hash || '#/analytics';
    const [rawPage, qs] = hash.replace('#/', '').split('?');
    const page = rawPage || 'analytics';
    const hashParams = new URLSearchParams(qs || '');
    const app = $('#adminApp');

    // Auth guard: allow login page always, protect everything else
    if (page !== 'login' && !isAuthenticated()) {
      location.hash = '#/login';
      return;
    }

    // Permission guard: check if user has access to this page
    const permPage = page === 'customer-detail' ? 'customers' : page;
    if (page !== 'login' && isAuthenticated() && !hasPermission(permPage)) {
      const session = getSession();
      const perms = session ? (session.permissions || []) : [];
      const firstAllowed = perms[0] || 'analytics';
      toast('You do not have access to this section.', 'error');
      location.hash = '#/' + firstAllowed;
      return;
    }

    updateSidebarAuth();

    // Update sidebar active state
    const activePage = page === 'customer-detail' ? 'customers' : page;
    $$('.admin-sidebar-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === activePage);
    });

    switch (page) {
      case 'analytics': app.innerHTML = analyticsPage(); break;
      case 'products': app.innerHTML = productsPage(); bindProductEvents(); break;
      case 'inventory': app.innerHTML = inventoryPage(); break;
      case 'banners': app.innerHTML = bannersPage(); break;
      case 'inquiries': app.innerHTML = inquiriesPage(); break;
      case 'campaigns': app.innerHTML = campaignsPage(); break;
      case 'translations': app.innerHTML = translationsPage(); bindTranslationEvents(); break;
      case 'customers': app.innerHTML = customersPage(); bindCustomerEvents(); break;
      case 'customer-detail': app.innerHTML = customerDetailPage(hashParams.get('id')); bindCustomerDetailEvents(); break;
      case 'users': app.innerHTML = usersPage(); bindUserEvents(); break;
      case 'login': updateSidebarAuth(); app.innerHTML = loginPage(); bindLoginEvents(); break;
      default: app.innerHTML = analyticsPage();
    }
    window.scrollTo({ top: 0 });
  }

  /* ===== Page Events ===== */
  function bindProductEvents() {
    const search = $('#productSearch');
    const filter = $('#categoryFilter');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        const cat = filter ? filter.value : '';
        $$('#productsTable tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          const source = row.dataset.source;
          const matchText = !q || text.includes(q);
          const matchCat = !cat || source === cat;
          row.style.display = matchText && matchCat ? '' : 'none';
        });
      });
    }
    if (filter) {
      filter.addEventListener('change', () => { if (search) search.dispatchEvent(new Event('input')); });
    }
  }

  function bindLoginEvents() {
    const emailInput = $('#loginEmail');
    const passwordInput = $('#loginPassword');
    const btn = $('#loginBtn');
    const toggleBtn = $('#togglePasswordBtn');
    const toggleIcon = $('#togglePasswordIcon');

    // Toggle password visibility
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggleIcon.textContent = isHidden ? 'visibility_off' : 'visibility';
      });
    }

    function attemptLogin() {
      const email = (emailInput ? emailInput.value : '').trim().toLowerCase();
      const password = passwordInput ? passwordInput.value : '';
      const errorBox = $('#loginError');
      const errorMsg = $('#loginErrorMsg');
      const btnText = $('#loginBtnText');
      const spinner = $('#loginSpinner');

      // Validation
      if (!email || !password) {
        errorBox.classList.remove('hidden');
        errorMsg.textContent = 'Please enter both email and password.';
        return;
      }

      // Show loading
      if (btnText) btnText.textContent = 'Signing in...';
      if (spinner) spinner.classList.remove('hidden');
      if (btn) btn.disabled = true;

      // Simulate brief delay for UX
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(u => u.email.toLowerCase() === email && u.password === password && u.status !== 'inactive');

        if (user) {
          setSession(user);
          errorBox.classList.add('hidden');
          toast('Welcome back, ' + user.name + '!', 'success');
          const firstPage = (user.permissions && user.permissions[0]) || 'analytics';
          location.hash = '#/' + firstPage;
        } else {
          errorBox.classList.remove('hidden');
          const inactiveUser = getStoredUsers().find(u => u.email.toLowerCase() === email && u.password === password && u.status === 'inactive');
          errorMsg.textContent = inactiveUser ? 'Your account has been deactivated. Contact your admin.' : 'Invalid email or password. Please try again.';
          if (btnText) btnText.textContent = 'Sign In';
          if (spinner) spinner.classList.add('hidden');
          if (btn) btn.disabled = false;
          if (passwordInput) { passwordInput.value = ''; passwordInput.focus(); }
        }
      }, 600);
    }

    if (btn) btn.addEventListener('click', attemptLogin);

    // Enter key submits
    [emailInput, passwordInput].forEach(input => {
      if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptLogin(); });
    });

    // Focus email on load
    if (emailInput) setTimeout(() => emailInput.focus(), 100);
  }

  /* ===== User Management Events ===== */
  function bindUserEvents() {
    const addBtn = $('#addUserBtn');
    const form = $('#userForm');
    const cancelBtn = $('#cancelUserBtn');
    const saveBtn = $('#saveUserBtn');

    if (addBtn && form) {
      addBtn.addEventListener('click', () => {
        form.classList.remove('hidden');
        $('#userFormTitle').textContent = 'Add New Team Member';
        $('#editUserEmail').value = '';
        $('#userFormName').value = '';
        $('#userFormEmail').value = '';
        $('#userFormEmail').disabled = false;
        $('#userFormPassword').value = '';
        $('#userFormRole').value = '';
        $$('.perm-check').forEach(cb => { cb.checked = false; });
        $('#userFormName').focus();
      });
    }
    if (cancelBtn && form) {
      cancelBtn.addEventListener('click', () => form.classList.add('hidden'));
    }

    // Edit user
    $$('.edit-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.dataset.email;
        const users = getStoredUsers();
        const user = users.find(u => u.email === email);
        if (!user || !form) return;
        form.classList.remove('hidden');
        $('#userFormTitle').textContent = 'Edit Team Member';
        $('#editUserEmail').value = email;
        $('#userFormName').value = user.name;
        $('#userFormEmail').value = user.email;
        $('#userFormEmail').disabled = true;
        $('#userFormPassword').value = '';
        $('#userFormRole').value = user.role;
        $$('.perm-check').forEach(cb => {
          cb.checked = (user.permissions || []).includes(cb.value);
        });
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Save user
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const editingEmail = $('#editUserEmail').value;
        const name = ($('#userFormName').value || '').trim();
        const email = ($('#userFormEmail').value || '').trim().toLowerCase();
        const password = ($('#userFormPassword').value || '');
        const role = ($('#userFormRole').value || '').trim();
        const perms = [];
        $$('.perm-check').forEach(cb => { if (cb.checked) perms.push(cb.value); });

        if (!name || !email || !role) { toast('Please fill in name, email, and role.', 'error'); return; }
        if (!editingEmail && !password) { toast('Password is required for new users.', 'error'); return; }
        if (password && password.length < 6) { toast('Password must be at least 6 characters.', 'error'); return; }
        if (perms.length === 0) { toast('Please assign at least one permission.', 'error'); return; }

        const stored = JSON.parse(localStorage.getItem('sayarti_admin_users') || '[]');

        if (editingEmail) {
          // Editing existing user
          const idx = stored.findIndex(u => u.email === editingEmail);
          const baseUser = (D.adminUsers || []).find(u => u.email === editingEmail);
          const updated = {
            email: editingEmail,
            name: name,
            role: role,
            permissions: perms,
            status: 'active',
            lastLogin: (baseUser && baseUser.lastLogin) || new Date().toISOString().slice(0, 16).replace('T', ' '),
            avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
          };
          if (password) updated.password = password;
          else {
            // Keep existing password
            const existingStored = stored.find(u => u.email === editingEmail);
            const existingBase = (D.adminUsers || []).find(u => u.email === editingEmail);
            updated.password = (existingStored && existingStored.password) || (existingBase && existingBase.password) || '';
          }
          if (idx >= 0) stored[idx] = updated;
          else stored.push(updated);
        } else {
          // Adding new user
          if (getStoredUsers().find(u => u.email === email)) { toast('A user with this email already exists.', 'error'); return; }
          stored.push({
            email: email,
            password: password,
            name: name,
            role: role,
            permissions: perms,
            status: 'active',
            lastLogin: '—',
            avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
          });
        }

        saveStoredUsers(stored);
        toast(editingEmail ? 'User updated successfully!' : 'New user created!', 'success');
        route();
      });
    }

    // Delete user
    $$('.delete-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const email = btn.dataset.email;
        if (!confirm('Delete user ' + email + '? This action cannot be undone.')) return;
        const stored = JSON.parse(localStorage.getItem('sayarti_admin_users') || '[]');
        // If it's a base user, mark as deleted; if custom, remove
        const baseUser = (D.adminUsers || []).find(u => u.email === email);
        if (baseUser) {
          const idx = stored.findIndex(u => u.email === email);
          if (idx >= 0) { stored[idx]._deleted = true; }
          else { stored.push(Object.assign({}, baseUser, { _deleted: true })); }
        } else {
          const idx = stored.findIndex(u => u.email === email);
          if (idx >= 0) stored.splice(idx, 1);
        }
        saveStoredUsers(stored);
        toast('User deleted.', 'success');
        route();
      });
    });
  }

  /* ===== Translation Events ===== */
  function bindTranslationEvents() {
    const search = $('#translationSearch');
    const filter = $('#translationFilter');
    const addBtn = $('#addTranslationBtn');
    const addForm = $('#addKeyForm');
    const cancelNewKeyBtn = $('#cancelNewKeyBtn');
    const saveNewKeyBtn = $('#saveNewKeyBtn');
    const resetBtn = $('#resetTranslationsBtn');

    function getOverrides() {
      return JSON.parse(localStorage.getItem('sayarti_translations') || '{}');
    }
    function saveOverrides(ov) {
      localStorage.setItem('sayarti_translations', JSON.stringify(ov));
      if (typeof SayartiI18n !== 'undefined' && SayartiI18n.reload) SayartiI18n.reload();
    }

    // Search / filter
    function applyFilter() {
      const q = (search ? search.value : '').toLowerCase();
      const f = filter ? filter.value : '';
      const ov = getOverrides();
      $$('#translationsTable tbody tr').forEach(row => {
        const key = row.dataset.key;
        const text = row.textContent.toLowerCase();
        const matchText = !q || text.includes(q);
        let matchFilter = true;
        if (f === 'modified') {
          matchFilter = (ov.en && ov.en[key] !== undefined) || (ov.ar && ov.ar[key] !== undefined);
        } else if (f === 'missing') {
          const arInput = row.querySelector('input[data-lang="ar"]');
          matchFilter = !arInput || !arInput.value.trim();
        }
        row.style.display = matchText && matchFilter ? '' : 'none';
      });
    }
    if (search) search.addEventListener('input', applyFilter);
    if (filter) filter.addEventListener('change', applyFilter);

    // Add Key toggle
    if (addBtn && addForm) {
      addBtn.addEventListener('click', () => addForm.classList.toggle('hidden'));
    }
    if (cancelNewKeyBtn && addForm) {
      cancelNewKeyBtn.addEventListener('click', () => addForm.classList.add('hidden'));
    }

    // Save new key
    if (saveNewKeyBtn) {
      saveNewKeyBtn.addEventListener('click', () => {
        const key = ($('#newKeyName') || {}).value ? $('#newKeyName').value.trim() : '';
        const en = ($('#newKeyEn') || {}).value || '';
        const ar = ($('#newKeyAr') || {}).value || '';
        if (!key) { alert('Key name is required.'); return; }
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) { alert('Key must be alphanumeric/underscore, starting with a letter.'); return; }
        const ov = getOverrides();
        ov.en = ov.en || {}; ov.ar = ov.ar || {};
        ov.en[key] = en; ov.ar[key] = ar;
        saveOverrides(ov);
        route(); // re-render
      });
    }

    // Save individual translation
    document.querySelectorAll('.save-translation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const row = btn.closest('tr');
        const enInput = row.querySelector('input[data-lang="en"]');
        const arInput = row.querySelector('input[data-lang="ar"]');
        const ov = getOverrides();
        ov.en = ov.en || {}; ov.ar = ov.ar || {};
        ov.en[key] = enInput.value;
        ov.ar[key] = arInput.value;
        saveOverrides(ov);
        // Visual feedback
        btn.closest('td').classList.add('bg-green-50');
        setTimeout(() => btn.closest('td').classList.remove('bg-green-50'), 800);
      });
    });

    // Revert individual translation
    document.querySelectorAll('.revert-translation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const ov = getOverrides();
        if (ov.en) delete ov.en[key];
        if (ov.ar) delete ov.ar[key];
        saveOverrides(ov);
        route();
      });
    });

    // Delete translation key from overrides
    document.querySelectorAll('.delete-translation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        if (!confirm('Delete translation key "' + key + '"?')) return;
        const ov = getOverrides();
        if (ov.en) delete ov.en[key];
        if (ov.ar) delete ov.ar[key];
        saveOverrides(ov);
        route();
      });
    });

    // Reset all overrides
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (!confirm('Reset all translation overrides? This will revert to the default CMS values.')) return;
        localStorage.removeItem('sayarti_translations');
        if (typeof SayartiI18n !== 'undefined' && SayartiI18n.reload) SayartiI18n.reload();
        route();
      });
    }
  }

  /* ===== Init ===== */
  function init() {
    window.addEventListener('hashchange', route);

    // Logout button (in sidebar, always present)
    document.addEventListener('click', (e) => {
      if (e.target.closest('#adminLogoutBtn')) {
        e.preventDefault();
        clearSession();
        toast('You have been logged out.', 'info');
        location.hash = '#/login';
      }
    });

    // If not authenticated, always go to login
    if (!isAuthenticated()) {
      location.hash = '#/login';
      if (location.hash === '#/login') route();
    } else if (!location.hash || location.hash === '#' || location.hash === '#/') {
      location.hash = '#/analytics';
    } else {
      route();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
