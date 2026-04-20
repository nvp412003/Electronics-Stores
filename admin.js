// ====== Admin Dashboard - TechShop ======
// ====== Utility Functions ======
const formatVND = (v) => new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(v);
const getCategoryLabel = (c) => ({laptop:'Laptop',phone:'Điện thoại',watch:'Đồng hồ',audio:'Âm thanh'}[c]||c);
const getCategoryImage = (c) => ({laptop:'assets/images/laptop.png',phone:'assets/images/phone.png',watch:'assets/images/watch.png',audio:'assets/images/audio.png'}[c]||'assets/images/laptop.png');
const getStatusLabel = (s) => ({pending:'Chờ xác nhận',confirmed:'Đã xác nhận',shipping:'Đang giao',delivered:'Đã giao',cancelled:'Đã hủy'}[s]||s);
const getStatusClass = (s) => ({pending:'status-pending',confirmed:'status-shipping',shipping:'status-shipping',delivered:'status-success',cancelled:'status-cancelled'}[s]||'');
const getStatusIcon = (s) => ({pending:'fa-clock',confirmed:'fa-circle-check',shipping:'fa-truck',delivered:'fa-check-double',cancelled:'fa-xmark'}[s]||'fa-circle');
const getStockStatus = (s) => s===0?{label:'Hết hàng',class:'status-out-stock'}:s<=10?{label:`Còn ${s}`,class:'status-low-stock'}:{label:`Còn ${s}`,class:'status-in-stock'};
const getTierClass = (t) => ({'Kim Cương':'status-shipping','Vàng':'status-pending','Bạc':'status-success','Đồng':'status-cancelled'}[t]||'');
const getRoleLabel = (r) => ({superadmin:'Super Admin',admin:'Admin',editor:'Biên tập viên',support:'Hỗ trợ KH'}[r]||r);
const getRoleColors = (r) => ({superadmin:['#8b5cf6','#7c3aed'],admin:['#3b82f6','#2563eb'],editor:['#22c55e','#16a34a'],support:['#f59e0b','#d97706']}[r]||['#64748b','#475569']);
const getCouponTypeLabel = (t) => ({percent:'Phần trăm',fixed:'Cố định',freeship:'Free Ship'}[t]||t);

const showAdminToast = (message, type='success') => {
    let c = document.getElementById('toastContainer');
    if(!c){c=document.createElement('div');c.id='toastContainer';c.className='toast-container';document.body.appendChild(c);}
    const t = document.createElement('div'); t.className = 'toast';
    const icon = type==='error'?'fa-circle-xmark':type==='warning'?'fa-triangle-exclamation':'fa-circle-check';
    t.innerHTML = `<i class="fa-solid ${icon}"></i><p>${message}</p>`;
    c.appendChild(t);
    setTimeout(()=>t.classList.add('show'),10);
    setTimeout(()=>{t.classList.remove('show');setTimeout(()=>c.removeChild(t),400);},3000);
};

