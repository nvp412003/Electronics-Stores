// ====== Admin Data & Mock Data ======
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

const adminCoupons = [
    { id: 1, code: "SALE20", description: "Giảm 20% cho tất cả sản phẩm", type: "percent", value: 20, minOrder: 500000, maxUse: 100, used: 45, expiry: "2026-05-30", status: "active" },
    { id: 2, code: "FREESHIP", description: "Miễn phí vận chuyển", type: "freeship", value: 0, minOrder: 300000, maxUse: 200, used: 132, expiry: "2026-06-15", status: "active" },
    { id: 3, code: "NEWMEMBER", description: "Giảm 100K cho thành viên mới", type: "fixed", value: 100000, minOrder: 1000000, maxUse: 500, used: 287, expiry: "2026-12-31", status: "active" },
    { id: 4, code: "SUMMER50", description: "Giảm 50% tối đa 500K", type: "percent", value: 50, minOrder: 2000000, maxUse: 50, used: 50, expiry: "2026-03-01", status: "expired" },
    { id: 5, code: "VIP30", description: "Ưu đãi VIP giảm 30%", type: "percent", value: 30, minOrder: 5000000, maxUse: 30, used: 12, expiry: "2026-08-01", status: "active" },
    { id: 6, code: "TET2026", description: "Khuyến mãi Tết 2026", type: "fixed", value: 200000, minOrder: 1500000, maxUse: 1000, used: 980, expiry: "2026-02-15", status: "disabled" },
];

const adminReviews = [
    { id: 1, customer: "Nguyễn Văn A", product: "iPhone 15 Pro Max 256GB", rating: 5, text: "Sản phẩm rất tốt, giao hàng nhanh. Camera chụp rất đẹp, pin trâu.", date: "18/04/2026", status: "approved" },
    { id: 2, customer: "Trần Thị B", product: "MacBook Pro 14 M3 Pro", rating: 4, text: "Máy mạnh, màn hình đẹp. Chỉ hơi nóng khi chạy nặng.", date: "17/04/2026", status: "approved" },
    { id: 3, customer: "Phạm Văn C", product: "Samsung Galaxy S24 Ultra", rating: 5, text: "Điện thoại xịn, S-Pen rất tiện. Rất hài lòng!", date: "17/04/2026", status: "pending" },
    { id: 4, customer: "Lê Thị D", product: "Apple Watch Series 9", rating: 3, text: "Sản phẩm OK, nhưng pin hơi yếu. Dùng được khoảng 1 ngày.", date: "16/04/2026", status: "pending" },
    { id: 5, customer: "Hoàng Văn E", product: "Sony WH-1000XM5", rating: 5, text: "Chất âm tuyệt vời, chống ồn cực tốt!", date: "15/04/2026", status: "pending" },
    { id: 6, customer: "Nguyễn Thị F", product: "Dell XPS 15 Oled", rating: 4, text: "Màn hình OLED rất đẹp, hiệu năng tốt cho công việc.", date: "14/04/2026", status: "approved" },
    { id: 7, customer: "Trần Văn G", product: "Galaxy Watch 6 Classic", rating: 2, text: "Đồng hồ đẹp nhưng app kết nối hay bị lỗi.", date: "13/04/2026", status: "pending" },
    { id: 8, customer: "Phạm Thị H", product: "iPad Pro M4 13 inch", rating: 5, text: "Màn hình siêu sáng, chip M4 nhanh khó tin. Rất đáng mua!", date: "12/04/2026", status: "pending" },
    { id: 9, customer: "Lê Văn I", product: "AirPods Pro gen 2", rating: 4, text: "Chống ồn tốt, kết nối nhanh với iPhone.", date: "11/04/2026", status: "approved" },
    { id: 10, customer: "Hoàng Thị K", product: "Marshall Major IV", rating: 1, text: "Hàng kém chất lượng, âm thanh rè.", date: "10/04/2026", status: "rejected" },
];

const adminUsers = [
    { id: 1, name: "Nguyễn Admin", email: "admin@techshop.vn", phone: "0912000001", role: "superadmin", status: "active", lastLogin: "20/04/2026 14:30", permissions: ["products","orders","customers","coupons","reviews","reports","settings","users"] },
    { id: 2, name: "Trần Minh Quản", email: "quan@techshop.vn", phone: "0912000002", role: "admin", status: "active", lastLogin: "20/04/2026 10:15", permissions: ["products","orders","customers","coupons","reviews","reports"] },
    { id: 3, name: "Lê Thị Biên Tập", email: "bientap@techshop.vn", phone: "0912000003", role: "editor", status: "active", lastLogin: "19/04/2026 16:45", permissions: ["products","reviews"] },
    { id: 4, name: "Phạm Hỗ Trợ", email: "support@techshop.vn", phone: "0912000004", role: "support", status: "inactive", lastLogin: "15/04/2026 09:00", permissions: ["orders","customers"] },
];

