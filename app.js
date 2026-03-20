/* =========================================
   TECHNOVA - APPLICATION LOGIC
   ========================================= */

// Mock Data: Electronics Products
const productsData = [
    {
        id: 'p1',
        name: 'Laptop Gaming Predator X',
        category: 'Laptop',
        price: 35000000,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
        featured: true
    },
    {
        id: 'p2',
        name: 'NovaPhone 15 Pro Max',
        category: 'Điện Thoại',
        price: 29500000,
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588eb3?auto=format&fit=crop&q=80&w=400',
        featured: true
    },
    {
        id: 'p3',
        name: 'Tai Nghe Over-Ear Zenith',
        category: 'Phụ Kiện',
        price: 4200000,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400',
        featured: true
    },
    {
        id: 'p4',
        name: 'Smartwatch Quantum 4',
        category: 'Phụ Kiện',
        price: 5500000,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400',
        featured: true
    },
    {
        id: 'p5',
        name: 'Laptop UItrabook Swift 9',
        category: 'Laptop',
        price: 24000000,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400',
        featured: false
    },
    {
        id: 'p6',
        name: 'Tablet NovaPad Pro',
        category: 'Điện Thoại',
        price: 18000000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400',
        featured: false
    }
];

// Utility: Format Currency (VND)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Application State
const state = {
    cart: [],
    user: null, // null if not logged in
};

