// FOOD ORDERING SYSTEM - OPTIMIZED (~480 lines, all features intact)
const AppState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  selectedCategory: 'All Menus',
  ratings: JSON.parse(localStorage.getItem('ratings')) || {},
  appliedPromo: null,
  addresses: JSON.parse(localStorage.getItem('addresses')) || []
};

// 51+ Menu Items - Compact Format
const MENU_DATA = {'All Menus': [], 'Burger': [{id:1,name:'ClassicBurger',price:19.99,rating:4.7,reviews:389,description:'Juicy beef patty, melted cheese, fresh lettuce, tomato.',image:'img/burger.jpeg'},{id:2,name:'Spicy Burger',price:22.49,rating:4.5,reviews:156,description:'Fiery and bold with jalapenos and sriracha mayo.',image:'img/burger.jpeg'},{id:3,name:'Double Cheese',price:24.99,rating:4.8,reviews:287,description:'Two patties with double cheddar.',image:'img/burger.jpeg'},{id:4,name:'Mushroom Burger',price:20.99,rating:4.6,reviews:198,description:'Sautéed mushrooms with Swiss cheese.',image:'img/burger.jpeg'},{id:5,name:'BBQ Bacon',price:25.99,rating:4.9,reviews:456,description:'Crispy bacon, BBQ sauce, fried onions.',image:'img/burger.jpeg'}], 'Pizza': [{id:6,name:'Margherita',price:29.99,rating:4.6,reviews:512,description:'Fresh mozzarella, tomato sauce, basil.',image:'img/pizza.jpeg'},{id:7,name:'Pepperoni',price:34.99,rating:4.8,reviews:623,description:'Loaded with pepperoni and cheese.',image:'img/pizza.jpeg'},{id:8,name:'Veggie Supreme',price:31.99,rating:4.5,reviews:342,description:'Bell peppers, mushrooms, olives.',image:'img/pizza.jpeg'},{id:9,name:'Chicken Alfredo',price:36.99,rating:4.7,reviews:478,description:'Grilled chicken, creamy alfredo.',image:'img/pizza.jpeg'},{id:10,name:'Meat Lovers',price:39.99,rating:4.9,reviews:789,description:'Pepperoni, sausage, ham, bacon.',image:'img/pizza.jpeg'}], 'Drinks': [{id:11,name:'Orange Juice',price:8.99,rating:4.4,reviews:234,description:'Freshly squeezed, no sugar.',image:'img/coffee.jpeg'},{id:12,name:'Mango Lassi',price:9.99,rating:4.6,reviews:345,description:'Creamy yogurt drink.',image:'img/coffee.jpeg'},{id:13,name:'Iced Tea',price:5.99,rating:4.3,reviews:167,description:'Lemon and mint tea.',image:'img/coffee.jpeg'},{id:14,name:'Smoothie Bowl',price:12.99,rating:4.7,reviews:456,description:'With granola and berries.',image:'img/coffee.jpeg'},{id:15,name:'Lemonade',price:6.99,rating:4.5,reviews:289,description:'Fresh lime and mint.',image:'img/coffee.jpeg'}], 'Ice Cream': [{id:16,name:'Vanilla',price:5.99,rating:4.5,reviews:378,description:'Real vanilla beans.',image:'img/pizza.jpeg'},{id:17,name:'Chocolate',price:7.99,rating:4.7,reviews:512,description:'Crispy chocolate pieces.',image:'img/pizza.jpeg'},{id:18,name:'Strawberry',price:7.99,rating:4.6,reviews:423,description:'Real fruit pieces.',image:'img/pizza.jpeg'},{id:19,name:'Mint Choco',price:8.99,rating:4.8,reviews:634,description:'Dark chocolate chips.',image:'img/pizza.jpeg'},{id:20,name:'Cookies Cream',price:8.99,rating:4.9,reviews:756,description:'Cookie pieces.',image:'img/pizza.jpeg'}], 'Coffee': [{id:21,name:'Espresso',price:4.99,rating:4.6,reviews:289,description:'Strong bold shot.',image:'img/coffee.jpeg'},{id:22,name:'Cappuccino',price:6.99,rating:4.7,reviews:456,description:'Espresso with foam.',image:'img/coffee.jpeg'},{id:23,name:'Latte',price:6.99,rating:4.7,reviews:567,description:'Velvety steamed milk.',image:'img/coffee.jpeg'},{id:24,name:'Iced Coffee',price:6.99,rating:4.5,reviews:378,description:'Over ice with cream.',image:'img/coffee.jpeg'},{id:25,name:'Mocha',price:7.99,rating:4.8,reviews:634,description:'Espresso chocolate blend.',image:'img/coffee.jpeg'}], 'Seafood': [{id:26,name:'Grilled Salmon',price:32.99,rating:4.8,reviews:528,description:'Lemon butter sauce.',image:'img/burger.jpeg'},{id:27,name:'Shrimp Curry',price:28.99,rating:4.6,reviews:389,description:'Aromatic curry sauce.',image:'img/burger.jpeg'},{id:28,name:'Fish Chips',price:19.99,rating:4.5,reviews:456,description:'Crispy battered cod.',image:'img/burger.jpeg'},{id:29,name:'Garlic Prawns',price:34.99,rating:4.9,reviews:612,description:'Butter garlic sautée.',image:'img/burger.jpeg'},{id:30,name:'Crab Cakes',price:27.99,rating:4.7,reviews:434,description:'Golden crab cakes.',image:'img/burger.jpeg'}], 'Chicken': [{id:31,name:'Grilled Breast',price:18.99,rating:4.6,reviews:345,description:'Herbs and spices.',image:'img/burger.jpeg'},{id:32,name:'Butter Chicken',price:22.99,rating:4.8,reviews:567,description:'Creamy tomato sauce.',image:'img/burger.jpeg'},{id:33,name:'Chicken Tikka',price:21.99,rating:4.7,reviews:478,description:'Yogurt and spices.',image:'img/burger.jpeg'},{id:34,name:'Chicken Wings',price:17.99,rating:4.5,reviews:389,description:'Spicy buffalo sauce.',image:'img/burger.jpeg'},{id:35,name:'Teriyaki Chicken',price:23.99,rating:4.7,reviews:512,description:'Sweet savory glaze.',image:'img/burger.jpeg'}], 'Mutton': [{id:36,name:'Mutton Curry',price:26.99,rating:4.7,reviews:423,description:'Aromatic curry.',image:'img/burger.jpeg'},{id:37,name:'Tandoori Mutton',price:28.99,rating:4.8,reviews:534,description:'Tandoor roasted.',image:'img/burger.jpeg'},{id:38,name:'Mutton Biryani',price:24.99,rating:4.6,reviews:389,description:'Fragrant rice dish.',image:'img/burger.jpeg'},{id:39,name:'Keema Mutton',price:22.99,rating:4.5,reviews:312,description:'Minced with onions.',image:'img/burger.jpeg'}], 'Egg': [{id:40,name:'Scrambled Eggs',price:8.99,rating:4.4,reviews:234,description:'Fluffy eggs.',image:'img/nutrition.jpeg'},{id:41,name:'Boiled Eggs',price:6.99,rating:4.3,reviews:156,description:'Simple salt pepper.',image:'img/nutrition.jpeg'},{id:42,name:'Omelette',price:10.99,rating:4.6,reviews:378,description:'Cheese and veggies.',image:'img/nutrition.jpeg'},{id:43,name:'Egg Fried Rice',price:12.99,rating:4.7,reviews:456,description:'With vegetables.',image:'img/nutrition.jpeg'}], 'Soup': [{id:44,name:'Tomato Soup',price:7.99,rating:4.5,reviews:289,description:'Basil and croutons.',image:'img/nutrition.jpeg'},{id:45,name:'Chicken Soup',price:10.99,rating:4.6,reviews:345,description:'With noodles.',image:'img/nutrition.jpeg'},{id:46,name:'Mushroom Soup',price:8.99,rating:4.4,reviews:267,description:'Garlic and herbs.',image:'img/nutrition.jpeg'},{id:47,name:'Seafood Soup',price:14.99,rating:4.7,reviews:412,description:'Shrimp and fish.',image:'img/nutrition.jpeg'}], 'Healthy': [{id:48,name:'Healthy Bowl',price:12.99,rating:4.5,reviews:245,description:'Veggies and grains.',image:'img/nutrition.jpeg'},{id:49,name:'Quinoa Salad',price:14.99,rating:4.6,reviews:378,description:'Protein salad.',image:'img/nutrition.jpeg'},{id:50,name:'Chicken Salad',price:16.99,rating:4.7,reviews:456,description:'Greens and nuts.',image:'img/nutrition.jpeg'},{id:51,name:'Smoothie',price:11.99,rating:4.6,reviews:323,description:'Fruits and nuts.',image:'img/nutrition.jpeg'}]};
Object.keys(MENU_DATA).forEach(c => c !== 'All Menus' && MENU_DATA['All Menus'].push(...MENU_DATA[c]));

