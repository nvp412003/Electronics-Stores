// ====== Admin Dashboard - TechShop ======

// ====== Mock Data ======

const adminProducts = [
    { id: 1, name: "Laptop MacBook Pro 14 M3 Pro 2024", originalPrice: 59990000, salePrice: 49990000, image: "assets/images/laptop.png", badge: "-16%", badgeType: "sale", category: "laptop", stock: 25 },
    { id: 2, name: "Điện thoại iPhone 15 Pro Max 256GB", originalPrice: 34990000, salePrice: 29990000, image: "assets/images/phone.png", badge: "Bán chạy", badgeType: "hot", category: "phone", stock: 58 },
    { id: 3, name: "Đồng hồ thông minh Apple Watch Series 9", originalPrice: 10490000, salePrice: 8990000, image: "assets/images/watch.png", badge: "-14%", badgeType: "sale", category: "watch", stock: 42 },
    { id: 4, name: "Tai nghe Bluetooth AirPods Pro gen 2", originalPrice: 6590000, salePrice: 5490000, image: "assets/images/audio.png", badge: "-16%", badgeType: "sale", category: "audio", stock: 120 },
    { id: 5, name: "Điện thoại Samsung Galaxy S24 Ultra", originalPrice: 33990000, salePrice: 28990000, image: "assets/images/phone.png", badge: "Mới", badgeType: "hot", category: "phone", stock: 34 },
    { id: 6, name: "Laptop Dell XPS 15 Oled 9530 (2024)", originalPrice: 55000000, salePrice: 47990000, image: "assets/images/laptop.png", badge: "-12%", badgeType: "sale", category: "laptop", stock: 12 },
    { id: 7, name: "Đồng hồ Samsung Galaxy Watch 6 Classic", originalPrice: 8990000, salePrice: 6990000, image: "assets/images/watch.png", badge: "-22%", badgeType: "sale", category: "watch", stock: 5 },
    { id: 8, name: "Tai nghe không dây Sony WH-1000XM5", originalPrice: 8490000, salePrice: 7290000, image: "assets/images/audio.png", badge: "Best Choice", badgeType: "hot", category: "audio", stock: 0 },
    { id: 9, name: "iPad Pro M4 13 inch 256GB", originalPrice: 35990000, salePrice: 33490000, image: "assets/images/laptop.png", badge: "-7%", badgeType: "sale", category: "laptop", stock: 18 },
    { id: 10, name: "Tai nghe Marshall Major IV", originalPrice: 3990000, salePrice: 2990000, image: "assets/images/audio.png", badge: "-25%", badgeType: "sale", category: "audio", stock: 67 },
];