// Main App Object
const app = {
    contentDiv: document.getElementById('app-content'),
    routes: ['home', 'products', 'login', 'register', 'cart', 'profile'],
    
    // Initialize App
    init() {
        this.loadState();
        this.setupEventListeners();
        this.updateNavUI();
        this.updateCartBadge();
        
        // Initial route based on URL hash or default to home
        const initialRoute = window.location.hash.replace('#', '') || 'home';
        this.navigate(initialRoute);
    },
    
    // Setup Global Event Listeners
    setupEventListeners() {
        // Navigation clicks
        document.querySelectorAll('a[data-link], button[data-link]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const route = el.getAttribute('data-link');
                this.navigate(route);
            });
        });
        
        // Handle Hash Change
        window.addEventListener('hashchange', () => {
            const route = window.location.hash.replace('#', '') || 'home';
            this.navigate(route);
        });
    },
    
    // Router / Navigation logic
    navigate(route) {
        if (!this.routes.includes(route)) route = 'home';
        
        // Protected routes check
        if ((route === 'profile' || route === 'cart-checkout') && !state.user) {
            this.showToast('Bạn cần đăng nhập để truy cập trang này.', 'error');
            route = 'login';
        }
        
        // If logged in, block access to login/register
        if ((route === 'login' || route === 'register') && state.user) {
            route = 'home';
        }
        
        // Update URL hash without jumping
        history.pushState(null, null, `#${route}`);
        
        // Update active nav link
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
            if(el.getAttribute('data-link') === route) {
                el.classList.add('active');
            }
        });
        
        // Render Template
        const templateId = `tpl-${route}`;
        const template = document.getElementById(templateId);
        
        if (template) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Inject content
            this.contentDiv.innerHTML = '';
            this.contentDiv.appendChild(template.content.cloneNode(true));
            
            // Initialize page specific scripts
            this.initPage(route);
        }
    },
    
    // Initialize specific page logic
    initPage(route) {
        // Re-attach data-link listeners for newly injected DOM
        document.querySelectorAll('#app-content a[data-link], #app-content button[data-link]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const path = el.getAttribute('data-link');
                this.navigate(path);
            });
        });

        switch (route) {
            case 'home':
                this.renderProducts('featured-products', productsData.filter(p => p.featured));
                break;
            case 'products':
                this.renderProducts('all-products', productsData);
                break;
            case 'cart':
                this.renderCart();
                break;
            case 'login':
                this.setupAuthForms('login-form');
                break;
            case 'register':
                this.setupAuthForms('register-form');
                break;
            case 'profile':
                this.setupProfile();
                break;
        }
    },
    
    // Render Products Grid
    renderProducts(containerId, products) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = products.map(product => `
            <div class="product-card fade-in">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <button class="btn-add-cart" onclick="app.addToCart('${product.id}')" title="Thêm vào giỏ">
                        <i class="ri-add-line"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    // Cart Logic
    addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if(!product) return;
        
        const existingItem = state.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            state.cart.push({ ...product, qty: 1 });
        }
        
        this.saveState();
        this.updateCartBadge();
        this.showToast(`Đã thêm ${product.name} vào giỏ`, 'success');
    },
    
    updateCartBadge() {
        const count = state.cart.reduce((total, item) => total + item.qty, 0);
        const badge = document.getElementById('cart-count');
        if(badge) {
            badge.innerText = count;
            // animate bounce
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => badge.style.transform = 'scale(1)', 200);
        }
    },
    
    renderCart() {
        const listContainer = document.getElementById('cart-items-list');
        const subtotalEl = document.getElementById('cart-subtotal');
        const totalEl = document.getElementById('cart-total');
        const btnCheckout = document.getElementById('btn-checkout');
        
        if(!listContainer) return;
        
        if(state.cart.length === 0) {
            listContainer.innerHTML = `<div class="empty-cart-msg">Giỏ hàng của bạn đang trống.<br><button class="btn btn-primary mt-4" onclick="app.navigate('products')">Mua sắm ngay</button></div>`;
            if(subtotalEl) subtotalEl.innerText = '0 đ';
            if(totalEl) totalEl.innerText = '0 đ';
            if(btnCheckout) btnCheckout.disabled = true;
            return;
        }
        
        let subtotal = 0;
        
        listContainer.innerHTML = state.cart.map(item => {
            subtotal += item.price * item.qty;
            return `
            <div class="cart-item slide-up delay-1">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price">${formatCurrency(item.price)}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="app.changeQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="app.changeQty('${item.id}', 1)">+</button>
                </div>
                <button class="btn-remove" onclick="app.removeFromCart('${item.id}')" title="Xóa">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            `;
        }).join('');
        
        if(subtotalEl) subtotalEl.innerText = formatCurrency(subtotal);
        if(totalEl) totalEl.innerText = formatCurrency(subtotal);
        if(btnCheckout) {
            btnCheckout.disabled = false;
            btnCheckout.onclick = () => {
                if(!state.user) {
                    this.showToast('Vui lòng đăng nhập để thanh toán', 'error');
                    this.navigate('login');
                } else {
                    this.showToast('Thanh toán thành công (Mô phỏng)!', 'success');
                    state.cart = [];
                    this.saveState();
                    this.updateCartBadge();
                    setTimeout(() => this.navigate('profile'), 1500);
                }
            };
        }
    },
    
    changeQty(productId, delta) {
        const item = state.cart.find(i => i.id === productId);
        if(item) {
            item.qty += delta;
            if(item.qty <= 0) this.removeFromCart(productId);
            else {
                this.saveState();
                this.updateCartBadge();
                this.renderCart();
            }
        }
    },
    
    removeFromCart(productId) {
        state.cart = state.cart.filter(i => i.id !== productId);
        this.saveState();
        this.updateCartBadge();
        this.renderCart();
        this.showToast('Đã xóa sản phẩm khỏi giỏ', 'success');
    },
    
    // Auth & Profile Logic
    setupAuthForms(formId) {
        const form = document.getElementById(formId);
        if(!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if(formId === 'login-form') {
                const email = document.getElementById('login-email').value;
                const name = email.split('@')[0];
                this.loginUser({ name, email });
            } else if(formId === 'register-form') {
                const name = document.getElementById('reg-name').value;
                const email = document.getElementById('reg-email').value;
                this.loginUser({ name, email });
            }
        });
    },
    
    loginUser(user) {
        state.user = user;
        this.saveState();
        this.updateNavUI();
        this.showToast(`Chào mừng ${user.name}!`, 'success');
        this.navigate('home');
    },
    
    logoutUser() {
        state.user = null;
        this.saveState();
        this.updateNavUI();
        this.showToast('Đã đăng xuất', 'success');
        this.navigate('home');
    },
    
    setupProfile() {
        if(!state.user) return;
        
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const avatarEl = document.getElementById('profile-avatar');
        const btnLogout = document.getElementById('btn-logout');
        
        if(nameEl) nameEl.innerText = state.user.name;
        if(emailEl) emailEl.innerText = state.user.email;
        if(avatarEl) avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=4facfe&color=fff&size=120`;
        
        if(btnLogout) {
            btnLogout.addEventListener('click', () => this.logoutUser());
        }
    },
    
    updateNavUI() {
        const authNav = document.getElementById('auth-nav');
        const userNav = document.getElementById('user-nav');
        const navUsername = document.getElementById('nav-username');
        
        if (state.user) {
            authNav.classList.add('hidden');
            userNav.classList.remove('hidden');
            if(navUsername) navUsername.innerText = state.user.name;
            const userAvatar = userNav.querySelector('img');
            if(userAvatar) userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(state.user.name)}&background=4facfe&color=fff`;
        } else {
            authNav.classList.remove('hidden');
            userNav.classList.add('hidden');
        }
    },
    
    // UI Utilities
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if(!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill';
        toast.innerHTML = `<i class="${icon}" style="font-size: 1.5rem; color: ${type === 'success' ? 'var(--success)' : 'var(--danger)'}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },
    
    // State Persistence
    saveState() {
        localStorage.setItem('technova-cart', JSON.stringify(state.cart));
        if(state.user) {
            localStorage.setItem('technova-user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('technova-user');
        }
    },
    
    loadState() {
        try {
            const savedCart = localStorage.getItem('technova-cart');
            const savedUser = localStorage.getItem('technova-user');
            if(savedCart) state.cart = JSON.parse(savedCart);
            if(savedUser) state.user = JSON.parse(savedUser);
        } catch(e) {
            console.error('Lỗi khi tải dữ liệu LocalStorage', e);
        }
    }
};

// Initialize app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
