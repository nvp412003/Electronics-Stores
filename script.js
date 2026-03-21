// Mock Data for Products
const products = [
    {
        id: 1,
        name: "Laptop MacBook Pro 14 M3 Pro 2024",
        originalPrice: 59990000,
        salePrice: 49990000,
        image: "assets/images/laptop.png",
        badge: "-16%",
        badgeType: "sale",
        category: "laptop"
    },
    {
        id: 2,
        name: "Điện thoại iPhone 15 Pro Max 256GB",
        originalPrice: 34990000,
        salePrice: 29990000,
        image: "assets/images/phone.png",
        badge: "Bán chạy",
        badgeType: "hot",
        category: "phone"
    },
    {
        id: 3,
        name: "Đồng hồ thông minh Apple Watch Series 9",
        originalPrice: 10490000,
        salePrice: 8990000,
        image: "assets/images/watch.png",
        badge: "-14%",
        badgeType: "sale",
        category: "watch"
    },
    {
        id: 4,
        name: "Tai nghe Bluetooth AirPods Pro gen 2",
        originalPrice: 6590000,
        salePrice: 5490000,
        image: "assets/images/audio.png",
        badge: "-16%",
        badgeType: "sale",
        category: "audio"
    },
    {
        id: 5,
        name: "Điện thoại Samsung Galaxy S24 Ultra",
        originalPrice: 33990000,
        salePrice: 28990000,
        image: "assets/images/phone.png",
        badge: "Mới",
        badgeType: "hot",
        category: "phone"
    },
    {
        id: 6,
        name: "Laptop Dell XPS 15 Oled 9530 (2024)",
        originalPrice: 55000000,
        salePrice: 47990000,
        image: "assets/images/laptop.png",
        badge: "-12%",
        badgeType: "sale",
        category: "laptop"
    },
    {
        id: 7,
        name: "Đồng hồ Samsung Galaxy Watch 6 Classic",
        originalPrice: 8990000,
        salePrice: 6990000,
        image: "assets/images/watch.png",
        badge: "-22%",
        badgeType: "sale",
        category: "watch"
    },
    {
        id: 8,
        name: "Tai nghe không dây Sony WH-1000XM5",
        originalPrice: 8490000,
        salePrice: 7290000,
        image: "assets/images/audio.png",
        badge: "Best Choice",
        badgeType: "hot",
        category: "audio"
    }
];

// Utility: Format currency (VND)
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
};