const adminOrders = [
    { id: "TS90123", customer: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0912345678", products: [{name: "iPhone 15 Pro Max 256GB", qty: 1, price: 29990000, image: "assets/images/phone.png"}, {name: "AirPods Pro gen 2", qty: 1, price: 5490000, image: "assets/images/audio.png"}], total: 35480000, status: "delivered", date: "17/04/2026", address: "123 Lê Lợi, Q.1, TP.HCM" },
    { id: "TS90122", customer: "Trần Thị B", email: "tranthib@email.com", phone: "0987654321", products: [{name: "MacBook Pro 14 M3 Pro", qty: 1, price: 49990000, image: "assets/images/laptop.png"}], total: 49990000, status: "shipping", date: "16/04/2026", address: "456 Trần Hưng Đạo, Q.5, TP.HCM" },
    { id: "TS90121", customer: "Phạm Văn C", email: "phamvanc@email.com", phone: "0901234567", products: [{name: "Samsung Galaxy S24 Ultra", qty: 1, price: 28990000, image: "assets/images/phone.png"}], total: 28990000, status: "confirmed", date: "16/04/2026", address: "789 Nguyễn Trãi, Q.3, TP.HCM" },
    { id: "TS90120", customer: "Lê Thị D", email: "lethid@email.com", phone: "0978123456", products: [{name: "Apple Watch Series 9", qty: 2, price: 8990000, image: "assets/images/watch.png"}], total: 17980000, status: "pending", date: "15/04/2026", address: "321 Võ Văn Tần, Q.3, TP.HCM" },
    { id: "TS90119", customer: "Hoàng Văn E", email: "hoangvane@email.com", phone: "0965432100", products: [{name: "Sony WH-1000XM5", qty: 1, price: 7290000, image: "assets/images/audio.png"}, {name: "Marshall Major IV", qty: 1, price: 2990000, image: "assets/images/audio.png"}], total: 10280000, status: "cancelled", date: "14/04/2026", address: "654 Hai Bà Trưng, Q.1, TP.HCM" },
    { id: "TS90118", customer: "Nguyễn Thị F", email: "nguyenthif@email.com", phone: "0934567890", products: [{name: "Dell XPS 15 Oled", qty: 1, price: 47990000, image: "assets/images/laptop.png"}], total: 47990000, status: "delivered", date: "13/04/2026", address: "111 Pasteur, Q.1, TP.HCM" },
    { id: "TS90117", customer: "Trần Văn G", email: "tranvang@email.com", phone: "0945678901", products: [{name: "Galaxy Watch 6 Classic", qty: 1, price: 6990000, image: "assets/images/watch.png"}], total: 6990000, status: "pending", date: "13/04/2026", address: "222 Lý Tự Trọng, Q.1, TP.HCM" },
    { id: "TS90116", customer: "Phạm Thị H", email: "phamthih@email.com", phone: "0956789012", products: [{name: "iPad Pro M4 13 inch", qty: 1, price: 33490000, image: "assets/images/laptop.png"}], total: 33490000, status: "shipping", date: "12/04/2026", address: "333 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM" },
];

const adminCustomers = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0912345678", orders: 5, spent: 125400000, tier: "Vàng", joined: "01/01/2025" },
    { id: 2, name: "Trần Thị B", email: "tranthib@email.com", phone: "0987654321", orders: 3, spent: 89970000, tier: "Bạc", joined: "15/02/2025" },
    { id: 3, name: "Phạm Văn C", email: "phamvanc@email.com", phone: "0901234567", orders: 2, spent: 57980000, tier: "Bạc", joined: "20/03/2025" },
    { id: 4, name: "Lê Thị D", email: "lethid@email.com", phone: "0978123456", orders: 4, spent: 35960000, tier: "Đồng", joined: "10/05/2025" },
    { id: 5, name: "Hoàng Văn E", email: "hoangvane@email.com", phone: "0965432100", orders: 1, spent: 10280000, tier: "Đồng", joined: "22/06/2025" },
    { id: 6, name: "Nguyễn Thị F", email: "nguyenthif@email.com", phone: "0934567890", orders: 7, spent: 198500000, tier: "Kim Cương", joined: "05/08/2024" },
    { id: 7, name: "Trần Văn G", email: "tranvang@email.com", phone: "0945678901", orders: 2, spent: 15980000, tier: "Đồng", joined: "30/09/2025" },
    { id: 8, name: "Phạm Thị H", email: "phamthih@email.com", phone: "0956789012", orders: 3, spent: 45470000, tier: "Bạc", joined: "12/11/2025" },
];

// ====== Utility Functions ======

const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const getCategoryLabel = (cat) => {
    const map = { laptop: 'Laptop', phone: 'Điện thoại', watch: 'Đồng hồ', audio: 'Âm thanh' };
    return map[cat] || cat;
};

const getCategoryImage = (cat) => {
    const map = { laptop: 'assets/images/laptop.png', phone: 'assets/images/phone.png', watch: 'assets/images/watch.png', audio: 'assets/images/audio.png' };
    return map[cat] || 'assets/images/laptop.png';
};