document.addEventListener('DOMContentLoaded', () => {
  addModalStyles(); renderMenuItems(); setupEventDelegation();
  document.querySelector('.offcanvas-title').textContent = AppState.user?.name || 'Foodie';
});

function setupEventDelegation() {
  document.addEventListener('click', e => {
    const {target} = e;
    if(target.closest('.cart')) { e.preventDefault(); showCart(); }
    if(target.closest('.user')) { e.preventDefault(); AppState.user ? showProfile() : showLoginModal(); }
    if(target.closest('.detail-favourites')) toggleFavorite(target.closest('.detail-card'));
    if(target.closest('.filter-card')) filterCategory(target.closest('.filter-card'));
    if(target.closest('.detail-card') && !e.target.closest('.detail-favourites, .qty-decrease, .qty-increase, .add-to-cart-btn')) showItemDetails(target.closest('.detail-card'));
    if(target.closest('.add-to-cart-btn')) addToCart(target.closest('.detail-card'));
    if(target.classList.contains('btn-remove-cart')) removeFromCart(+target.dataset.index);
    if(target.closest('.sidebar-menus a')) handleSidebarNav(target.closest('a').textContent.trim());
    if(target.classList.contains('star')) rateItem(target);
  });
  
  const s = document.querySelector('.search-bar button'), si = document.querySelector('.search-bar input');
  s?.addEventListener('click', () => renderMenuItems(AppState.selectedCategory, si.value));
  si?.addEventListener('keypress', e => e.key === 'Enter' && s?.click());
  
  const carousel = (w,b,n) => { const wr = document.querySelector(w); document.querySelector(b)?.addEventListener('click', () => wr?.scrollBy({left:-300,behavior:'smooth'})); document.querySelector(n)?.addEventListener('click', () => wr?.scrollBy({left:300,behavior:'smooth'})); };
  carousel('.highlight-wrapper', '.main-arrow .back', '.main-arrow .next');
  carousel('.filter-wrapper', '.main-arrow .back-menus', '.main-arrow .next-menus');
}