// Render Products
const renderProducts = (filterCategory = 'all', searchQuery = '') => {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) return;

    productGrid.innerHTML = '';
    
    let filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }

    // Update Section Title
    const sectionTitle = document.querySelector('.section-header h2');
    if (sectionTitle) {
        if (searchQuery) {
            sectionTitle.textContent = `Kết quả tìm kiếm cho: "${searchQuery}"`;
        } else if (filterCategory !== 'all') {
            const categoryMap = {
                'laptop': 'Laptop & Macbook',
                'phone': 'Điện thoại thông minh',
                'watch': 'Đồng hồ thông minh',
                'audio': 'Phụ kiện Âm thanh'
            };
            sectionTitle.textContent = categoryMap[filterCategory] || 'Sản phẩm';
        } else {
            sectionTitle.textContent = 'Sản phẩm nổi bật';
        }
    }

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const badgeClass = product.badgeType === 'hot' ? 'badge-hot' : 'badge-sale';
        
        const cardHTML = `
            <div class="product-card">
                ${product.badge ? `<div class="product-badge ${badgeClass}">${product.badge}</div>` : ''}
                <a href="product-detail.html?id=${product.id}" class="product-img" style="display:block;">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-info">
                    <a href="product-detail.html?id=${product.id}" style="text-decoration: none;"><h3 class="product-title" style="color:var(--text-main); margin-bottom: 5px;">${product.name}</h3></a>
                    <div class="product-price">
                        <span class="current-price">${formatCurrency(product.salePrice)}</span>
                        ${product.originalPrice > product.salePrice ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                    <button class="btn-add-cart" data-id="${product.id}" onclick="addToCart(event)">
                        <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;
        
        productGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
};

// Cart Logic
let cartCount = 0;

const addToCart = (event) => {
    // Increment cart count
    cartCount++;
    
    // Update DOM
    const countElement = document.querySelector('.cart-count');
    countElement.textContent = cartCount;
    
    // Add bump animation
    countElement.classList.add('bump');
    setTimeout(() => {
        countElement.classList.remove('bump');
    }, 300);
    
    // Show Toast Notification
    showToast('Đã thêm vào giỏ hàng thành công!');
    
    // Change button temporarily
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã thêm';
    btn.style.backgroundColor = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    btn.style.color = '#fff';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style = '';
    }, 2000);
};

// Toast Notification System
const showToast = (message) => {
    let toastContainer = document.getElementById('toastContainer');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <p>${message}</p>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 400); // Wait for transition out
    }, 3000);
};

// Render Product Detail Page
const renderProductDetail = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const titleEl = document.querySelector('.product-info-detail h1');
    if (!titleEl) return;
    
    document.title = `${product.name} - TechShop`;
    
    const breadcrumbSpan = document.querySelector('.breadcrumb span');
    if (breadcrumbSpan) breadcrumbSpan.textContent = product.name;
    
    titleEl.textContent = product.name;
    
    const mainImg = document.querySelector('.main-image img');
    if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.name;
    }
    
    const thumbs = document.querySelectorAll('.thumbnail img');
    thumbs.forEach(img => {
        img.src = product.image;
        img.alt = product.name;
    });
    
    const currentPriceEl = document.querySelector('.product-price-large');
    if (currentPriceEl) currentPriceEl.textContent = formatCurrency(product.salePrice);
    
    const originalPriceEl = document.querySelector('.product-price-wrapper .original-price');
    if (originalPriceEl) {
        if (product.originalPrice > product.salePrice) {
            originalPriceEl.textContent = formatCurrency(product.originalPrice);
            originalPriceEl.style.display = 'block';
        } else {
            originalPriceEl.style.display = 'none';
        }
    }
};

// ================= Auth Logic =================
const initAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const isProfilePage = currentPath.endsWith('profile.html');
    const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('register.html');
    
    // 1. Dynamic Header Navigation
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'login.html' || href === 'profile.html') {
            if (isLoggedIn) {
                link.setAttribute('href', 'profile.html');
                link.innerHTML = 'Tài khoản';
                if (isProfilePage) link.classList.add('active');
            } else {
                link.setAttribute('href', 'login.html');
                link.innerHTML = 'Đăng nhập';
                if (isLoginPage) link.classList.add('active');
            }
        }
    });
    
    // 2. Route Protection
    if (isProfilePage && !isLoggedIn) {
        window.location.replace('login.html');
    }
    if (isLoginPage && isLoggedIn) {
        window.location.replace('index.html');
    }
    
    // 3. Login Action
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            showToast('Đăng nhập thành công! Đang chuyển hướng...');
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        });
    }
    
    // 4. Register Action
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            showToast('Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        });
    }
    
    // 5. Logout Action
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'index.html';
        });
    }
};

// ================= Category Filtering Logic =================
const initCategoryFilter = () => {
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length === 0) return;

    // 1. Handle Click on Category Items
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            
            // UI Active State
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Filter & Render
            renderProducts(category);
            
            // Scroll to products if needed
            const productSec = document.getElementById('products');
            if (productSec) {
                const offset = 100;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = productSec.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Handle Category from URL (for footer links or external)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetItem = document.querySelector(`.category-item[data-category="${catParam}"]`);
        if (targetItem) {
            targetItem.click();
        } else {
            renderProducts(catParam);
        }
    }
};

// ================= Back to Top Logic =================
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ================= Search Logic =================
const initSearch = () => {
    const searchInputs = document.querySelectorAll('.search-bar input');
    const searchBtns = document.querySelectorAll('.search-bar button');

    const handleSearch = (input) => {
        const query = input.value.trim();
        if (!query) return;

        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        
        if (isHomePage) {
            renderProducts('all', query);
            // Optional: Scroll to products
            const prodSec = document.getElementById('products');
            if (prodSec) prodSec.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = `index.html?q=${encodeURIComponent(query)}#products`;
        }
    };

    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch(input);
        });
    });

    searchBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleSearch(searchInputs[index]);
        });
    });

    // Handle initial search from URL
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) searchInput.value = qParam;
        
        renderProducts('all', qParam);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    renderProducts();
    initCategoryFilter();
    renderProductDetail();
    initBackToTop();
    initSearch();
    
    // Mobile menu toggle (simple version)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            if (navMenu.style.display === 'block') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'block';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#fff';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = 'var(--shadow-md)';
                navMenu.style.zIndex = '99';
            }
        });
    }
});