const getStatusLabel = (status) => {
    const map = { pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy' };
    return map[status] || status;
};

const getStatusClass = (status) => {
    const map = { pending: 'status-pending', confirmed: 'status-shipping', shipping: 'status-shipping', delivered: 'status-success', cancelled: 'status-cancelled' };
    return map[status] || '';
};

const getStatusIcon = (status) => {
    const map = { pending: 'fa-clock', confirmed: 'fa-circle-check', shipping: 'fa-truck', delivered: 'fa-check-double', cancelled: 'fa-xmark' };
    return map[status] || 'fa-circle';
};

const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Hết hàng', class: 'status-out-stock' };
    if (stock <= 10) return { label: `Còn ${stock}`, class: 'status-low-stock' };
    return { label: `Còn ${stock}`, class: 'status-in-stock' };
};

const getTierClass = (tier) => {
    const map = { 'Kim Cương': 'status-shipping', 'Vàng': 'status-pending', 'Bạc': 'status-success', 'Đồng': 'status-cancelled' };
    return map[tier] || '';
};

// Toast Notification (reuse from main site)
const showAdminToast = (message) => {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><p>${message}</p>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toastContainer.removeChild(toast), 400);
    }, 3000);
};

// ====== Page Navigation ======

const switchAdminPage = (pageName) => {
    // Hide all pages
    document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
    // Show target page
    const target = document.getElementById(`page-${pageName}`);
    if (target) target.classList.add('active');

    // Update sidebar active
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    const navLink = document.querySelector(`[data-page="${pageName}"]`);
    if (navLink) navLink.classList.add('active');

    // Close mobile sidebar
    document.getElementById('adminSidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
};

// ====== Dashboard ======

const renderStats = () => {
    const totalRevenue = adminOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
    const totalOrders = adminOrders.length;
    const totalCustomers = adminCustomers.length;
    const totalProducts = adminProducts.length;

    const stats = [
        { icon: 'fa-solid fa-dollar-sign', value: formatVND(totalRevenue), label: 'Tổng doanh thu', trend: '+12.5%', trendDir: 'up' },
        { icon: 'fa-solid fa-shopping-bag', value: totalOrders, label: 'Đơn hàng', trend: '+8.2%', trendDir: 'up' },
        { icon: 'fa-solid fa-users', value: totalCustomers, label: 'Khách hàng', trend: '+5.1%', trendDir: 'up' },
        { icon: 'fa-solid fa-box', value: totalProducts, label: 'Sản phẩm', trend: '0%', trendDir: 'up' },
    ];

    const grid = document.getElementById('statsGrid');
    if (!grid) return;
    grid.innerHTML = stats.map(s => `
        <div class="stat-card">
            <div class="stat-card-header">
                <div class="stat-icon"><i class="${s.icon}"></i></div>
                <span class="stat-trend ${s.trendDir}"><i class="fa-solid fa-arrow-${s.trendDir === 'up' ? 'up' : 'down'}"></i> ${s.trend}</span>
            </div>
            <div class="stat-value">${s.value}</div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join('');
};

const renderRecentOrders = () => {
    const tbody = document.getElementById('recentOrdersBody');
    if (!tbody) return;
    const recent = adminOrders.slice(0, 5);
    tbody.innerHTML = recent.map(o => `
        <tr>
            <td><b style="color: var(--primary-color);">#${o.id}</b></td>
            <td>${o.customer}</td>
            <td><b>${formatVND(o.total)}</b></td>
            <td><span class="status-badge ${getStatusClass(o.status)}"><i class="fa-solid ${getStatusIcon(o.status)}"></i> ${getStatusLabel(o.status)}</span></td>
            <td style="color: var(--text-muted);">${o.date}</td>
        </tr>
    `).join('');
};

// ====== Charts ======
let revenueChartInstance = null;
let categoryChartInstance = null;

const renderCharts = () => {
    renderRevenueChart();
    renderCategoryChart();
};

const renderRevenueChart = (months = 6) => {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    if (revenueChartInstance) revenueChartInstance.destroy();

    const allLabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    const allData = [180, 220, 195, 310, 280, 350, 290, 420, 380, 450, 510, 480];
    const labels = allLabels.slice(0, months);
    const data = allData.slice(0, months);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Doanh thu (triệu VND)',
                data,
                borderColor: '#3b82f6',
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 280);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                borderWidth: 2.5,
                pointRadius: 4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    titleColor: isDark ? '#e2e8f0' : '#1a1a1a',
                    bodyColor: isDark ? '#94a3b8' : '#64748b',
                    borderColor: isDark ? '#334155' : '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: (c) => `${c.parsed.y} triệu VND`
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'Inter', size: 12 } } },
                y: { grid: { color: gridColor }, ticks: { color: textColor, font: { family: 'Inter', size: 12 }, callback: (v) => v + 'tr' }, border: { display: false } }
            }
        }
    });
};

const renderCategoryChart = () => {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    if (categoryChartInstance) categoryChartInstance.destroy();

    const categoryCounts = {};
    adminProducts.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    const labels = Object.keys(categoryCounts).map(getCategoryLabel);
    const data = Object.values(categoryCounts);
    const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'];

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 0,
                hoverBorderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyleWidth: 10,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { family: 'Inter', size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    titleColor: isDark ? '#e2e8f0' : '#1a1a1a',
                    bodyColor: isDark ? '#94a3b8' : '#64748b',
                    borderColor: isDark ? '#334155' : '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                }
            }
        }
    });
};

// Chart period buttons
document.querySelectorAll('.chart-period button').forEach(btn => {
    btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const period = this.dataset.period;
        renderRevenueChart(period === '6m' ? 6 : 12);
    });
});

// ====== Products Table ======

const renderProductsTable = (searchQuery = '', categoryFilter = 'all') => {
    const tbody = document.getElementById('productsBody');
    if (!tbody) return;

    let filtered = [...adminProducts];
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-box-open"></i><h4>Không tìm thấy sản phẩm</h4><p>Thử tìm kiếm với từ khóa khác.</p></div></td></tr>`;
        document.getElementById('productsInfo').textContent = '0 sản phẩm';
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        const stockInfo = getStockStatus(p.stock);
        return `
        <tr>
            <td><span style="color: var(--text-muted);">#${p.id}</span></td>
            <td>
                <div class="table-product-info">
                    <div class="table-product-img"><img src="${p.image}" alt="${p.name}"></div>
                    <div>
                        <div class="table-product-name">${p.name}</div>
                        <div class="table-product-cat">${getCategoryLabel(p.category)}</div>
                    </div>
                </div>
            </td>
            <td><span class="status-badge ${getStatusClass('confirmed')}">${getCategoryLabel(p.category)}</span></td>
            <td><b style="color: var(--primary-color);">${formatVND(p.salePrice)}</b></td>
            <td style="color: var(--text-muted); text-decoration: line-through;">${formatVND(p.originalPrice)}</td>
            <td><span class="status-badge ${stockInfo.class}">${stockInfo.label}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-edit" title="Chỉnh sửa" onclick="openEditProduct(${p.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-delete" title="Xóa" onclick="confirmDeleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');

    document.getElementById('productsInfo').textContent = `Hiển thị ${filtered.length} sản phẩm`;
};

// ====== Product CRUD ======

const openAddProduct = () => {
    document.getElementById('productModalTitle').textContent = 'Thêm sản phẩm mới';
    document.getElementById('productForm').reset();
    document.getElementById('productEditId').value = '';
    document.getElementById('productModal').classList.add('show');
};

const openEditProduct = (id) => {
    const product = adminProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('productModalTitle').textContent = 'Chỉnh sửa sản phẩm';
    document.getElementById('productEditId').value = id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productSalePrice').value = product.salePrice;
    document.getElementById('productOriginalPrice').value = product.originalPrice;
    document.getElementById('productBadge').value = product.badge || '';
    document.getElementById('productBadgeType').value = product.badgeType || 'sale';
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('productModal').classList.add('show');
};

const saveProduct = () => {
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value) || 0;
    const salePrice = parseInt(document.getElementById('productSalePrice').value) || 0;
    const originalPrice = parseInt(document.getElementById('productOriginalPrice').value) || salePrice;
    const badge = document.getElementById('productBadge').value.trim();
    const badgeType = document.getElementById('productBadgeType').value;
    const image = document.getElementById('productImage').value.trim() || getCategoryImage(category);
    const editId = document.getElementById('productEditId').value;

    if (!name || !category || !salePrice) {
        showAdminToast('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    if (editId) {
        // Edit
        const idx = adminProducts.findIndex(p => p.id === parseInt(editId));
        if (idx > -1) {
            adminProducts[idx] = { ...adminProducts[idx], name, category, stock, salePrice, originalPrice, badge, badgeType, image };
            showAdminToast('Cập nhật sản phẩm thành công!');
        }
    } else {
        // Add
        const newId = Math.max(...adminProducts.map(p => p.id)) + 1;
        adminProducts.push({ id: newId, name, category, stock, salePrice, originalPrice, badge, badgeType, image });
        showAdminToast('Thêm sản phẩm mới thành công!');
    }

    closeModal('productModal');
    renderProductsTable(
        document.getElementById('searchProduct')?.value || '',
        document.getElementById('filterCategory')?.value || 'all'
    );
    renderStats();
};

let deleteTargetId = null;
let deleteType = null;

const confirmDeleteProduct = (id) => {
    const product = adminProducts.find(p => p.id === id);
    if (!product) return;
    deleteTargetId = id;
    deleteType = 'product';
    document.getElementById('deleteMessage').textContent = `Sản phẩm "${product.name}" sẽ bị xóa vĩnh viễn.`;
    document.getElementById('deleteModal').classList.add('show');
};

const executeDelete = () => {
    if (deleteType === 'product' && deleteTargetId) {
        const idx = adminProducts.findIndex(p => p.id === deleteTargetId);
        if (idx > -1) {
            adminProducts.splice(idx, 1);
            showAdminToast('Đã xóa sản phẩm thành công!');
            renderProductsTable(
                document.getElementById('searchProduct')?.value || '',
                document.getElementById('filterCategory')?.value || 'all'
            );
            renderStats();
        }
    }
    closeModal('deleteModal');
    deleteTargetId = null;
    deleteType = null;
};

// ====== Orders Table ======

const renderOrdersTable = (searchQuery = '', statusFilter = 'all') => {
    const tbody = document.getElementById('ordersBody');
    if (!tbody) return;

    let filtered = [...adminOrders];
    if (statusFilter !== 'all') {
        filtered = filtered.filter(o => o.status === statusFilter);
    }
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-receipt"></i><h4>Không tìm thấy đơn hàng</h4><p>Thử tìm kiếm với từ khóa khác.</p></div></td></tr>`;
        document.getElementById('ordersInfo').textContent = '0 đơn hàng';
        return;
    }

    tbody.innerHTML = filtered.map(o => `
        <tr>
            <td><b style="color: var(--primary-color);">#${o.id}</b></td>
            <td>
                <div class="customer-info-cell">
                    <div class="customer-avatar-sm">${o.customer.charAt(o.customer.lastIndexOf(' ') + 1)}</div>
                    <div>
                        <div class="customer-name">${o.customer}</div>
                        <div class="customer-email">${o.email}</div>
                    </div>
                </div>
            </td>
            <td>${o.products.length} sản phẩm</td>
            <td><b>${formatVND(o.total)}</b></td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${o.id}', this.value)">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Chờ xác nhận</option>
                    <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
                    <option value="shipping" ${o.status === 'shipping' ? 'selected' : ''}>Đang giao</option>
                    <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Đã giao</option>
                    <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
            <td style="color: var(--text-muted);">${o.date}</td>
            <td>
                <div class="table-actions">
                    <button title="Xem chi tiết" onclick="viewOrderDetail('${o.id}')"><i class="fa-solid fa-eye"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('ordersInfo').textContent = `Hiển thị ${filtered.length} đơn hàng`;
};

const updateOrderStatus = (orderId, newStatus) => {
    const order = adminOrders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        showAdminToast(`Đơn hàng #${orderId} đã cập nhật: ${getStatusLabel(newStatus)}`);
        renderRecentOrders();
        // Update badge count
        const pendingCount = adminOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
        const badge = document.querySelector('#nav-orders .nav-badge');
        if (badge) badge.textContent = pendingCount;
    }
};

const viewOrderDetail = (orderId) => {
    const order = adminOrders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('orderDetailTitle').textContent = `Chi tiết đơn hàng #${order.id}`;
    const body = document.getElementById('orderDetailBody');
    body.innerHTML = `
        <div class="order-detail-row"><span class="order-detail-label">Khách hàng</span><span class="order-detail-value">${order.customer}</span></div>
        <div class="order-detail-row"><span class="order-detail-label">Email</span><span class="order-detail-value">${order.email}</span></div>
        <div class="order-detail-row"><span class="order-detail-label">Số điện thoại</span><span class="order-detail-value">${order.phone}</span></div>
        <div class="order-detail-row"><span class="order-detail-label">Địa chỉ giao hàng</span><span class="order-detail-value">${order.address}</span></div>
        <div class="order-detail-row"><span class="order-detail-label">Ngày đặt</span><span class="order-detail-value">${order.date}</span></div>
        <div class="order-detail-row"><span class="order-detail-label">Trạng thái</span><span class="order-detail-value"><span class="status-badge ${getStatusClass(order.status)}"><i class="fa-solid ${getStatusIcon(order.status)}"></i> ${getStatusLabel(order.status)}</span></span></div>
        <div class="order-products-list">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Sản phẩm đặt mua:</h4>
            ${order.products.map(p => `
                <div class="order-product-item">
                    <img src="${p.image}" alt="${p.name}">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 13px;">${p.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted);">x${p.qty}</div>
                    </div>
                    <div style="font-weight: 600; font-size: 13px;">${formatVND(p.price * p.qty)}</div>
                </div>
            `).join('')}
        </div>
        <div class="order-detail-row" style="margin-top: 16px; padding-top: 16px; border-top: 2px solid var(--border-color);">
            <span class="order-detail-label" style="font-size: 16px; font-weight: 700;">Tổng cộng</span>
            <span class="order-detail-value" style="font-size: 18px; color: var(--primary-color);">${formatVND(order.total)}</span>
        </div>
    `;
    document.getElementById('orderDetailModal').classList.add('show');
};

// ====== Customers Table ======

const renderCustomersTable = (searchQuery = '') => {
    const tbody = document.getElementById('customersBody');
    if (!tbody) return;

    let filtered = [...adminCustomers];
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-users"></i><h4>Không tìm thấy khách hàng</h4><p>Thử tìm kiếm với từ khóa khác.</p></div></td></tr>`;
        document.getElementById('customersInfo').textContent = '0 khách hàng';
        return;
    }

    tbody.innerHTML = filtered.map(c => `
        <tr>
            <td><span style="color: var(--text-muted);">#${c.id}</span></td>
            <td>
                <div class="customer-info-cell">
                    <div class="customer-avatar-sm">${c.name.charAt(c.name.lastIndexOf(' ') + 1)}</div>
                    <div>
                        <div class="customer-name">${c.name}</div>
                        <div class="customer-email">${c.email}</div>
                    </div>
                </div>
            </td>
            <td>${c.phone}</td>
            <td><b>${c.orders}</b> đơn</td>
            <td><b style="color: var(--primary-color);">${formatVND(c.spent)}</b></td>
            <td><span class="status-badge ${getTierClass(c.tier)}">${c.tier}</span></td>
            <td style="color: var(--text-muted);">${c.joined}</td>
        </tr>
    `).join('');

    document.getElementById('customersInfo').textContent = `Hiển thị ${filtered.length} khách hàng`;
};