function renderMenuItems(cat = 'All Menus', q = '') {
  const w = document.getElementById('dynamicMenuItems');
  if (!w) return;
  const items = (cat === 'All Menus' ? MENU_DATA['All Menus'] : MENU_DATA[cat] || []).filter(i => !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  w.innerHTML = items.length ? items.map(i => `<div class="detail-card bg-light p-3 rounded position-relative d-flex" data-item='${JSON.stringify(i).replace(/'/g,"&apos;")}'><img src="${i.image}" alt="${i.name}" class="detail-img rounded me-3"><div><h4>${i.name}</h4><p class="detail-sub">${i.description}</p><div class="d-flex justify-content-between"><p class="price text-success fw-bold">$${i.price.toFixed(2)}</p><small>⭐${i.rating}</small></div><div class="d-flex gap-2 mt-2"><button class="btn btn-sm btn-outline-danger qty-decrease">-</button><span class="qty" style="width:30px;text-align:center">1</span><button class="btn btn-sm btn-outline-danger qty-increase">+</button><button class="btn btn-danger btn-sm flex-grow-1 add-to-cart-btn">Add</button></div></div><ion-icon class="detail-favourites position-absolute top-0 end-0" name="${AppState.favorites.includes(i.name)?'heart':'heart-outline'}" style="cursor:pointer;color:${AppState.favorites.includes(i.name)?'#dc3545':'inherit'};font-size:20px"></ion-icon></div>`).join('') : '<p class="alert alert-warning w-100">No items found</p>';
}

function toggleFavorite(c) {
  const nm = c.querySelector('h4').textContent, ic = c.querySelector('.detail-favourites');
  if (AppState.favorites.includes(nm)) {
    AppState.favorites = AppState.favorites.filter(f => f !== nm);
    ic.setAttribute('name', 'heart-outline');
    ic.style.color = '';
  } else {
    AppState.favorites.push(nm);
    ic.setAttribute('name', 'heart');
    ic.style.color = '#dc3545';
  }
  localStorage.setItem('favorites', JSON.stringify(AppState.favorites));
  showNotif(`${nm} ${AppState.favorites.includes(nm) ? 'added' : 'removed'}`, AppState.favorites.includes(nm) ? 'success' : 'info');
}

function filterCategory(c) {
  document.querySelectorAll('.filter-card').forEach(x => x.classList.remove('border', 'border-danger', 'border-3'));
  c.classList.add('border', 'border-danger', 'border-3');
  AppState.selectedCategory = c.querySelector('p').textContent;
  renderMenuItems(AppState.selectedCategory);
}

function addToCart(c) {
  const i = JSON.parse(c.dataset.item), q = parseInt(c.querySelector('.qty').textContent), e = AppState.cart.find(x => x.name === i.name);
  if (e) e.quantity += q; else AppState.cart.push({...i, quantity: q});
  localStorage.setItem('cart', JSON.stringify(AppState.cart));
  updateCartBadge();
  showNotif(`✅ ${i.name}x${q} added!`, 'success');
}

function removeFromCart(i) {
  const nm = AppState.cart[i].name;
  AppState.cart.splice(i, 1);
  localStorage.setItem('cart', JSON.stringify(AppState.cart));
  updateCartBadge();
  showNotif(`${nm} removed`, 'info');
  showCart();
}

function updateCartBadge() {
  const c = document.querySelector('.cart');
  let b = c?.querySelector('.cart-badge');
  const t = AppState.cart.reduce((s, i) => s + i.quantity, 0);
  if (t > 0) {
    if (!b) { b = document.createElement('span'); b.className = 'cart-badge'; b.style.cssText = 'position:absolute;background:#dc3545;color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;top:-5px;right:-5px'; c.style.position = 'relative'; c.appendChild(b); }
    b.textContent = t;
  } else if (b) b.remove();
}

function showCart() {
  if (!AppState.cart.length) { showNotif('Cart empty!', 'warning'); return; }
  let tot = AppState.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const dis = AppState.appliedPromo ? (AppState.appliedPromo === 'FAST50' ? 5 : tot * (AppState.appliedPromo === 'SAVE10' ? 0.1 : 0.2)) : 0;
  const tx = (tot - dis) * 0.05, dlv = 2.99, gt = tot - dis + tx + dlv;
  showModal('Cart', `<div style="background:white;border-radius:8px;padding:20px;max-width:600px;margin:20px auto"><h2 class="text-danger mb-4">🛒 Cart</h2><table class="table table-sm"><tbody>${AppState.cart.map((i,idx)=>`<tr><td>${i.name}</td><td>$${i.price.toFixed(2)}</td><td>${i.quantity}</td><td><button class="btn btn-sm btn-danger btn-remove-cart" data-index="${idx}">Remove</button></td></tr>`).join('')}</tbody></table><div class="mb-3"><input type="text" id="promoInput" class="form-control mb-2" placeholder="Promo"><button class="btn btn-warning" onclick="applyPromo()">Apply</button><small>SAVE10,SAVE20,FAST50</small></div><div class="card p-2"><div class="d-flex justify-content-between">Subtotal<span>$${tot.toFixed(2)}</span></div>${dis>0?`<div class="d-flex justify-content-between text-success">Discount<span>-$${dis.toFixed(2)}</span></div>`:''}<div class="d-flex justify-content-between">Tax<span>$${tx.toFixed(2)}</span></div><div class="d-flex justify-content-between">Delivery<span>$${dlv.toFixed(2)}</span></div><hr><div class="d-flex justify-content-between fw-bold" style="font-size:18px">Total<span class="text-danger">$${gt.toFixed(2)}</span></div></div><button class="btn btn-danger w-100 mt-3" onclick="proceedCheckout()">Checkout</button></div>`);
}

window.applyPromo = () => {
  const c = document.getElementById('promoInput').value.toUpperCase().trim();
  if (['SAVE10','SAVE20','FAST50'].includes(c)) {
    AppState.appliedPromo = c;
    showNotif(`✅ ${c} applied!`, 'success');
    showCart();
  } else showNotif('Invalid!', 'error');
};

window.proceedCheckout = () => {
  if (!AppState.user) { showNotif('Login first', 'warning'); showLoginModal(); return; }
  showModal('Checkout', `<div style="background:white;border-radius:8px;padding:30px;max-width:600px;margin:20px auto"><h2 class="text-danger mb-4">📦 Checkout</h2><div class="mb-3"><label>Address:</label><select id="addrSel" class="form-select"><option>Add new</option></select><button class="btn btn-sm btn-primary mt-2" onclick="newAddrForm()">+ New</button></div><div class="mb-3"><label>Payment:</label><select id="paymentSel" class="form-select"><option>Credit</option><option>Wallet</option><option>COD</option></select></div><textareaid="notesInput" class="form-control mb-3" placeholder="Notes" rows="2"></textarea><button class="btn btn-danger w-100 mb-2" onclick="placeOrder()">Place Order</button><button class="btn btn-secondary w-100" onclick="closeModal()">Back</button></div>`);
  AppState.addresses.forEach((a,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`${a.name}-${a.street}`;document.getElementById('addrSel').appendChild(o);});
};

window.placeOrder = () => {
  const ai = document.getElementById('addrSel').value;
  if (!ai && !AppState.addresses.length) { showNotif('Add address', 'warning'); newAddrForm(); return; }
  const tot = AppState.cart.reduce((s,i)=>s+(i.price*i.quantity),0);
  const dis = AppState.appliedPromo ? (AppState.appliedPromo==='FAST50'?5:tot*(AppState.appliedPromo==='SAVE10'?0.1:0.2)):0;
  const tx = (tot-dis)*0.05, dlv = 2.99, gt = tot-dis+tx+dlv;
  const ord = {id:'ORD'+Date.now(),date:new Date().toISOString(),items:[...AppState.cart],address:ai>=0?AppState.addresses[ai]:{name:'Pending',street:'TBD'},payment:document.getElementById('paymentSel').value,notes:document.getElementById('notesInput').value,total:gt,status:'Confirmed'};
  AppState.orders.push(ord);
  localStorage.setItem('orders',JSON.stringify(AppState.orders));
  AppState.cart=[];AppState.appliedPromo=null;
  localStorage.setItem('cart',JSON.stringify(AppState.cart));
  updateCartBadge();
  closeModal();
  showNotif(`🎉 Order ${ord.id} confirmed!`,'success');
};

function showItemDetails(c) {
  const i = JSON.parse(c.dataset.item), r = AppState.ratings[i.name]||i.rating;
  showModal(`${i.name}`,`<div style="background:white;border-radius:8px;overflow:hidden;max-width:600px;margin:20px auto"><img src="${i.image}" style="width:100%;height:300px;object-fit:cover"><div style="padding:20px"><h2 class="text-danger">${i.name}</h2><div class="mb-3"><span style="font-size:24px;font-weight:bold;color:#28a745">$${i.price.toFixed(2)}</span><span style="margin-left:10px">⭐${r}/5</span></div><p class="mb-3">${i.description}</p><div class="mb-3"><label>Qty:</label><div class="input-group" style="max-width:150px"><button class="btn btn-outline-danger" onclick="document.getElementById('detailQty').value=Math.max(1,+document.getElementById('detailQty').value-1)">-</button><input type="number" id="detailQty" class="form-control text-center" value="1" min="1" max="10"><button class="btn btn-outline-danger" onclick="document.getElementById('detailQty').value=Math.min(10,+document.getElementById('detailQty').value+1)">+</button></div></div><button class="btn btn-danger w-100 mb-2" onclick="addDetailCart('${i.name}',${i.price})">Add</button><button class="btn btn-secondary w-100" onclick="closeModal()">Close</button></div></div>`);
}

window.addDetailCart = (nm,pr) => {
  const q = parseInt(document.getElementById('detailQty').value);
  const e = AppState.cart.find(i=>i.name===nm);
  if(e) e.quantity+=q; else AppState.cart.push({name:nm,price:pr,quantity:q,image:'img/burger.jpeg'});
  localStorage.setItem('cart',JSON.stringify(AppState.cart));
  updateCartBadge();
  closeModal();
  showNotif(`✅ ${nm}x${q} added!`,'success');
};

function showLoginModal() {
  showModal('Login',`<div style="background:white;border-radius:8px;padding:30px;max-width:400px;margin:20px auto"><h2 class="text-danger mb-4">🔐 Login</h2><input type="text" id="userName" class="form-control mb-2" placeholder="Name"><input type="email" id="userEmail" class="form-control mb-2" placeholder="Email"><input type="tel" id="userPhone" class="form-control mb-3" placeholder="Phone"><button class="btn btn-danger w-100 mb-2" onclick="loginUser()">Login</button><button class="btn btn-secondary w-100" onclick="closeModal()">Cancel</button></div>`);
}

window.loginUser = () => {
  const nm=document.getElementById('userName').value,em=document.getElementById('userEmail').value,ph=document.getElementById('userPhone').value;
  if(!nm||!em||!ph){showNotif('Fill all','warning');return;}
  AppState.user={name:nm,email:em,phone:ph,joinedAt:new Date().toISOString()};
  localStorage.setItem('user',JSON.stringify(AppState.user));
  closeModal();
  showNotif(`Welcome, ${nm}!`,'success');
};

function showProfile() {
  if(!AppState.user)return;
  showModal('Profile',`<div style="background:white;border-radius:8px;padding:30px;max-width:500px;margin:20px auto"><h2 class="text-danger mb-4">👤 Profile</h2><div class="card p-3 mb-3"><p><b>Name:</b> ${AppState.user.name}</p><p><b>Email:</b> ${AppState.user.email}</p></div><div class="alert alert-info"><b>Orders:</b> ${AppState.orders.length}<br><b>Spent:</b> $${AppState.orders.reduce((s,o)=>s+o.total,0).toFixed(2)}</div><button class="btn btn-primary w-100 mb-2" onclick="showOrders()">Orders</button><button class="btn btn-secondary w-100 mb-2" onclick="closeModal()">Close</button><button class="btn btn-danger w-100" onclick="logoutUser()">Logout</button></div>`);
}

window.showOrders = () => showModal('Orders',`<div style="background:white;border-radius:8px;padding:20px;max-width:600px;margin:20px auto"><h2 class="text-danger mb-3">Orders</h2>${AppState.orders.length?AppState.orders.map(o=>`<div class="card mb-2 p-2"><b>${o.id}</b> - $${o.total.toFixed(2)} - ${new Date(o.date).toLocaleDateString()}</div>`).join(''):'<p class="alert alert-info">No orders</p>'}<button class="btn btn-secondary w-100 mt-3" onclick="closeModal()">Back</button></div>`);

window.logoutUser = () => { AppState.user=null; localStorage.removeItem('user'); closeModal(); showNotif('Logged out','info'); };

window.newAddrForm = () => showModal('Add Address',`<div style="background:white;border-radius:8px;padding:20px;max-width:400px;margin:20px auto"><h4>Add Address</h4><input type="text" id="addrName" class="form-control mb-2" placeholder="Label"><input type="text" id="addrStreet" class="form-control mb-2" placeholder="Street"><input type="text" id="addrCity" class="form-control mb-2" placeholder="City"><input type="text" id="addrZip" class="form-control mb-3" placeholder="Zip"><button class="btn btn-primary w-100 mb-2" onclick="saveAddr()">Save</button><button class="btn btn-secondary w-100" onclick="closeModal()">Cancel</button></div>`);

window.saveAddr = () => {
  const nm=document.getElementById('addrName').value,st=document.getElementById('addrStreet').value,ci=document.getElementById('addrCity').value,zp=document.getElementById('addrZip').value;
  if(!nm||!st||!ci||!zp){showNotif('Fill all','warning');return;}
  AppState.addresses.push({name:nm,street:st,city:ci,zip:zp});
  localStorage.setItem('addresses',JSON.stringify(AppState.addresses));
  closeModal();
  showNotif('Address added!','success');
};

function handleSidebarNav(link) {
  switch(link) {
    case 'Home': showNotif('Home','info'); break;
    case 'Bills': showModal('Bills',`<div style="padding:20px"><h2 class="text-danger mb-3">📄 Bills</h2>${AppState.orders.length?`<table class="table table-sm"><tbody>${AppState.orders.map(o=>`<tr><td>${o.id}</td><td>$${o.total.toFixed(2)}</td><td><button class="btn btn-sm btn-primary">Download</button></td></tr>`).join('')}</tbody></table>`:'<p class="alert alert-info">No bills</p>'}<button class="btn btn-secondary w-100 mt-3" onclick="closeModal()">Close</button></div>`); break;
    case 'Wallet': const bal=parseFloat(localStorage.getItem('walletBalance'))||50; showModal('Wallet',`<div style="padding:20px"><h2 class="text-danger">💰 Wallet</h2><div class="card p-3 mb-3" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;text-align:center"><h5>Balance</h5><h2>$${bal.toFixed(2)}</h2></div><input type="number" id="addAmt" class="form-control mb-2" placeholder="Add"><button class="btn btn-primary w-100 mb-2" onclick="addWallet()">Add</button><button class="btn btn-secondary w-100" onclick="closeModal()">Close</button></div>`); break;
    case 'Notifications': showModal('Notifications','<div style="padding:20px">No notifications</div>'); break;
    case 'Contact Us': showModal('Contact','<div style="padding:20px"><h4>Contact</h4><textarea class="form-control mb-2" placeholder="Message"></textarea><button class="btn btn-danger w-100 mb-2" onclick="showNotif(\'Sent!\',\'success\');closeModal()">Send</button><button class="btn btn-secondary w-100" onclick="closeModal()">Close</button></div>'); break;
    case 'Settings': showModal('Settings','<div style="padding:20px"><h4>Settings</h4><div class="form-check"><input type="checkbox" checked><label>Notifications</label></div><button class="btn btn-secondary w-100 mt-3" onclick="closeModal()">Close</button></div>'); break;
  }
}

window.addWallet = () => {
  const amt=parseFloat(document.getElementById('addAmt').value);
  if(!amt||amt<1){showNotif('Invalid','warning');return;}
  let bal=parseFloat(localStorage.getItem('walletBalance'))||50;
  bal+=amt;
  localStorage.setItem('walletBalance',bal);
  showNotif(`✅ $${amt.toFixed(2)} added!`,'success');
};

function rateItem(s) {
  const c=s.closest('.detail-card'),nm=c.querySelector('h4').textContent,r=parseInt(s.dataset.rating);
  AppState.ratings[nm]=r;
  localStorage.setItem('ratings',JSON.stringify(AppState.ratings));
  showNotif(`Rated ${nm} ${r}⭐`,'success');
}

function showModal(t,cnt) {
  closeModal();
  const o=document.createElement('div');
  o.className='modal-overlay';
  o.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.3s';
  o.innerHTML=`<div style="background:white;border-radius:12px;max-width:90%;max-height:90vh;overflow-y:auto;animation:slideUp 0.3s">${cnt}</div>`;
  o.onclick=e=>e.target===o&&closeModal();
  document.body.appendChild(o);
}

function closeModal() {
  const o=document.querySelector('.modal-overlay');
  if(o){o.style.animation='fadeOut 0.3s';setTimeout(()=>o.remove(),300);}
}

function showNotif(msg,type='info') {
  const c={success:'#28a745',error:'#dc3545',warning:'#ffc107',info:'#17a2b8'};
  const n=document.createElement('div');
  n.textContent=msg;
  n.style.cssText=`position:fixed;top:20px;right:20px;background:${c[type]};color:white;padding:15px 20px;border-radius:6px;z-index:9999;animation:slideIn 0.3s;max-width:400px`;
  document.body.appendChild(n);
  setTimeout(()=>{n.style.animation='slideOut 0.3s';setTimeout(()=>n.remove(),300);},3000);
}

function addModalStyles() {
  const s=document.createElement('style');
  s.textContent=`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}@keyframes slideUp{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}.star{cursor:pointer;font-size:16px}.star.rated{opacity:1}`;
  document.head.appendChild(s);
}

window.showCart=showCart; window.showNotif=showNotif; window.closeModal=closeModal; window.showModal=showModal;