const adminNotifications = [
    { id: 1, type: "order", icon: "fa-receipt", iconBg: "rgba(59,130,246,0.1)", iconColor: "#3b82f6", text: "Đơn hàng mới <b>#TS90120</b> từ Lê Thị D", time: "5 phút trước", unread: true },
    { id: 2, type: "review", icon: "fa-star", iconBg: "rgba(245,158,11,0.1)", iconColor: "#f59e0b", text: "<b>5 đánh giá</b> mới đang chờ duyệt", time: "30 phút trước", unread: true },
    { id: 3, type: "product", icon: "fa-box", iconBg: "rgba(239,68,68,0.1)", iconColor: "#ef4444", text: "Sản phẩm <b>Sony WH-1000XM5</b> đã hết hàng", time: "1 giờ trước", unread: true },
    { id: 4, type: "order", icon: "fa-truck", iconBg: "rgba(34,197,94,0.1)", iconColor: "#22c55e", text: "Đơn hàng <b>#TS90123</b> đã giao thành công", time: "2 giờ trước", unread: true },
    { id: 5, type: "system", icon: "fa-shield", iconBg: "rgba(139,92,246,0.1)", iconColor: "#8b5cf6", text: "Bản cập nhật hệ thống <b>v2.1.0</b> khả dụng", time: "5 giờ trước", unread: false },
];

const activityLogs = [
    { id: 1, type: "order", icon: "fa-receipt", iconBg: "rgba(59,130,246,0.1)", iconColor: "#3b82f6", text: "<b>Admin</b> đã xác nhận đơn hàng <b>#TS90121</b>", time: "14:30", date: "20/04/2026", user: "Admin" },
    { id: 2, type: "product", icon: "fa-box", iconBg: "rgba(34,197,94,0.1)", iconColor: "#22c55e", text: "<b>Trần Minh Quản</b> đã thêm sản phẩm mới <b>iPad Pro M4</b>", time: "13:15", date: "20/04/2026", user: "Trần Minh Quản" },
    { id: 3, type: "coupon", icon: "fa-ticket", iconBg: "rgba(245,158,11,0.1)", iconColor: "#f59e0b", text: "<b>Admin</b> đã tạo mã giảm giá <b>VIP30</b>", time: "11:00", date: "20/04/2026", user: "Admin" },
    { id: 4, type: "review", icon: "fa-star", iconBg: "rgba(245,158,11,0.1)", iconColor: "#f59e0b", text: "<b>Lê Thị Biên Tập</b> đã phê duyệt 3 đánh giá", time: "10:30", date: "20/04/2026", user: "Lê Thị Biên Tập" },
    { id: 5, type: "user", icon: "fa-user-shield", iconBg: "rgba(139,92,246,0.1)", iconColor: "#8b5cf6", text: "<b>Admin</b> đã tạm khóa tài khoản <b>Phạm Hỗ Trợ</b>", time: "09:00", date: "19/04/2026", user: "Admin" },
    { id: 6, type: "order", icon: "fa-truck", iconBg: "rgba(34,197,94,0.1)", iconColor: "#22c55e", text: "<b>Trần Minh Quản</b> đã cập nhật trạng thái đơn <b>#TS90122</b> → Đang giao", time: "16:00", date: "18/04/2026", user: "Trần Minh Quản" },
    { id: 7, type: "product", icon: "fa-pen", iconBg: "rgba(59,130,246,0.1)", iconColor: "#3b82f6", text: "<b>Lê Thị Biên Tập</b> đã chỉnh sửa giá sản phẩm <b>MacBook Pro 14</b>", time: "14:20", date: "18/04/2026", user: "Lê Thị Biên Tập" },
    { id: 8, type: "system", icon: "fa-database", iconBg: "rgba(139,92,246,0.1)", iconColor: "#8b5cf6", text: "Hệ thống đã sao lưu dữ liệu tự động", time: "03:00", date: "18/04/2026", user: "System" },
    { id: 9, type: "order", icon: "fa-xmark", iconBg: "rgba(239,68,68,0.1)", iconColor: "#ef4444", text: "<b>Admin</b> đã hủy đơn hàng <b>#TS90119</b>", time: "15:30", date: "17/04/2026", user: "Admin" },
    { id: 10, type: "product", icon: "fa-plus", iconBg: "rgba(34,197,94,0.1)", iconColor: "#22c55e", text: "<b>Trần Minh Quản</b> đã thêm 3 sản phẩm mới vào danh mục Laptop", time: "10:00", date: "17/04/2026", user: "Trần Minh Quản" },
];