// ====== Modals ======

const closeModal = (modalId) => {
    document.getElementById(modalId).classList.remove('show');
};

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('show');
        }
    });
});

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.show').forEach(m => m.classList.remove('show'));
    }
});

// ====== Theme Toggle ======

const initAdminTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('adminThemeToggle');
    if (themeBtn) {
        themeBtn.innerHTML = savedTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    }
    const darkModeSwitch = document.getElementById('settingDarkMode');
    if (darkModeSwitch && savedTheme === 'dark') {
        darkModeSwitch.classList.add('active');
    }
};

document.getElementById('adminThemeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeBtn = document.getElementById('adminThemeToggle');
    if (themeBtn) themeBtn.innerHTML = newTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';

    const darkModeSwitch = document.getElementById('settingDarkMode');
    if (darkModeSwitch) {
        newTheme === 'dark' ? darkModeSwitch.classList.add('active') : darkModeSwitch.classList.remove('active');
    }

    // Re-render charts with new theme colors
    renderCharts();
    showAdminToast(`Đã chuyển sang chế độ ${newTheme === 'light' ? 'sáng' : 'tối'}`);
});

const toggleAdminDarkMode = (el) => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeBtn = document.getElementById('adminThemeToggle');
    if (themeBtn) themeBtn.innerHTML = newTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';

    renderCharts();
    showAdminToast(`Đã chuyển sang chế độ ${newTheme === 'light' ? 'sáng' : 'tối'}`);
};