// ====== Page Navigation ======
const switchAdminPage = (pageName) => {
    document.querySelectorAll('.admin-page').forEach(p=>p.classList.remove('active'));
    const target = document.getElementById(`page-${pageName}`);
    if(target) target.classList.add('active');
    document.querySelectorAll('.sidebar-nav a').forEach(a=>a.classList.remove('active'));
    const navLink = document.querySelector(`[data-page="${pageName}"]`);
    if(navLink) navLink.classList.add('active');
    document.getElementById('adminSidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
};

// ====== Dashboard ======
const renderStats = () => {
    const totalRevenue = adminOrders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+o.total,0);
    const stats = [
        {icon:'fa-solid fa-dollar-sign',value:formatVND(totalRevenue),label:'Tổng doanh thu',trend:'+12.5%',dir:'up'},
        {icon:'fa-solid fa-shopping-bag',value:adminOrders.length,label:'Đơn hàng',trend:'+8.2%',dir:'up'},
        {icon:'fa-solid fa-users',value:adminCustomers.length,label:'Khách hàng',trend:'+5.1%',dir:'up'},
        {icon:'fa-solid fa-box',value:adminProducts.length,label:'Sản phẩm',trend:'0%',dir:'up'},
    ];
    const grid = document.getElementById('statsGrid');
    if(!grid) return;
    grid.innerHTML = stats.map(s=>`<div class="stat-card"><div class="stat-card-header"><div class="stat-icon"><i class="${s.icon}"></i></div><span class="stat-trend ${s.dir}"><i class="fa-solid fa-arrow-${s.dir==='up'?'up':'down'}"></i> ${s.trend}</span></div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');
};

const renderRecentOrders = () => {
    const tbody = document.getElementById('recentOrdersBody');
    if(!tbody) return;
    tbody.innerHTML = adminOrders.slice(0,5).map(o=>`<tr><td><b style="color:var(--primary-color)">#${o.id}</b></td><td>${o.customer}</td><td><b>${formatVND(o.total)}</b></td><td><span class="status-badge ${getStatusClass(o.status)}"><i class="fa-solid ${getStatusIcon(o.status)}"></i> ${getStatusLabel(o.status)}</span></td><td style="color:var(--text-muted)">${o.date}</td></tr>`).join('');
};

// ====== Charts ======
let revenueChartInstance=null, categoryChartInstance=null;
const renderCharts = ()=>{renderRevenueChart();renderCategoryChart();};
const renderRevenueChart = (months=6) => {
    const ctx=document.getElementById('revenueChart'); if(!ctx) return;
    if(revenueChartInstance) revenueChartInstance.destroy();
    const allL=['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
    const allD=[180,220,195,310,280,350,290,420,380,450,510,480];
    const isDark=document.documentElement.getAttribute('data-theme')==='dark';
    revenueChartInstance = new Chart(ctx,{type:'line',data:{labels:allL.slice(0,months),datasets:[{label:'Doanh thu (triệu VND)',data:allD.slice(0,months),borderColor:'#3b82f6',backgroundColor:(c)=>{const g=c.chart.ctx.createLinearGradient(0,0,0,280);g.addColorStop(0,'rgba(59,130,246,0.15)');g.addColorStop(1,'rgba(59,130,246,0.01)');return g;},fill:true,tension:0.4,borderWidth:2.5,pointRadius:4,pointBackgroundColor:'#3b82f6',pointBorderColor:'#fff',pointBorderWidth:2,pointHoverRadius:7}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:isDark?'#1e293b':'#fff',titleColor:isDark?'#e2e8f0':'#1a1a1a',bodyColor:isDark?'#94a3b8':'#64748b',borderColor:isDark?'#334155':'#e5e7eb',borderWidth:1,padding:12,displayColors:false,callbacks:{label:(c)=>`${c.parsed.y} triệu VND`}}},scales:{x:{grid:{display:false},ticks:{color:isDark?'#94a3b8':'#64748b',font:{family:'Inter',size:12}}},y:{grid:{color:isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)'},ticks:{color:isDark?'#94a3b8':'#64748b',font:{family:'Inter',size:12},callback:v=>v+'tr'},border:{display:false}}}}});
};
const renderCategoryChart = () => {
    const ctx=document.getElementById('categoryChart'); if(!ctx) return;
    if(categoryChartInstance) categoryChartInstance.destroy();
    const cc={}; adminProducts.forEach(p=>{cc[p.category]=(cc[p.category]||0)+1;});
    const isDark=document.documentElement.getAttribute('data-theme')==='dark';
    categoryChartInstance = new Chart(ctx,{type:'doughnut',data:{labels:Object.keys(cc).map(getCategoryLabel),datasets:[{data:Object.values(cc),backgroundColor:['#3b82f6','#22c55e','#f59e0b','#8b5cf6'],borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{position:'bottom',labels:{padding:20,usePointStyle:true,pointStyleWidth:10,color:isDark?'#94a3b8':'#64748b',font:{family:'Inter',size:12}}}}}});
};
document.querySelectorAll('.chart-period button').forEach(btn=>{btn.addEventListener('click',function(){this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('active'));this.classList.add('active');renderRevenueChart(this.dataset.period==='6m'?6:12);});});

// ====== Products Table ======
const renderProductsTable = (sq='',cf='all') => {
    const tbody=document.getElementById('productsBody'); if(!tbody) return;
    let f=[...adminProducts];
    if(cf!=='all') f=f.filter(p=>p.category===cf);
    if(sq){const q=sq.toLowerCase();f=f.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));}
    if(!f.length){tbody.innerHTML=`<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-box-open"></i><h4>Không tìm thấy sản phẩm</h4></div></td></tr>`;document.getElementById('productsInfo').textContent='0 sản phẩm';return;}
    tbody.innerHTML=f.map(p=>{const si=getStockStatus(p.stock);return `<tr><td><span style="color:var(--text-muted)">#${p.id}</span></td><td><div class="table-product-info"><div class="table-product-img"><img src="${p.image}" alt="${p.name}"></div><div><div class="table-product-name">${p.name}</div><div class="table-product-cat">${getCategoryLabel(p.category)}</div></div></div></td><td><span class="status-badge ${getStatusClass('confirmed')}">${getCategoryLabel(p.category)}</span></td><td><b style="color:var(--primary-color)">${formatVND(p.salePrice)}</b></td><td style="color:var(--text-muted);text-decoration:line-through">${formatVND(p.originalPrice)}</td><td><span class="status-badge ${si.class}">${si.label}</span></td><td><div class="table-actions"><button class="btn-edit" title="Chỉnh sửa" onclick="openEditProduct(${p.id})"><i class="fa-solid fa-pen"></i></button><button class="btn-delete" title="Xóa" onclick="confirmDeleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button></div></td></tr>`;}).join('');
    document.getElementById('productsInfo').textContent=`Hiển thị ${f.length} sản phẩm`;
};

// ====== Product CRUD ======
const openAddProduct = () => {document.getElementById('productModalTitle').textContent='Thêm sản phẩm mới';document.getElementById('productForm').reset();document.getElementById('productEditId').value='';document.getElementById('productModal').classList.add('show');};
const openEditProduct = (id) => {
    const p=adminProducts.find(x=>x.id===id); if(!p) return;
    document.getElementById('productModalTitle').textContent='Chỉnh sửa sản phẩm';
    document.getElementById('productEditId').value=id;
    document.getElementById('productName').value=p.name;
    document.getElementById('productCategory').value=p.category;
    document.getElementById('productStock').value=p.stock;
    document.getElementById('productSalePrice').value=p.salePrice;
    document.getElementById('productOriginalPrice').value=p.originalPrice;
    document.getElementById('productBadge').value=p.badge||'';
    document.getElementById('productBadgeType').value=p.badgeType||'sale';
    document.getElementById('productImage').value=p.image||'';
    document.getElementById('productModal').classList.add('show');
};
const saveProduct = () => {
    const name=document.getElementById('productName').value.trim(),category=document.getElementById('productCategory').value,stock=parseInt(document.getElementById('productStock').value)||0,salePrice=parseInt(document.getElementById('productSalePrice').value)||0,originalPrice=parseInt(document.getElementById('productOriginalPrice').value)||salePrice,badge=document.getElementById('productBadge').value.trim(),badgeType=document.getElementById('productBadgeType').value,image=document.getElementById('productImage').value.trim()||getCategoryImage(category),editId=document.getElementById('productEditId').value;
    if(!name||!category||!salePrice){showAdminToast('Vui lòng điền đầy đủ thông tin!','warning');return;}
    if(editId){const i=adminProducts.findIndex(p=>p.id===parseInt(editId));if(i>-1){adminProducts[i]={...adminProducts[i],name,category,stock,salePrice,originalPrice,badge,badgeType,image};showAdminToast('Cập nhật sản phẩm thành công!');}}
    else{adminProducts.push({id:Math.max(...adminProducts.map(p=>p.id))+1,name,category,stock,salePrice,originalPrice,badge,badgeType,image});showAdminToast('Thêm sản phẩm thành công!');}
    closeModal('productModal');renderProductsTable(document.getElementById('searchProduct')?.value||'',document.getElementById('filterCategory')?.value||'all');renderStats();
};
let deleteTargetId=null, deleteType=null;
const confirmDeleteProduct = (id) => {const p=adminProducts.find(x=>x.id===id);if(!p)return;deleteTargetId=id;deleteType='product';document.getElementById('deleteMessage').textContent=`Sản phẩm "${p.name}" sẽ bị xóa vĩnh viễn.`;document.getElementById('deleteModal').classList.add('show');};
const executeDelete = () => {
    if(deleteType==='product'&&deleteTargetId){const i=adminProducts.findIndex(p=>p.id===deleteTargetId);if(i>-1){adminProducts.splice(i,1);showAdminToast('Đã xóa sản phẩm!');renderProductsTable(document.getElementById('searchProduct')?.value||'',document.getElementById('filterCategory')?.value||'all');renderStats();}}
    if(deleteType==='coupon'&&deleteTargetId){const i=adminCoupons.findIndex(c=>c.id===deleteTargetId);if(i>-1){adminCoupons.splice(i,1);showAdminToast('Đã xóa mã giảm giá!');renderCouponsTable();renderCouponStats();}}
    if(deleteType==='user'&&deleteTargetId){const i=adminUsers.findIndex(u=>u.id===deleteTargetId);if(i>-1){adminUsers.splice(i,1);showAdminToast('Đã xóa quản trị viên!');renderAdminUsers();}}
    closeModal('deleteModal');deleteTargetId=null;deleteType=null;
};

// ====== Orders ======
const renderOrderStats = () => {
    const el=document.getElementById('orderStatsGrid'); if(!el) return;
    const pending=adminOrders.filter(o=>o.status==='pending').length,shipping=adminOrders.filter(o=>o.status==='shipping').length,delivered=adminOrders.filter(o=>o.status==='delivered').length,cancelled=adminOrders.filter(o=>o.status==='cancelled').length;
    el.innerHTML=[
        {icon:'fa-clock',bg:'rgba(245,158,11,0.1)',color:'#f59e0b',val:pending,label:'Chờ xác nhận'},
        {icon:'fa-truck',bg:'rgba(59,130,246,0.1)',color:'#3b82f6',val:shipping,label:'Đang giao'},
        {icon:'fa-check-double',bg:'rgba(34,197,94,0.1)',color:'#22c55e',val:delivered,label:'Đã giao'},
        {icon:'fa-xmark',bg:'rgba(239,68,68,0.1)',color:'#ef4444',val:cancelled,label:'Đã hủy'}
    ].map(s=>`<div class="mini-stat-card"><div class="mini-stat-icon" style="background:${s.bg};color:${s.color}"><i class="fa-solid ${s.icon}"></i></div><div class="mini-stat-info"><h4>${s.val}</h4><p>${s.label}</p></div></div>`).join('');
};
const renderOrdersTable = (sq='',sf='all') => {
    const tbody=document.getElementById('ordersBody'); if(!tbody) return;
    let f=[...adminOrders];
    if(sf!=='all') f=f.filter(o=>o.status===sf);
    if(sq){const q=sq.toLowerCase();f=f.filter(o=>o.id.toLowerCase().includes(q)||o.customer.toLowerCase().includes(q));}
    if(!f.length){tbody.innerHTML=`<tr><td colspan="7"><div class="empty-state"><i class="fa-solid fa-receipt"></i><h4>Không tìm thấy đơn hàng</h4></div></td></tr>`;document.getElementById('ordersInfo').textContent='0 đơn hàng';return;}
    tbody.innerHTML=f.map(o=>`<tr><td><b style="color:var(--primary-color)">#${o.id}</b></td><td><div class="customer-info-cell"><div class="customer-avatar-sm">${o.customer.charAt(o.customer.lastIndexOf(' ')+1)}</div><div><div class="customer-name">${o.customer}</div><div class="customer-email">${o.email}</div></div></div></td><td>${o.products.length} sản phẩm</td><td><b>${formatVND(o.total)}</b></td><td><select class="status-select" onchange="updateOrderStatus('${o.id}',this.value)"><option value="pending" ${o.status==='pending'?'selected':''}>Chờ xác nhận</option><option value="confirmed" ${o.status==='confirmed'?'selected':''}>Đã xác nhận</option><option value="shipping" ${o.status==='shipping'?'selected':''}>Đang giao</option><option value="delivered" ${o.status==='delivered'?'selected':''}>Đã giao</option><option value="cancelled" ${o.status==='cancelled'?'selected':''}>Đã hủy</option></select></td><td style="color:var(--text-muted)">${o.date}</td><td><div class="table-actions"><button title="Xem chi tiết" onclick="viewOrderDetail('${o.id}')"><i class="fa-solid fa-eye"></i></button></div></td></tr>`).join('');
    document.getElementById('ordersInfo').textContent=`Hiển thị ${f.length} đơn hàng`;
};
const updateOrderStatus = (id,s) => {const o=adminOrders.find(x=>x.id===id);if(o){o.status=s;showAdminToast(`Đơn #${id}: ${getStatusLabel(s)}`);renderRecentOrders();renderOrderStats();const pc=adminOrders.filter(x=>x.status==='pending'||x.status==='confirmed').length;const b=document.querySelector('#nav-orders .nav-badge');if(b)b.textContent=pc;}};
const viewOrderDetail = (id) => {
    const o=adminOrders.find(x=>x.id===id); if(!o) return;
    document.getElementById('orderDetailTitle').textContent=`Chi tiết đơn hàng #${o.id}`;
    document.getElementById('orderDetailBody').innerHTML=`<div class="order-detail-row"><span class="order-detail-label">Khách hàng</span><span class="order-detail-value">${o.customer}</span></div><div class="order-detail-row"><span class="order-detail-label">Email</span><span class="order-detail-value">${o.email}</span></div><div class="order-detail-row"><span class="order-detail-label">Số điện thoại</span><span class="order-detail-value">${o.phone}</span></div><div class="order-detail-row"><span class="order-detail-label">Địa chỉ</span><span class="order-detail-value">${o.address}</span></div><div class="order-detail-row"><span class="order-detail-label">Ngày đặt</span><span class="order-detail-value">${o.date}</span></div><div class="order-detail-row"><span class="order-detail-label">Trạng thái</span><span class="order-detail-value"><span class="status-badge ${getStatusClass(o.status)}"><i class="fa-solid ${getStatusIcon(o.status)}"></i> ${getStatusLabel(o.status)}</span></span></div><div class="order-products-list"><h4 style="margin-bottom:12px;font-size:14px">Sản phẩm đặt mua:</h4>${o.products.map(p=>`<div class="order-product-item"><img src="${p.image}" alt="${p.name}"><div style="flex:1"><div style="font-weight:600;font-size:13px">${p.name}</div><div style="font-size:12px;color:var(--text-muted)">x${p.qty}</div></div><div style="font-weight:600;font-size:13px">${formatVND(p.price*p.qty)}</div></div>`).join('')}</div><div class="order-detail-row" style="margin-top:16px;padding-top:16px;border-top:2px solid var(--border-color)"><span class="order-detail-label" style="font-size:16px;font-weight:700">Tổng cộng</span><span class="order-detail-value" style="font-size:18px;color:var(--primary-color)">${formatVND(o.total)}</span></div>`;
    document.getElementById('orderDetailModal').classList.add('show');
};

// ====== Customers ======
const renderCustomerStats = () => {
    const el=document.getElementById('customerStatsGrid'); if(!el) return;
    const tiers={};adminCustomers.forEach(c=>{tiers[c.tier]=(tiers[c.tier]||0)+1;});
    el.innerHTML=[
        {icon:'fa-users',bg:'rgba(59,130,246,0.1)',color:'#3b82f6',val:adminCustomers.length,label:'Tổng khách hàng'},
        {icon:'fa-gem',bg:'rgba(139,92,246,0.1)',color:'#8b5cf6',val:tiers['Kim Cương']||0,label:'Kim Cương'},
        {icon:'fa-crown',bg:'rgba(245,158,11,0.1)',color:'#f59e0b',val:tiers['Vàng']||0,label:'Vàng'},
        {icon:'fa-medal',bg:'rgba(148,163,184,0.1)',color:'#94a3b8',val:(tiers['Bạc']||0)+(tiers['Đồng']||0),label:'Bạc & Đồng'}
    ].map(s=>`<div class="mini-stat-card"><div class="mini-stat-icon" style="background:${s.bg};color:${s.color}"><i class="fa-solid ${s.icon}"></i></div><div class="mini-stat-info"><h4>${s.val}</h4><p>${s.label}</p></div></div>`).join('');
};
const renderCustomersTable = (sq='',tf='all') => {
    const tbody=document.getElementById('customersBody'); if(!tbody) return;
    let f=[...adminCustomers]; if(tf!=='all') f=f.filter(c=>c.tier===tf);
    if(sq){const q=sq.toLowerCase();f=f.filter(c=>c.name.toLowerCase().includes(q)||c.email.toLowerCase().includes(q)||c.phone.includes(q));}
    if(!f.length){tbody.innerHTML=`<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-users"></i><h4>Không tìm thấy</h4></div></td></tr>`;document.getElementById('customersInfo').textContent='0';return;}
    tbody.innerHTML=f.map(c=>`<tr><td><span style="color:var(--text-muted)">#${c.id}</span></td><td><div class="customer-info-cell"><div class="customer-avatar-sm">${c.name.charAt(c.name.lastIndexOf(' ')+1)}</div><div><div class="customer-name">${c.name}</div><div class="customer-email">${c.email}</div></div></div></td><td>${c.phone}</td><td><b>${c.orders}</b> đơn</td><td><b style="color:var(--primary-color)">${formatVND(c.spent)}</b></td><td><span class="status-badge ${getTierClass(c.tier)}">${c.tier}</span></td><td style="color:var(--text-muted)">${c.joined}</td><td><div class="table-actions"><button title="Xem chi tiết" onclick="viewCustomerDetail(${c.id})"><i class="fa-solid fa-eye"></i></button></div></td></tr>`).join('');
    document.getElementById('customersInfo').textContent=`Hiển thị ${f.length} khách hàng`;
};
const viewCustomerDetail = (id) => {
    const c=adminCustomers.find(x=>x.id===id); if(!c) return;
    document.getElementById('customerDetailTitle').textContent=c.name;
    const orders=adminOrders.filter(o=>o.customer===c.name);
    document.getElementById('customerDetailBody').innerHTML=`<div style="text-align:center;margin-bottom:20px"><div class="customer-avatar-sm" style="width:64px;height:64px;font-size:24px;margin:0 auto 12px;border-radius:16px">${c.name.charAt(c.name.lastIndexOf(' ')+1)}</div><h3 style="margin:0">${c.name}</h3><span class="status-badge ${getTierClass(c.tier)}" style="margin-top:8px;display:inline-flex">${c.tier}</span></div><div class="order-detail-row"><span class="order-detail-label">Email</span><span class="order-detail-value">${c.email}</span></div><div class="order-detail-row"><span class="order-detail-label">Điện thoại</span><span class="order-detail-value">${c.phone}</span></div><div class="order-detail-row"><span class="order-detail-label">Ngày tham gia</span><span class="order-detail-value">${c.joined}</span></div><div class="order-detail-row"><span class="order-detail-label">Tổng đơn hàng</span><span class="order-detail-value"><b>${c.orders}</b></span></div><div class="order-detail-row"><span class="order-detail-label">Tổng chi tiêu</span><span class="order-detail-value" style="color:var(--primary-color);font-size:16px">${formatVND(c.spent)}</span></div>${orders.length?`<h4 style="margin:20px 0 10px;font-size:14px">Đơn hàng gần đây:</h4>${orders.map(o=>`<div class="order-detail-row"><span>#${o.id} - ${o.date}</span><span class="status-badge ${getStatusClass(o.status)}" style="font-size:11px">${getStatusLabel(o.status)}</span></div>`).join('')}`:''}`;
    document.getElementById('customerDetailModal').classList.add('show');
};

// ====== Coupons ======
const renderCouponStats = () => {
    const el=document.getElementById('couponStatsGrid'); if(!el) return;
    const active=adminCoupons.filter(c=>c.status==='active').length,totalUsed=adminCoupons.reduce((s,c)=>s+c.used,0);
    el.innerHTML=[
        {icon:'fa-ticket',bg:'rgba(59,130,246,0.1)',color:'#3b82f6',val:adminCoupons.length,label:'Tổng mã'},
        {icon:'fa-check-circle',bg:'rgba(34,197,94,0.1)',color:'#22c55e',val:active,label:'Đang hoạt động'},
        {icon:'fa-chart-simple',bg:'rgba(245,158,11,0.1)',color:'#f59e0b',val:totalUsed,label:'Lượt sử dụng'},
        {icon:'fa-ban',bg:'rgba(239,68,68,0.1)',color:'#ef4444',val:adminCoupons.length-active,label:'Hết hạn/Tắt'}
    ].map(s=>`<div class="mini-stat-card"><div class="mini-stat-icon" style="background:${s.bg};color:${s.color}"><i class="fa-solid ${s.icon}"></i></div><div class="mini-stat-info"><h4>${s.val}</h4><p>${s.label}</p></div></div>`).join('');
};
const renderCouponsTable = (sf='all') => {
    const tbody=document.getElementById('couponsBody'); if(!tbody) return;
    let f=[...adminCoupons]; if(sf!=='all') f=f.filter(c=>c.status===sf);
    tbody.innerHTML=f.map(c=>{
        const stCls=c.status==='active'?'status-success':c.status==='expired'?'status-cancelled':'status-pending';
        const stLbl=c.status==='active'?'Hoạt động':c.status==='expired'?'Hết hạn':'Đã tắt';
        const valTxt=c.type==='percent'?c.value+'%':c.type==='fixed'?formatVND(c.value):'Miễn phí';
        return `<tr><td><b style="color:var(--primary-color);font-size:13px">${c.code}</b></td><td style="font-size:13px">${c.description}</td><td><span class="status-badge status-shipping">${getCouponTypeLabel(c.type)}</span></td><td><b>${valTxt}</b></td><td>${c.used}/${c.maxUse}</td><td style="color:var(--text-muted)">${c.expiry}</td><td><span class="status-badge ${stCls}">${stLbl}</span></td><td><div class="table-actions"><button class="btn-edit" onclick="openEditCoupon(${c.id})"><i class="fa-solid fa-pen"></i></button><button class="btn-delete" onclick="confirmDeleteCoupon(${c.id})"><i class="fa-solid fa-trash"></i></button></div></td></tr>`;
    }).join('');
    document.getElementById('couponsInfo').textContent=`Hiển thị ${f.length} mã giảm giá`;
};
const openAddCoupon = () => {document.getElementById('couponModalTitle').textContent='Tạo mã giảm giá mới';document.getElementById('couponForm').reset();document.getElementById('couponEditId').value='';document.getElementById('couponModal').classList.add('show');};
const openEditCoupon = (id) => {const c=adminCoupons.find(x=>x.id===id);if(!c)return;document.getElementById('couponModalTitle').textContent='Chỉnh sửa mã giảm giá';document.getElementById('couponEditId').value=id;document.getElementById('couponCode').value=c.code;document.getElementById('couponType').value=c.type;document.getElementById('couponDescription').value=c.description;document.getElementById('couponValue').value=c.value;document.getElementById('couponMinOrder').value=c.minOrder;document.getElementById('couponMaxUse').value=c.maxUse;document.getElementById('couponExpiry').value=c.expiry;document.getElementById('couponModal').classList.add('show');};
const saveCoupon = () => {
    const code=document.getElementById('couponCode').value.trim().toUpperCase(),type=document.getElementById('couponType').value,desc=document.getElementById('couponDescription').value.trim(),value=parseInt(document.getElementById('couponValue').value)||0,minOrder=parseInt(document.getElementById('couponMinOrder').value)||0,maxUse=parseInt(document.getElementById('couponMaxUse').value)||100,expiry=document.getElementById('couponExpiry').value,editId=document.getElementById('couponEditId').value;
    if(!code||!expiry){showAdminToast('Vui lòng điền đầy đủ!','warning');return;}
    if(editId){const i=adminCoupons.findIndex(c=>c.id===parseInt(editId));if(i>-1){adminCoupons[i]={...adminCoupons[i],code,type,description:desc,value,minOrder,maxUse,expiry};showAdminToast('Cập nhật mã giảm giá thành công!');}}
    else{adminCoupons.push({id:Math.max(0,...adminCoupons.map(c=>c.id))+1,code,type,description:desc,value,minOrder,maxUse,used:0,expiry,status:'active'});showAdminToast('Tạo mã giảm giá thành công!');}
    closeModal('couponModal');renderCouponsTable(document.getElementById('filterCouponStatus')?.value||'all');renderCouponStats();
};
const confirmDeleteCoupon = (id) => {const c=adminCoupons.find(x=>x.id===id);if(!c)return;deleteTargetId=id;deleteType='coupon';document.getElementById('deleteMessage').textContent=`Mã "${c.code}" sẽ bị xóa.`;document.getElementById('deleteModal').classList.add('show');};

// ====== Reviews ======
const renderReviewStats = () => {
    const el=document.getElementById('reviewStatsGrid'); if(!el) return;
    const pending=adminReviews.filter(r=>r.status==='pending').length,approved=adminReviews.filter(r=>r.status==='approved').length,avg=(adminReviews.reduce((s,r)=>s+r.rating,0)/adminReviews.length).toFixed(1);
    el.innerHTML=[
        {icon:'fa-star',bg:'rgba(245,158,11,0.1)',color:'#f59e0b',val:adminReviews.length,label:'Tổng đánh giá'},
        {icon:'fa-clock',bg:'rgba(239,68,68,0.1)',color:'#ef4444',val:pending,label:'Chờ duyệt'},
        {icon:'fa-check',bg:'rgba(34,197,94,0.1)',color:'#22c55e',val:approved,label:'Đã duyệt'},
        {icon:'fa-chart-simple',bg:'rgba(59,130,246,0.1)',color:'#3b82f6',val:avg+'⭐',label:'Điểm trung bình'}
    ].map(s=>`<div class="mini-stat-card"><div class="mini-stat-icon" style="background:${s.bg};color:${s.color}"><i class="fa-solid ${s.icon}"></i></div><div class="mini-stat-info"><h4>${s.val}</h4><p>${s.label}</p></div></div>`).join('');
};
const renderReviewsList = (sf='all',rf='all') => {
    const el=document.getElementById('reviewsList'); if(!el) return;
    let f=[...adminReviews]; if(sf!=='all') f=f.filter(r=>r.status===sf); if(rf!=='all') f=f.filter(r=>r.rating===parseInt(rf));
    if(!f.length){el.innerHTML=`<div class="empty-state"><i class="fa-solid fa-star"></i><h4>Không có đánh giá</h4></div>`;document.getElementById('reviewsInfo').textContent='0';return;}
    el.innerHTML=f.map(r=>{
        const stars='★'.repeat(r.rating)+'☆'.repeat(5-r.rating);
        const stBadge=r.status==='approved'?'<span class="status-badge status-success">Đã duyệt</span>':r.status==='pending'?'<span class="status-badge status-pending">Chờ duyệt</span>':'<span class="status-badge status-cancelled">Từ chối</span>';
        return `<div class="review-card"><div class="review-avatar">${r.customer.charAt(r.customer.lastIndexOf(' ')+1)}</div><div class="review-content"><div class="review-header"><div><span class="review-author">${r.customer}</span> ${stBadge}</div></div><div class="review-product"><i class="fa-solid fa-box" style="margin-right:4px"></i>${r.product}</div><div class="review-stars">${stars}</div><div class="review-text">${r.text}</div><div class="review-date"><i class="fa-regular fa-calendar"></i> ${r.date}</div></div><div class="review-actions">${r.status==='pending'?`<button class="btn-approve" title="Duyệt" onclick="updateReviewStatus(${r.id},'approved')"><i class="fa-solid fa-check"></i></button><button class="btn-reject" title="Từ chối" onclick="updateReviewStatus(${r.id},'rejected')"><i class="fa-solid fa-xmark"></i></button>`:`<button class="btn-reject" title="Xóa" onclick="deleteReview(${r.id})"><i class="fa-solid fa-trash"></i></button>`}</div></div>`;
    }).join('');
    document.getElementById('reviewsInfo').textContent=`Hiển thị ${f.length} đánh giá`;
};
const updateReviewStatus = (id,s) => {const r=adminReviews.find(x=>x.id===id);if(r){r.status=s;showAdminToast(s==='approved'?'Đã duyệt đánh giá!':'Đã từ chối đánh giá!');renderReviewsList(document.getElementById('filterReviewStatus')?.value||'all',document.getElementById('filterReviewRating')?.value||'all');renderReviewStats();updateReviewBadge();}};
const deleteReview = (id) => {const i=adminReviews.findIndex(r=>r.id===id);if(i>-1){adminReviews.splice(i,1);showAdminToast('Đã xóa đánh giá!');renderReviewsList(document.getElementById('filterReviewStatus')?.value||'all',document.getElementById('filterReviewRating')?.value||'all');renderReviewStats();updateReviewBadge();}};
const updateReviewBadge = () => {const b=document.querySelector('#nav-reviews .nav-badge');if(b)b.textContent=adminReviews.filter(r=>r.status==='pending').length;};

// ====== Admin Users ======
const renderAdminUsers = () => {
    const el=document.getElementById('adminUsersGrid'); if(!el) return;
    el.innerHTML=adminUsers.map(u=>{const [c1,c2]=getRoleColors(u.role);return `<div class="admin-user-card"><div class="admin-user-status ${u.status==='active'?'online':'offline'}"></div><div class="admin-user-card-header"><div class="admin-user-card-avatar" style="background:linear-gradient(135deg,${c1},${c2})">${u.name.charAt(u.name.lastIndexOf(' ')+1)}</div><div class="admin-user-card-info"><h4>${u.name}</h4><p>${u.email}</p></div></div><span class="admin-user-role role-${u.role}"><i class="fa-solid fa-shield-halved"></i> ${getRoleLabel(u.role)}</span><div class="admin-user-details"><div class="admin-user-detail"><i class="fa-solid fa-phone"></i>${u.phone}</div><div class="admin-user-detail"><i class="fa-solid fa-clock"></i>Đăng nhập: ${u.lastLogin}</div><div class="admin-user-detail"><i class="fa-solid fa-key"></i>${u.permissions.length} quyền hạn</div></div><div class="admin-user-card-footer"><button class="btn-edit-user" onclick="openEditUser(${u.id})"><i class="fa-solid fa-pen"></i> Sửa</button>${u.role!=='superadmin'?`<button class="btn-delete-user" onclick="confirmDeleteUser(${u.id})"><i class="fa-solid fa-trash"></i> Xóa</button>`:''}</div></div>`;}).join('');
};
const openAddUser = () => {document.getElementById('userModalTitle').textContent='Thêm quản trị viên';document.getElementById('userForm').reset();document.getElementById('userEditId').value='';document.getElementById('userPasswordGroup').style.display='block';document.getElementById('userModal').classList.add('show');};
const openEditUser = (id) => {const u=adminUsers.find(x=>x.id===id);if(!u)return;document.getElementById('userModalTitle').textContent='Chỉnh sửa quản trị viên';document.getElementById('userEditId').value=id;document.getElementById('userName').value=u.name;document.getElementById('userEmail').value=u.email;document.getElementById('userRole').value=u.role;document.getElementById('userStatus').value=u.status;document.getElementById('userPhone').value=u.phone;document.getElementById('userPasswordGroup').style.display='none';['products','orders','customers','coupons','reviews','reports','settings','users'].forEach(p=>{const el=document.getElementById('perm_'+p);if(el)el.checked=u.permissions.includes(p);});document.getElementById('userModal').classList.add('show');};
const saveUser = () => {
    const name=document.getElementById('userName').value.trim(),email=document.getElementById('userEmail').value.trim(),role=document.getElementById('userRole').value,status=document.getElementById('userStatus').value,phone=document.getElementById('userPhone').value.trim(),editId=document.getElementById('userEditId').value;
    const perms=[];['products','orders','customers','coupons','reviews','reports','settings','users'].forEach(p=>{if(document.getElementById('perm_'+p)?.checked)perms.push(p);});
    if(!name||!email||!role){showAdminToast('Vui lòng điền đầy đủ!','warning');return;}
    if(editId){const i=adminUsers.findIndex(u=>u.id===parseInt(editId));if(i>-1){adminUsers[i]={...adminUsers[i],name,email,role,status,phone,permissions:perms};showAdminToast('Cập nhật thành công!');}}
    else{adminUsers.push({id:Math.max(0,...adminUsers.map(u=>u.id))+1,name,email,phone,role,status,lastLogin:'Chưa đăng nhập',permissions:perms});showAdminToast('Thêm quản trị viên thành công!');}
    closeModal('userModal');renderAdminUsers();
};
const confirmDeleteUser = (id) => {const u=adminUsers.find(x=>x.id===id);if(!u)return;deleteTargetId=id;deleteType='user';document.getElementById('deleteMessage').textContent=`"${u.name}" sẽ bị xóa.`;document.getElementById('deleteModal').classList.add('show');};

// ====== Activity Log ======
const renderActivityLog = (tf='all') => {
    const el=document.getElementById('activityTimeline'); if(!el) return;
    let f=[...activityLogs]; if(tf!=='all') f=f.filter(a=>a.type===tf);
    el.innerHTML=f.map(a=>`<div class="activity-item"><div class="activity-icon" style="background:${a.iconBg};color:${a.iconColor}"><i class="fa-solid ${a.icon}"></i></div><div class="activity-info"><p>${a.text}</p><div class="activity-meta"><span><i class="fa-regular fa-clock"></i> ${a.time}</span><span><i class="fa-regular fa-calendar"></i> ${a.date}</span></div></div></div>`).join('');
    document.getElementById('activityInfo').textContent=`${f.length} hoạt động`;
};

// ====== Reports ======
let reportRevenueChart=null,reportSourceChart=null,reportOrderStatusChart=null;
const renderReports = () => {
    // Stats
    const el=document.getElementById('reportStatsGrid'); if(!el) return;
    const totalRev=adminOrders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+o.total,0);
    const avgOrder=totalRev/adminOrders.filter(o=>o.status!=='cancelled').length;
    el.innerHTML=[
        {icon:'fa-solid fa-dollar-sign',value:formatVND(totalRev),label:'Doanh thu',trend:'+12.5%',dir:'up'},
        {icon:'fa-solid fa-shopping-bag',value:adminOrders.length,label:'Đơn hàng',trend:'+8%',dir:'up'},
        {icon:'fa-solid fa-calculator',value:formatVND(avgOrder),label:'Giá trị TB/đơn',trend:'+3.2%',dir:'up'},
        {icon:'fa-solid fa-arrow-trend-up',value:'68%',label:'Tỷ lệ chuyển đổi',trend:'+2.1%',dir:'up'},
    ].map(s=>`<div class="stat-card"><div class="stat-card-header"><div class="stat-icon"><i class="${s.icon}"></i></div><span class="stat-trend ${s.dir}"><i class="fa-solid fa-arrow-up"></i> ${s.trend}</span></div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');
    // Revenue & Orders chart
    const ctx1=document.getElementById('reportRevenueChart');
    if(ctx1){if(reportRevenueChart)reportRevenueChart.destroy();const isDark=document.documentElement.getAttribute('data-theme')==='dark';reportRevenueChart=new Chart(ctx1,{type:'bar',data:{labels:['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],datasets:[{label:'Doanh thu (triệu)',data:[180,220,195,310,280,350,290,420,380,450,510,480],backgroundColor:'rgba(59,130,246,0.7)',borderRadius:6},{label:'Đơn hàng',data:[12,18,14,25,20,28,22,35,30,38,42,40],backgroundColor:'rgba(139,92,246,0.7)',borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:isDark?'#94a3b8':'#64748b',font:{family:'Inter'}}}},scales:{x:{grid:{display:false},ticks:{color:isDark?'#94a3b8':'#64748b'}},y:{grid:{color:isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)'},ticks:{color:isDark?'#94a3b8':'#64748b'},border:{display:false}}}}});}
    // Source chart
    const ctx2=document.getElementById('reportSourceChart');
    if(ctx2){if(reportSourceChart)reportSourceChart.destroy();const isDark=document.documentElement.getAttribute('data-theme')==='dark';reportSourceChart=new Chart(ctx2,{type:'doughnut',data:{labels:['Trực tiếp','Google','Facebook','Zalo','Khác'],datasets:[{data:[35,28,20,12,5],backgroundColor:['#3b82f6','#22c55e','#3b5998','#0068ff','#94a3b8'],borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'60%',plugins:{legend:{position:'bottom',labels:{padding:16,usePointStyle:true,color:isDark?'#94a3b8':'#64748b',font:{family:'Inter',size:12}}}}}});}
    // Order status chart
    const ctx3=document.getElementById('reportOrderStatusChart');
    if(ctx3){if(reportOrderStatusChart)reportOrderStatusChart.destroy();const isDark=document.documentElement.getAttribute('data-theme')==='dark';const sc={};adminOrders.forEach(o=>{sc[o.status]=(sc[o.status]||0)+1;});reportOrderStatusChart=new Chart(ctx3,{type:'pie',data:{labels:Object.keys(sc).map(getStatusLabel),datasets:[{data:Object.values(sc),backgroundColor:['#22c55e','#f59e0b','#3b82f6','#8b5cf6','#ef4444'],borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{padding:16,usePointStyle:true,color:isDark?'#94a3b8':'#64748b',font:{family:'Inter',size:12}}}}}});}
    // Top products
    const tp=document.getElementById('topProductsList'); if(tp){tp.innerHTML=adminProducts.slice(0,6).map((p,i)=>`<div class="top-product-item"><div class="top-product-rank ${i<3?'rank-'+(i+1):'rank-other'}">${i+1}</div><div class="top-product-img"><img src="${p.image}" alt="${p.name}"></div><div class="top-product-info"><h5>${p.name.substring(0,30)}...</h5><p>${getCategoryLabel(p.category)}</p></div><div class="top-product-sales">${formatVND(p.salePrice)}</div></div>`).join('');}
};

// ====== Notifications ======
const renderNotifications = () => {
    const body=document.getElementById('notifBody'); if(!body) return;
    body.innerHTML=adminNotifications.map(n=>`<div class="notif-item ${n.unread?'unread':''}" onclick="readNotification(${n.id})"><div class="notif-icon" style="background:${n.iconBg};color:${n.iconColor}"><i class="fa-solid ${n.icon}"></i></div><div class="notif-text"><p>${n.text}</p><div class="notif-time">${n.time}</div></div></div>`).join('');
    const cnt=document.getElementById('notifCount');if(cnt){const unread=adminNotifications.filter(n=>n.unread).length;cnt.textContent=unread;cnt.style.display=unread?'flex':'none';}
};
const readNotification = (id) => {const n=adminNotifications.find(x=>x.id===id);if(n)n.unread=false;renderNotifications();};
const markAllRead = () => {adminNotifications.forEach(n=>n.unread=false);renderNotifications();showAdminToast('Đã đánh dấu tất cả đã đọc');};

// ====== Dropdowns ======
const closeAllDropdowns = () => {document.getElementById('notifDropdown')?.classList.remove('show');document.getElementById('avatarDropdown')?.classList.remove('show');};

// ====== Modals ======
const closeModal = (id) => document.getElementById(id).classList.remove('show');
document.querySelectorAll('.modal-overlay').forEach(o=>{o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('show');});});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-overlay.show').forEach(m=>m.classList.remove('show'));});

// ====== Theme ======
const initAdminTheme = () => {
    const t=localStorage.getItem('theme')||'light';
    document.documentElement.setAttribute('data-theme',t);
    const btn=document.getElementById('adminThemeToggle');if(btn)btn.innerHTML=t==='light'?'<i class="fa-solid fa-moon"></i>':'<i class="fa-solid fa-sun"></i>';
    const sw=document.getElementById('settingDarkMode');if(sw&&t==='dark')sw.classList.add('active');
};
document.getElementById('adminThemeToggle')?.addEventListener('click',()=>{
    const c=document.documentElement.getAttribute('data-theme'),n=c==='light'?'dark':'light';
    document.documentElement.setAttribute('data-theme',n);localStorage.setItem('theme',n);
    const btn=document.getElementById('adminThemeToggle');if(btn)btn.innerHTML=n==='light'?'<i class="fa-solid fa-moon"></i>':'<i class="fa-solid fa-sun"></i>';
    const sw=document.getElementById('settingDarkMode');if(sw){n==='dark'?sw.classList.add('active'):sw.classList.remove('active');}
    renderCharts();renderReports();showAdminToast(`Chế độ ${n==='light'?'sáng':'tối'}`);
});
const toggleAdminDarkMode = (el) => {document.getElementById('adminThemeToggle')?.click();};
const saveSettings = () => showAdminToast('Đã lưu cài đặt!');

// ====== Sidebar Toggle ======
document.getElementById('sidebarToggle')?.addEventListener('click',()=>{document.getElementById('adminSidebar').classList.toggle('show');document.getElementById('sidebarOverlay').classList.toggle('show');});
document.getElementById('sidebarOverlay')?.addEventListener('click',()=>{document.getElementById('adminSidebar').classList.remove('show');document.getElementById('sidebarOverlay').classList.remove('show');});

// ====== Export Buttons ======
const handleExport = (type) => showAdminToast(`Đang xuất ${type}... (Demo)`);

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
    initAdminTheme();
    // Sidebar nav
    document.querySelectorAll('.sidebar-nav a').forEach(link=>{link.addEventListener('click',e=>{e.preventDefault();const page=link.dataset.page;if(page)switchAdminPage(page);});});
    // Product events
    document.getElementById('btnAddProduct')?.addEventListener('click',openAddProduct);
    document.getElementById('btnSaveProduct')?.addEventListener('click',saveProduct);
    document.getElementById('btnConfirmDelete')?.addEventListener('click',executeDelete);
    document.getElementById('searchProduct')?.addEventListener('input',e=>renderProductsTable(e.target.value,document.getElementById('filterCategory')?.value||'all'));
    document.getElementById('filterCategory')?.addEventListener('change',e=>renderProductsTable(document.getElementById('searchProduct')?.value||'',e.target.value));
    // Order events
    document.getElementById('searchOrder')?.addEventListener('input',e=>renderOrdersTable(e.target.value,document.getElementById('filterOrderStatus')?.value||'all'));
    document.getElementById('filterOrderStatus')?.addEventListener('change',e=>renderOrdersTable(document.getElementById('searchOrder')?.value||'',e.target.value));
    // Customer events
    document.getElementById('searchCustomer')?.addEventListener('input',e=>renderCustomersTable(e.target.value,document.getElementById('filterCustomerTier')?.value||'all'));
    document.getElementById('filterCustomerTier')?.addEventListener('change',e=>renderCustomersTable(document.getElementById('searchCustomer')?.value||'',e.target.value));
    // Coupon events
    document.getElementById('btnAddCoupon')?.addEventListener('click',openAddCoupon);
    document.getElementById('btnSaveCoupon')?.addEventListener('click',saveCoupon);
    document.getElementById('filterCouponStatus')?.addEventListener('change',e=>renderCouponsTable(e.target.value));
    // Review events
    document.getElementById('filterReviewStatus')?.addEventListener('change',e=>renderReviewsList(e.target.value,document.getElementById('filterReviewRating')?.value||'all'));
    document.getElementById('filterReviewRating')?.addEventListener('change',e=>renderReviewsList(document.getElementById('filterReviewStatus')?.value||'all',e.target.value));
    // User events
    document.getElementById('btnAddUser')?.addEventListener('click',openAddUser);
    document.getElementById('btnSaveUser')?.addEventListener('click',saveUser);
    // Activity filter
    document.getElementById('filterActivityType')?.addEventListener('change',e=>renderActivityLog(e.target.value));
    // Notification
    document.getElementById('notifToggle')?.addEventListener('click',e=>{e.stopPropagation();document.getElementById('avatarDropdown')?.classList.remove('show');document.getElementById('notifDropdown')?.classList.toggle('show');});
    document.getElementById('notifMarkAll')?.addEventListener('click',markAllRead);
    // Avatar dropdown
    document.getElementById('avatarWrapper')?.addEventListener('click',e=>{e.stopPropagation();document.getElementById('notifDropdown')?.classList.remove('show');document.getElementById('avatarDropdown')?.classList.toggle('show');});
    // Close dropdowns on outside click
    document.addEventListener('click',()=>closeAllDropdowns());
    document.getElementById('notifDropdown')?.addEventListener('click',e=>e.stopPropagation());
    document.getElementById('avatarDropdown')?.addEventListener('click',e=>e.stopPropagation());
    // Export buttons
    document.getElementById('btnExportDashboard')?.addEventListener('click',()=>handleExport('báo cáo tổng quan'));
    document.getElementById('btnExportOrders')?.addEventListener('click',()=>handleExport('đơn hàng'));
    document.getElementById('btnExportCustomers')?.addEventListener('click',()=>handleExport('danh sách khách hàng'));
    document.getElementById('btnExportReport')?.addEventListener('click',()=>handleExport('báo cáo PDF'));
    document.getElementById('btnClearLogs')?.addEventListener('click',()=>{activityLogs.length=0;renderActivityLog();showAdminToast('Đã xóa nhật ký!');});
    // Render all
    renderStats();renderRecentOrders();renderCharts();
    renderProductsTable();renderOrdersTable();renderOrderStats();
    renderCustomersTable();renderCustomerStats();
    renderCouponsTable();renderCouponStats();
    renderReviewsList();renderReviewStats();updateReviewBadge();
    renderAdminUsers();renderActivityLog();renderReports();renderNotifications();
    // Update badges
    const pc=adminOrders.filter(o=>o.status==='pending'||o.status==='confirmed').length;
    const b=document.querySelector('#nav-orders .nav-badge');if(b)b.textContent=pc;
});
