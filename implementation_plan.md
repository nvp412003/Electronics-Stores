# Trang Quản Trị Admin - TechShop

Xây dựng trang quản trị admin đầy đủ chức năng cho cửa hàng điện tử TechShop, sử dụng cùng design system hiện tại (CSS variables, Inter font, FontAwesome icons).

## User Review Required

> [!IMPORTANT]
> Trang admin sẽ được tạo dưới dạng 1 file HTML + 1 file CSS + 1 file JS riêng biệt, sử dụng **localStorage** để mock dữ liệu (không cần backend). Bảo vệ route admin bằng kiểm tra `isAdmin` trong localStorage.

> [!WARNING]
> Trang admin sẽ có layout hoàn toàn khác so với trang shop (dùng sidebar layout thay vì header-based navigation). CSS riêng để không ảnh hưởng tới các trang hiện tại.

## Proposed Changes

### Tổng quan chức năng Admin Dashboard

| Module | Chức năng |
|--------|-----------|
| **Dashboard** | Thống kê tổng quan (doanh thu, đơn hàng, khách hàng, sản phẩm), biểu đồ doanh thu |
| **Quản lý sản phẩm** | Xem danh sách, thêm/sửa/xóa sản phẩm, tìm kiếm & lọc |
| **Quản lý đơn hàng** | Danh sách đơn hàng, chi tiết, cập nhật trạng thái |
| **Quản lý khách hàng** | Danh sách khách hàng, xem thông tin chi tiết |
| **Cài đặt** | Thông tin cửa hàng, cài đặt chung |

---

### Files mới

#### [NEW] [admin.html](file:///p:/Projects/Antigravity/Electronics-Stores/admin.html)
- Layout sidebar + main content area
- Sidebar: Logo, navigation menu (Dashboard, Sản phẩm, Đơn hàng, Khách hàng, Cài đặt), nút đăng xuất
- Header bar: Search, thông báo, avatar admin
- Nội dung chính cho từng section (chuyển tab bằng JS, không reload trang)
- Responsive: sidebar collapse trên mobile

#### [NEW] [admin.css](file:///p:/Projects/Antigravity/Electronics-Stores/admin.css)
- Sidebar layout styles (fixed sidebar + scrollable content)
- Dashboard cards & charts styling
- Data table styles (responsive)
- Modal/dialog styles (thêm/sửa sản phẩm)
- Status badges cho đơn hàng
- Sử dụng chung CSS variables từ `style.css` (:root, dark mode)
- Premium glassmorphism effects, smooth transitions

#### [NEW] [admin.js](file:///p:/Projects/Antigravity/Electronics-Stores/admin.js)
- Mock data management (products, orders, customers)
- Tab switching logic
- CRUD operations cho sản phẩm (modal form)
- Đơn hàng: hiển thị, cập nhật trạng thái
- Dashboard: render stats cards + biểu đồ (sử dụng Chart.js CDN)
- Tìm kiếm, lọc, sắp xếp dữ liệu
- Route protection (kiểm tra admin role)

---

### Design & UX

```
┌──────────┬──────────────────────────────────────┐
│          │  Header (search, notifications, user)│
│ Sidebar  ├──────────────────────────────────────┤
│          │                                      │
│ • Dash   │         Main Content Area            │
│ • Prods  │                                      │
│ • Orders │  (Dashboard / Products / Orders /     │
│ • Users  │   Customers / Settings)              │
│ • Config │                                      │
│          │                                      │
│ [Logout] │                                      │
└──────────┴──────────────────────────────────────┘
```

**Màu sắc chủ đạo:**
- Sidebar: gradient tối (#0f172a → #1e293b)  
- Accent: `var(--primary-color)` (#0066FF)
- Stat cards: mỗi card một gradient riêng (blue, green, orange, purple)
- Hỗ trợ dark mode đầy đủ

**Biểu đồ:**
- Chart.js CDN cho biểu đồ doanh thu hàng tháng (Line chart)
- Biểu đồ doanh thu theo danh mục (Doughnut chart)

---

### Không thay đổi

Các file hiện tại (`index.html`, `style.css`, `pages.css`, `script.js`, v.v.) sẽ **không bị sửa đổi**.

## Open Questions

> [!IMPORTANT]
> 1. Bạn có muốn thêm link đến trang admin trong navigation menu của trang chính không? (ví dụ: hiển thị cho admin user)
> 2. Có cần thêm chức năng "quản lý banner" hoặc "quản lý khuyến mãi" không?

## Verification Plan

### Manual Verification
- Mở `admin.html` trên trình duyệt để kiểm tra:
  - Layout hiển thị đúng, responsive
  - Chuyển tab hoạt động mượt mà
  - CRUD sản phẩm hoạt động (thêm/sửa/xóa)
  - Biểu đồ render đúng
  - Dark mode toggle hoạt động
  - Tìm kiếm và lọc dữ liệu