// ====== Settings ======

const saveSettings = () => {
    showAdminToast('Đã lưu cài đặt thành công!');
};

// ====== Sidebar Toggle (Mobile) ======

document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('adminSidebar').classList.toggle('show');
    document.getElementById('sidebarOverlay').classList.toggle('show');
});

document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
    document.getElementById('adminSidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
});

// ====== Event Listeners ======

document.addEventListener('DOMContentLoaded', () => {
    initAdminTheme();

    // Sidebar navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) switchAdminPage(page);
        });
    });

    // Product events
    document.getElementById('btnAddProduct')?.addEventListener('click', openAddProduct);
    document.getElementById('btnSaveProduct')?.addEventListener('click', saveProduct);
    document.getElementById('btnConfirmDelete')?.addEventListener('click', executeDelete);

    // Product search & filter
    document.getElementById('searchProduct')?.addEventListener('input', (e) => {
        renderProductsTable(e.target.value, document.getElementById('filterCategory')?.value || 'all');
    });
    document.getElementById('filterCategory')?.addEventListener('change', (e) => {
        renderProductsTable(document.getElementById('searchProduct')?.value || '', e.target.value);
    });

    // Order search & filter
    document.getElementById('searchOrder')?.addEventListener('input', (e) => {
        renderOrdersTable(e.target.value, document.getElementById('filterOrderStatus')?.value || 'all');
    });
    document.getElementById('filterOrderStatus')?.addEventListener('change', (e) => {
        renderOrdersTable(document.getElementById('searchOrder')?.value || '', e.target.value);
    });

    // Customer search
    document.getElementById('searchCustomer')?.addEventListener('input', (e) => {
        renderCustomersTable(e.target.value);
    });

    // Initial renders
    renderStats();
    renderRecentOrders();
    renderCharts();
    renderProductsTable();
    renderOrdersTable();
    renderCustomersTable();

    // Update pending orders badge
    const pendingCount = adminOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
    const badge = document.querySelector('#nav-orders .nav-badge');
    if (badge) badge.textContent = pendingCount;
});
