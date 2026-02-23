// ==========================================
// FOOD ORDERING SYSTEM - COMPLETE VERSION
// ==========================================

// Global State Management
const AppState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  selectedCategory: 'All Menus',
  ratings: JSON.parse(localStorage.getItem('ratings')) || {},
  appliedPromo: null,
  addresses: JSON.parse(localStorage.getItem('addresses')) || [],
  paymentMethods: JSON.parse(localStorage.getItem('paymentMethods')) || []
};

// Comprehensive Menu Data with 40+ Items
const MENU_DATA = {
  'All Menus': [],
  'Burger': [
    { id: 1, name: 'Classic Burger', price: 19.99, category: 'Burger', rating: 4.7, reviews: 389, description: 'Juicy beef patty, melted cheese, fresh lettuce, tomato, and signature sauce on a toasted bun.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 2, name: 'Spicy Burger', price: 22.49, category: 'Burger', rating: 4.5, reviews: 156, description: 'Fiery and bold with jalapenos and sriracha mayo.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 3, name: 'Double Cheese Burger', price: 24.99, category: 'Burger', rating: 4.8, reviews: 287, description: 'Two patties stacked with double cheddar cheese and caramelized onions.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 4, name: 'Mushroom Burger', price: 20.99, category: 'Burger', rating: 4.6, reviews: 198, description: 'Sautéed mushrooms with Swiss cheese and garlic aioli.', image: 'img/burger.jpeg', vegType: 'veg' },
    { id: 5, name: 'BBQ Bacon Burger', price: 25.99, category: 'Burger', rating: 4.9, reviews: 456, description: 'Crispy bacon, BBQ sauce, fried onions, and cheddar cheese.', image: 'img/burger.jpeg', vegType: 'non-veg' },
  ],
  'Pizza': [
    { id: 6, name: 'Margherita Pizza', price: 29.99, category: 'Pizza', rating: 4.6, reviews: 512, description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil leaves.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 7, name: 'Pepperoni Pizza', price: 34.99, category: 'Pizza', rating: 4.8, reviews: 623, description: 'Loaded with pepperoni and extra mozzarella cheese.', image: 'img/pizza.jpeg', vegType: 'non-veg' },
    { id: 8, name: 'Veggie Supreme', price: 31.99, category: 'Pizza', rating: 4.5, reviews: 342, description: 'Bell peppers, mushrooms, olives, onions, and fresh basil.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 9, name: 'Chicken Alfredo', price: 36.99, category: 'Pizza', rating: 4.7, reviews: 478, description: 'Grilled chicken, creamy alfredo sauce, and parmesan.', image: 'img/pizza.jpeg', vegType: 'non-veg' },
    { id: 10, name: 'Meat Lovers', price: 39.99, category: 'Pizza', rating: 4.9, reviews: 789, description: 'Pepperoni, sausage, ham, and bacon on a thick crust.', image: 'img/pizza.jpeg', vegType: 'non-veg' },
  ],
  'Drinks': [
    { id: 11, name: 'Fresh Orange Juice', price: 8.99, category: 'Drinks', rating: 4.4, reviews: 234, description: 'Freshly squeezed orange juice with no added sugar.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 12, name: 'Mango Lassi', price: 9.99, category: 'Drinks', rating: 4.6, reviews: 345, description: 'Creamy yogurt drink with fresh mango pulp.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 13, name: 'Iced Tea', price: 5.99, category: 'Drinks', rating: 4.3, reviews: 167, description: 'Refreshing iced tea with lemon and mint.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 14, name: 'Smoothie Bowl', price: 12.99, category: 'Drinks', rating: 4.7, reviews: 456, description: 'Thick smoothie topped with granola, coconut, and berries.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 15, name: 'Fresh Lemonade', price: 6.99, category: 'Drinks', rating: 4.5, reviews: 289, description: 'Homemade lemonade with fresh lime and mint leaves.', image: 'img/coffee.jpeg', vegType: 'veg' },
  ],
  'Ice Cream': [
    { id: 16, name: 'Vanilla Scoop', price: 5.99, category: 'Ice Cream', rating: 4.5, reviews: 378, description: 'Classic vanilla ice cream made with real vanilla beans.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 17, name: 'Chocolate Crunch', price: 7.99, category: 'Ice Cream', rating: 4.7, reviews: 512, description: 'Rich chocolate ice cream with crispy chocolate pieces.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 18, name: 'Strawberry Bliss', price: 7.99, category: 'Ice Cream', rating: 4.6, reviews: 423, description: 'Creamy strawberry ice cream with real fruit pieces.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 19, name: 'Mint Choco Chip', price: 8.99, category: 'Ice Cream', rating: 4.8, reviews: 634, description: 'Cool mint ice cream loaded with dark chocolate chips.', image: 'img/pizza.jpeg', vegType: 'veg' },
    { id: 20, name: 'Cookies & Cream', price: 8.99, category: 'Ice Cream', rating: 4.9, reviews: 756, description: 'Creamy vanilla with crushed cookie pieces throughout.', image: 'img/pizza.jpeg', vegType: 'veg' },
  ],
  'Coffee': [
    { id: 21, name: 'Espresso', price: 4.99, category: 'Coffee', rating: 4.6, reviews: 289, description: 'Strong, bold espresso shot for a quick energy boost.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 22, name: 'Cappuccino', price: 6.99, category: 'Coffee', rating: 4.7, reviews: 456, description: 'Perfect blend of espresso, steamed milk, and foam.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 23, name: 'Latte', price: 6.99, category: 'Coffee', rating: 4.7, reviews: 567, description: 'Smooth espresso with velvety steamed milk.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 24, name: 'Iced Coffee', price: 6.99, category: 'Coffee', rating: 4.5, reviews: 378, description: 'Cold refreshing coffee served over ice with cream.', image: 'img/coffee.jpeg', vegType: 'veg' },
    { id: 25, name: 'Mocha', price: 7.99, category: 'Coffee', rating: 4.8, reviews: 634, description: 'Rich espresso combined with chocolatey goodness.', image: 'img/coffee.jpeg', vegType: 'veg' },
  ],
  'Seafood': [
    { id: 26, name: 'Grilled Salmon', price: 32.99, category: 'Seafood', rating: 4.8, reviews: 528, description: 'Fresh Atlantic salmon grilled with lemon butter sauce.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 27, name: 'Shrimp Curry', price: 28.99, category: 'Seafood', rating: 4.6, reviews: 389, description: 'Tender shrimp in aromatic curry sauce with rice.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 28, name: 'Fish & Chips', price: 19.99, category: 'Seafood', rating: 4.5, reviews: 456, description: 'Crispy battered cod with golden fries and tartar sauce.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 29, name: 'Butter Garlic Prawns', price: 34.99, category: 'Seafood', rating: 4.9, reviews: 612, description: 'Succulent prawns sautéed in butter and garlic.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 30, name: 'Crab Cakes', price: 27.99, category: 'Seafood', rating: 4.7, reviews: 434, description: 'Golden crab cakes served with remoulade sauce.', image: 'img/burger.jpeg', vegType: 'non-veg' },
  ],
  'Chicken': [
    { id: 31, name: 'Grilled Chicken Breast', price: 18.99, category: 'Chicken', rating: 4.6, reviews: 345, description: 'Juicy grilled chicken breast with herbs and spices.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 32, name: 'Butter Chicken', price: 22.99, category: 'Chicken', rating: 4.8, reviews: 567, description: 'Tender chicken in creamy tomato butter sauce.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 33, name: 'Chicken Tikka', price: 21.99, category: 'Chicken', rating: 4.7, reviews: 478, description: 'Marinated chicken pieces with yogurt and spices.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 34, name: 'Spicy Chicken Wings', price: 17.99, category: 'Chicken', rating: 4.5, reviews: 389, description: 'Crispy wings coated in spicy buffalo sauce.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 35, name: 'Teriyaki Chicken', price: 23.99, category: 'Chicken', rating: 4.7, reviews: 512, description: 'Glazed chicken with sweet and savory teriyaki.', image: 'img/burger.jpeg', vegType: 'non-veg' },
  ],
  'Mutton': [
    { id: 36, name: 'Mutton Curry', price: 26.99, category: 'Mutton', rating: 4.7, reviews: 423, description: 'Slow-cooked mutton in aromatic spiced curry.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 37, name: 'Tandoori Mutton', price: 28.99, category: 'Mutton', rating: 4.8, reviews: 534, description: 'Marinated mutton chops roasted in tandoor.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 38, name: 'Mutton Biryani', price: 24.99, category: 'Mutton', rating: 4.6, reviews: 389, description: 'Fragrant rice cooked with tender mutton pieces.', image: 'img/burger.jpeg', vegType: 'non-veg' },
    { id: 39, name: 'Keema Mutton', price: 22.99, category: 'Mutton', rating: 4.5, reviews: 312, description: 'Minced mutton cooked with onions and spices.', image: 'img/burger.jpeg', vegType: 'non-veg' },
  ],
  'Egg': [
    { id: 40, name: 'Scrambled Eggs', price: 8.99, category: 'Egg', rating: 4.4, reviews: 234, description: 'Fluffy scrambled eggs with butter and herbs.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 41, name: 'Boiled Eggs', price: 6.99, category: 'Egg', rating: 4.3, reviews: 156, description: 'Perfectly boiled eggs served with salt and pepper.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 42, name: 'Omelette', price: 10.99, category: 'Egg', rating: 4.6, reviews: 378, description: 'Fluffy omelette with cheese, vegetables, and ham.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 43, name: 'Egg Fried Rice', price: 12.99, category: 'Egg', rating: 4.7, reviews: 456, description: 'Golden rice with scrambled eggs and vegetables.', image: 'img/nutrition.jpeg', vegType: 'veg' },
  ],
  'Soup': [
    { id: 44, name: 'Tomato Soup', price: 7.99, category: 'Soup', rating: 4.5, reviews: 289, description: 'Creamy tomato soup with fresh basil and croutons.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 45, name: 'Chicken Soup', price: 10.99, category: 'Soup', rating: 4.6, reviews: 345, description: 'Warm chicken broth with vegetables and noodles.', image: 'img/nutrition.jpeg', vegType: 'non-veg' },
    { id: 46, name: 'Mushroom Soup', price: 8.99, category: 'Soup', rating: 4.4, reviews: 267, description: 'Creamy mushroom soup with garlic and herbs.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 47, name: 'Seafood Soup', price: 14.99, category: 'Soup', rating: 4.7, reviews: 412, description: 'Rich soup with shrimp, fish, and fresh seafood.', image: 'img/nutrition.jpeg', vegType: 'non-veg' },
  ],
  'Healthy': [
    { id: 48, name: 'Veg & Healthy Bowl', price: 12.99, category: 'Healthy', rating: 4.5, reviews: 245, description: 'A wholesome mix of fresh veggies, grains, and herbs for a light yet filling meal.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 49, name: 'Quinoa Salad', price: 14.99, category: 'Healthy', rating: 4.6, reviews: 378, description: 'Protein-rich quinoa with fresh vegetables and olive oil.', image: 'img/nutrition.jpeg', vegType: 'veg' },
    { id: 50, name: 'Grilled Chicken Salad', price: 16.99, category: 'Healthy', rating: 4.7, reviews: 456, description: 'Mixed greens with grilled chicken, nuts, and vinaigrette.', image: 'img/nutrition.jpeg', vegType: 'non-veg' },
    { id: 51, name: 'Nutritious Smoothie', price: 11.99, category: 'Healthy', rating: 4.6, reviews: 323, description: 'Packed with fruits, nuts, and protein powder.', image: 'img/nutrition.jpeg', vegType: 'veg' },
  ]
};

// Populate "All Menus" with items from all categories
Object.keys(MENU_DATA).forEach(category => {
  if (category !== 'All Menus') {
    MENU_DATA['All Menus'].push(...MENU_DATA[category]);
  }
});

// ==========================================
// DYNAMIC MENU RENDERING
// ==========================================

function renderMenuItems(category = 'All Menus', searchQuery = '') {
  const wrapper = document.getElementById('dynamicMenuItems');
  if (!wrapper) return;

  wrapper.innerHTML = ''; // Clear existing items

  const itemsToShow = category === 'All Menus' 
    ? MENU_DATA['All Menus'] 
    : (MENU_DATA[category] || []);

  const filteredItems = searchQuery
    ? itemsToShow.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : itemsToShow;

  if (filteredItems.length === 0) {
    wrapper.innerHTML = '<p class="alert alert-warning w-100">No items found</p>';
    return;
  }

  filteredItems.forEach((item, index) => {
    const isFavorite = AppState.favorites.includes(item.name);
    const cardHTML = `
      <div class="detail-card bg-light p-3 rounded position-relative d-flex" data-item-id="${index}" data-item-name="${item.name}" data-item-price="${item.price}">
        <img src="${item.image}" alt="${item.name}" class="detail-img rounded me-3">
        <div>
          <h4>${item.name}</h4>
          <p class="detail-sub">${item.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p class="price text-success fw-bold">$${item.price.toFixed(2)}</p>
            <small class="text-muted">⭐ ${item.rating} (${item.reviews})</small>
          </div>
        </div>
        <ion-icon class="detail-favourites position-absolute top-0 end-0 text-danger" name="${isFavorite ? 'heart' : 'heart-outline'}" style="${isFavorite ? 'color: #dc3545;' : ''}"></ion-icon>
      </div>
    `;
    wrapper.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Re-initialize detail cards features for new items
  setTimeout(() => {
    initializeDetailCards();
    initializeFavorites();
    initializeRatings();
  }, 100);
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🍔 Food Ordering System Initializing...');
  initializeNavBar();
  initializeCarousel();
  renderMenuItems(); // Render all items dynamically
  initializeFavorites();
  initializeSearch();
  initializeFilterCards();
  initializeCart();
  initializeUserProfile();
  initializeDetailCards();
  initializeRatings();
  initializeModals();
  loadCartBadge();
  addCheckoutModal();
  console.log('✅ All systems loaded!');
});

// ==========================================
// 1. NAVBAR & SIDEBAR
// ==========================================

function initializeNavBar() {
  const sidebarLinks = document.querySelectorAll('.sidebar-menus a');
  
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const linkText = this.textContent.trim();
      
      switch(linkText) {
        case 'Home':
          showNotification('Home page loaded', 'info');
          break;
        case 'Bills':
          showBillsPage();
          break;
        case 'Wallet':
          showWalletPage();
          break;
        case 'Notifications':
          showNotificationsCenter();
          break;
        case 'Contact Us':
          showContactForm();
          break;
        case 'Settings':
          showSettingsPage();
          break;
      }
    });
  });

  // Update user name in sidebar if logged in
  if (AppState.user) {
    const sidebarTitle = document.querySelector('.offcanvas-title');
    if (sidebarTitle) {
      sidebarTitle.textContent = AppState.user.name || 'Foodie';
    }
  }
}

// ==========================================
// 2. CAROUSEL WITH SWIPE SUPPORT
// ==========================================

function initializeCarousel() {
  // Recommendations carousel
  const highlightWrapper = document.querySelector('.highlight-wrapper');
  const backBtn = document.querySelector('.main-arrow .back');
  const nextBtn = document.querySelector('.main-arrow .next');

  if (backBtn && nextBtn && highlightWrapper) {
    backBtn.addEventListener('click', () => {
      highlightWrapper.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      highlightWrapper.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Touch swipe support
    let touchStartX = 0;
    highlightWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    highlightWrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        nextBtn.click();
      } else if (touchEndX - touchStartX > 50) {
        backBtn.click();
      }
    });
  }

  // Menu category carousel
  const filterWrapper = document.querySelector('.filter-wrapper');
  const backMenusBtn = document.querySelector('.main-arrow .back-menus');
  const nextMenusBtn = document.querySelector('.main-arrow .next-menus');

  if (backMenusBtn && nextMenusBtn && filterWrapper) {
    backMenusBtn.addEventListener('click', () => {
      filterWrapper.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextMenusBtn.addEventListener('click', () => {
      filterWrapper.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

// ==========================================
// 3. FAVORITES WITH HEART ANIMATION
// ==========================================

function initializeFavorites() {
  const favoriteIcons = document.querySelectorAll('.detail-favourites');

  favoriteIcons.forEach((icon) => {
    // Skip if already initialized
    if (icon.classList.contains('fav-initialized')) return;
    icon.classList.add('fav-initialized');

    const card = icon.closest('.detail-card');
    const itemName = card.querySelector('h4').textContent;
    
    // Check if already favorited
    if (AppState.favorites.includes(itemName)) {
      icon.setAttribute('name', 'heart');
      icon.style.color = '#dc3545';
    } else {
      icon.setAttribute('name', 'heart-outline');
      icon.style.color = '';
    }

    icon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (AppState.favorites.includes(itemName)) {
        AppState.favorites = AppState.favorites.filter(fav => fav !== itemName);
        this.setAttribute('name', 'heart-outline');
        this.style.color = '';
        showNotification(`${itemName} removed from favorites`, 'info');
      } else {
        AppState.favorites.push(itemName);
        this.setAttribute('name', 'heart');
        this.style.color = '#dc3545';
        this.style.animation = 'heartBeat 0.6s';
        showNotification(`❤️ ${itemName} added to favorites!`, 'success');
      }

      localStorage.setItem('favorites', JSON.stringify(AppState.favorites));
    });

    icon.style.cursor = 'pointer';
    icon.style.transition = 'all 0.3s ease';
  });
}

// ==========================================
// 4. ADVANCED SEARCH WITH FILTERS
// ==========================================

function initializeSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');

  if (!searchInput || !searchBtn) return;

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const category = AppState.selectedCategory;
    
    if (query === '') {
      renderMenuItems(category);
      return;
    }

    renderMenuItems(category, query);
  }

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Live search as user types
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 1 || searchInput.value.length === 0) {
      performSearch();
    }
  });
}

// ==========================================
// 5. ADVANCED FILTER SYSTEM
// ==========================================

function initializeFilterCards() {
  const filterCards = document.querySelectorAll('.filter-card');

  filterCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.style.transition = 'all 0.3s ease';

    card.addEventListener('click', function() {
      filterCards.forEach(c => {
        c.classList.remove('border', 'border-danger', 'border-3');
        c.style.backgroundColor = '';
        c.style.transform = 'scale(1)';
      });

      this.classList.add('border', 'border-danger', 'border-3');
      this.style.backgroundColor = '#ffe6e6';
      this.style.transform = 'scale(1.08)';

      const category = this.querySelector('p').textContent.trim();
      AppState.selectedCategory = category;
      filterByCategory(category);
      showNotification(`✅ Filtered by: ${category}`, 'info');
    });

    // Hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('border-danger')) {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
      }
    });
  });
}

function filterByCategory(category) {
  AppState.selectedCategory = category;
  renderMenuItems(category);
  showNotification(`✅ Showing: ${category}`, 'info');
}

// ==========================================
// 6. DETAILED CARD INTERACTIONS
// ==========================================

function initializeDetailCards() {
  const detailCards = document.querySelectorAll('.detail-card');

  detailCards.forEach((card, index) => {
    // Skip if already initialized
    if (card.classList.contains('initialized')) return;
    card.classList.add('initialized');

    // Store data attributes
    const title = card.querySelector('h4').textContent;
    const priceText = card.getAttribute('data-item-price');
    const priceValue = parseFloat(priceText);

    card.setAttribute('data-item-id', index);
    card.setAttribute('data-item-name', title);
    card.setAttribute('data-item-price', priceValue);
    card.style.cursor = 'pointer';

    // Remove old quantity container if exists
    const oldContainer = card.querySelector('.d-flex.gap-2.align-items-center');
    if (oldContainer) oldContainer.remove();

    // Create quantity controls
    const quantityContainer = document.createElement('div');
    quantityContainer.className = 'd-flex gap-2 align-items-center';
    quantityContainer.style.marginTop = '10px';

    quantityContainer.innerHTML = `
      <button class="btn btn-sm btn-outline-danger qty-decrease">-</button>
      <span class="qty-value" style="min-width: 30px; text-align: center;">1</span>
      <button class="btn btn-sm btn-outline-danger qty-increase">+</button>
      <button class="btn btn-danger btn-sm flex-grow-1 add-to-cart-btn">Add to Cart</button>
    `;

    card.appendChild(quantityContainer);

    let quantity = 1;
    const qtyValue = quantityContainer.querySelector('.qty-value');
    const decreaseBtn = quantityContainer.querySelector('.qty-decrease');
    const increaseBtn = quantityContainer.querySelector('.qty-increase');
    const addToCartBtn = quantityContainer.querySelector('.add-to-cart-btn');

    decreaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quantity > 1) {
        quantity--;
        qtyValue.textContent = quantity;
      }
    });

    increaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quantity < 10) {
        quantity++;
        qtyValue.textContent = quantity;
      }
    });

    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCartWithQuantity(index, title, priceValue, quantity);
      quantity = 1;
      qtyValue.textContent = quantity;
    });

    // Click on card to show details
    card.addEventListener('click', function(e) {
      if (e.target.closest('.add-to-cart-btn') || 
          e.target.closest('.qty-decrease') || 
          e.target.closest('.qty-increase') ||
          e.target.closest('.detail-favourites')) {
        return;
      }
      showItemDetails(index, title);
    });
  });
}

// ==========================================
// 7. SHOPPING CART SYSTEM
// ==========================================

function initializeCart() {
  const cartIcon = document.querySelector('.cart');

  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      showCartPage();
    });
  }

  loadCartBadge();
}

function addToCartWithQuantity(itemId, itemName, itemPrice, quantity) {
  const existingItem = AppState.cart.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += quantity;
    showNotification(`${itemName} quantity increased to ${existingItem.quantity}!`, 'info');
  } else {
    AppState.cart.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      quantity: quantity,
      addedAt: new Date().toISOString()
    });
    showNotification(`✅ ${itemName} x${quantity} added to cart!`, 'success');
  }

  localStorage.setItem('cart', JSON.stringify(AppState.cart));
  loadCartBadge();
}

function loadCartBadge() {
  const cartIcon = document.querySelector('.cart');
  let badge = cartIcon?.querySelector('.cart-badge');

  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.style.cssText = `
        position: absolute;
        background-color: #dc3545;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        top: -5px;
        right: -5px;
      `;
      cartIcon.style.position = 'relative';
      cartIcon.appendChild(badge);
    }
    badge.textContent = totalItems;
  } else if (badge) {
    badge.remove();
  }
}

function showCartPage() {
  if (AppState.cart.length === 0) {
    showNotification('🛒 Your cart is empty!', 'warning');
    return;
  }

  let cartHTML = '<div style="background: white; border-radius: 8px; padding: 20px; max-width: 600px; margin: 20px auto;">';
  cartHTML += '<h2 class="text-danger mb-4">🛒 Shopping Cart</h2>';
  cartHTML += '<table class="table table-striped">';
  cartHTML += '<thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th>Action</th></tr></thead><tbody>';

  let grandTotal = 0;

  AppState.cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;
    cartHTML += `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" max="10" value="${item.quantity}" class="form-control form-control-sm" style="width: 60px;" data-index="${index}"></td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });

  cartHTML += '</tbody></table>';

  // Discount section
  cartHTML += `
    <div class="mb-3">
      <label class="form-label">Apply Promo Code:</label>
      <div class="input-group">
        <input type="text" id="promoInput" class="form-control" placeholder="Enter promo code">
        <button class="btn btn-warning" onclick="applyPromoCode()">Apply</button>
      </div>
      <small class="text-muted d-block mt-2">Available codes: SAVE10, SAVE20, FAST50</small>
    </div>
  `;

  // Totals
  const discount = calculateDiscount(grandTotal);
  const finalTotal = grandTotal - discount;
  const tax = finalTotal * 0.05;
  const deliveryFee = 2.99;
  const orderTotal = finalTotal + tax + deliveryFee;

  cartHTML += `
    <div class="card p-3 bg-light mb-3">
      <div class="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <span>$${grandTotal.toFixed(2)}</span>
      </div>
      ${discount > 0 ? `
        <div class="d-flex justify-content-between mb-2 text-success">
          <span>Discount (${AppState.appliedPromo}):</span>
          <span>-$${discount.toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="d-flex justify-content-between mb-2">
        <span>Tax (5%):</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="d-flex justify-content-between mb-3">
        <span>Delivery Fee:</span>
        <span>$${deliveryFee.toFixed(2)}</span>
      </div>
      <hr>
      <div class="d-flex justify-content-between" style="font-size: 18px; font-weight: bold;">
        <span>Total:</span>
        <span class="text-danger">$${orderTotal.toFixed(2)}</span>
      </div>
    </div>
  `;

  cartHTML += `
    <div class="d-flex gap-2">
      <button class="btn btn-secondary flex-grow-1" onclick="closeCartModal()">Continue Shopping</button>
      <button class="btn btn-danger flex-grow-1" onclick="proceedToCheckout()">Checkout</button>
    </div>
  `;

  cartHTML += '</div>';

  showModal('Shopping Cart', cartHTML);

  // Update quantity listeners
  document.querySelectorAll('input[data-index]').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      const newQty = parseInt(e.target.value);
      if (newQty > 0 && newQty <= 10) {
        AppState.cart[index].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(AppState.cart));
        loadCartBadge();
        showCartPage(); // Refresh
      }
    });
  });
}

function removeFromCart(index) {
  const itemName = AppState.cart[index].name;
  AppState.cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(AppState.cart));
  loadCartBadge();
  showNotification(`${itemName} removed from cart`, 'info');
  if (AppState.cart.length === 0) {
    closeCartModal();
  } else {
    showCartPage();
  }
}

function calculateDiscount(subtotal) {
  if (!AppState.appliedPromo) return 0;
  
  const promos = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'FAST50': 5.00
  };
  
  return promos[AppState.appliedPromo] > 1 ? 
    promos[AppState.appliedPromo] : 
    subtotal * promos[AppState.appliedPromo];
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const code = input.value.toUpperCase().trim();

  const validCodes = ['SAVE10', 'SAVE20', 'FAST50'];

  if (!code) {
    showNotification('Please enter a promo code', 'warning');
    return;
  }

  if (validCodes.includes(code)) {
    AppState.appliedPromo = code;
    const discount = calculateDiscount(AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    showNotification(`✅ Promo "${code}" applied! Saving $${discount.toFixed(2)}`, 'success');
    showCartPage();
  } else {
    showNotification('Invalid promo code!', 'error');
    input.value = '';
  }
}

function proceedToCheckout() {
  showCheckoutModal();
}

function closeCartModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) modalOverlay.remove();
}

// ==========================================
// 8. USER PROFILE & AUTHENTICATION
// ==========================================

function initializeUserProfile() {
  const userIcon = document.querySelector('.user');

  if (userIcon) {
    userIcon.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (AppState.user) {
        showUserProfile();
      } else {
        showLoginModal();
      }
    });
  }
}

function showLoginModal() {
  let loginHTML = `
    <div style="background: white; border-radius: 8px; padding: 30px; max-width: 400px; margin: 20px auto;">
      <h2 class="text-danger mb-4">🔐 Login</h2>
      <form id="loginForm">
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input type="text" id="userName" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" id="userEmail" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input type="tel" id="userPhone" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-danger w-100 mb-2">Login</button>
        <button type="button" class="btn btn-secondary w-100" onclick="closeModal()">Cancel</button>
      </form>
    </div>
  `;

  showModal('User Login', loginHTML);

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    AppState.user = {
      name: document.getElementById('userName').value,
      email: document.getElementById('userEmail').value,
      phone: document.getElementById('userPhone').value,
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(AppState.user));
    closeModal();
    showNotification(`👋 Welcome, ${AppState.user.name}!`, 'success');
    initializeNavBar();
  });
}

function showUserProfile() {
  if (!AppState.user) return;

  let profileHTML = `
    <div style="background: white; border-radius: 8px; padding: 30px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-4">👤 My Profile</h2>
      
      <div class="card mb-3">
        <div class="card-body">
          <p><strong>Name:</strong> ${AppState.user.name}</p>
          <p><strong>Email:</strong> ${AppState.user.email}</p>
          <p><strong>Phone:</strong> ${AppState.user.phone}</p>
          <p><strong>Member Since:</strong> ${new Date(AppState.user.joinedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div class="alert alert-info mb-3">
        <strong>📊 Stats:</strong><br>
        Total Orders: <strong>${AppState.orders.length}</strong><br>
        Total Spent: <strong>$${AppState.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</strong><br>
        Favorites: <strong>${AppState.favorites.length}</strong>
      </div>

      <button class="btn btn-primary w-100 mb-2" onclick="showAddressBook()">📍 Manage Addresses</button>
      <button class="btn btn-primary w-100 mb-2" onclick="showPaymentMethods()">💳 Payment Methods</button>
      <button class="btn btn-warning w-100 mb-2" onclick="showMyOrders()">📋 My Orders</button>
      <button class="btn btn-danger w-100" onclick="logoutUser()">Logout</button>
    </div>
  `;

  showModal('User Profile', profileHTML);
}

function logoutUser() {
  AppState.user = null;
  localStorage.removeItem('user');
  closeModal();
  showNotification('👋 Logged out successfully!', 'info');
  initializeNavBar();
}

// ==========================================
// 9. RATINGS & REVIEWS
// ==========================================

function initializeRatings() {
  const detailCards = document.querySelectorAll('.detail-card');

  detailCards.forEach(card => {
    // Skip if already initialized
    if (card.classList.contains('rating-initialized')) return;
    card.classList.add('rating-initialized');

    const itemName = card.querySelector('h4').textContent;
    
    // Check if rating container already exists
    let ratingContainer = card.querySelector('.stars');
    if (ratingContainer) return; // Already initialized

    ratingContainer = document.createElement('div');
    ratingContainer.className = 'd-flex align-items-center gap-2 mt-2';
    ratingContainer.innerHTML = `
      <div class="stars" style="cursor: pointer; font-size: 16px;">
        <span class="star" data-rating="1">⭐</span>
        <span class="star" data-rating="2">⭐</span>
        <span class="star" data-rating="3">⭐</span>
        <span class="star" data-rating="4">⭐</span>
        <span class="star" data-rating="5">⭐</span>
      </div>
      <span class="user-rating" style="font-size: 12px; color: #666;">Not rated</span>
    </div>
    `;

    card.appendChild(ratingContainer);

    const stars = ratingContainer.querySelectorAll('.star');
    const userRatingSpan = ratingContainer.querySelector('.user-rating');

    const savedRating = AppState.ratings[itemName];
    if (savedRating) {
      updateStarDisplay(stars, savedRating);
      userRatingSpan.textContent = `You rated: ${savedRating} ⭐`;
    }

    stars.forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        AppState.ratings[itemName] = rating;
        localStorage.setItem('ratings', JSON.stringify(AppState.ratings));
        updateStarDisplay(stars, rating);
        userRatingSpan.textContent = `You rated: ${rating} ⭐`;
        showNotification(`Thanks for rating ${itemName} ${rating} stars!`, 'success');
      });

      star.addEventListener('mouseenter', function() {
        const hoverRating = parseInt(this.dataset.rating);
        updateStarDisplay(stars, hoverRating);
      });
    });

    ratingContainer.addEventListener('mouseleave', function() {
      if (savedRating) {
        updateStarDisplay(stars, savedRating);
      } else {
        stars.forEach(s => s.style.opacity = '0.3');
      }
    });
  });
}

function updateStarDisplay(stars, rating) {
  stars.forEach(star => {
    star.style.opacity = parseInt(star.dataset.rating) <= rating ? '1' : '0.3';
  });
}

// ==========================================
// 10. ITEM DETAILS MODAL
// ==========================================

function showItemDetails(itemId, itemName) {
  // Find the item in MENU_DATA
  let itemData = null;
  
  Object.values(MENU_DATA).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      const found = categoryItems.find(item => item.name === itemName);
      if (found) itemData = found;
    }
  });

  if (!itemData) return;

  const price = itemData.price;
  const description = itemData.description;
  const image = itemData.image;
  const rating = AppState.ratings[itemName] || itemData.rating;

  let detailsHTML = `
    <div style="background: white; border-radius: 8px; overflow: hidden; max-width: 600px; margin: 20px auto;">
      <img src="${image}" alt="${itemName}" style="width: 100%; height: 300px; object-fit: cover;">
      
      <div style="padding: 20px;">
        <h2 class="text-danger mb-2">${itemName}</h2>
        
        <div class="mb-3">
          <span style="font-size: 24px; font-weight: bold; color: #28a745;">$${price.toFixed(2)}</span>
          <span style="margin-left: 10px;">⭐ ${rating}/5</span>
        </div>

        <p class="mb-3">${description}</p>

        <div class="alert alert-success" style="font-size: 14px;">
          ✅ Fresh ingredients | 🚚 Free delivery on orders $30+ | ❄️ Temperature controlled
        </div>

        <div class="mb-3">
          <h5>Choose Quantity:</h5>
          <div class="input-group mb-2" style="max-width: 200px;">
            <button class="btn btn-outline-danger" id="modalQtyDecrease">-</button>
            <input type="number" id="modalQty" class="form-control text-center" value="1" min="1" max="10">
            <button class="btn btn-outline-danger" id="modalQtyIncrease">+</button>
          </div>
        </div>

        <button class="btn btn-danger w-100 mb-2" id="modalAddToCart">Add to Cart</button>
        <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;

  showModal(`${itemName} Details`, detailsHTML);

  let modalQty = 1;
  const modalQtyInput = document.getElementById('modalQty');
  const modalDecrease = document.getElementById('modalQtyDecrease');
  const modalIncrease = document.getElementById('modalQtyIncrease');
  const modalAddBtn = document.getElementById('modalAddToCart');

  modalDecrease.addEventListener('click', () => {
    if (modalQty > 1) {
      modalQty--;
      modalQtyInput.value = modalQty;
    }
  });

  modalIncrease.addEventListener('click', () => {
    if (modalQty < 10) {
      modalQty++;
      modalQtyInput.value = modalQty;
    }
  });

  modalQtyInput.addEventListener('change', () => {
    modalQty = Math.max(1, Math.min(10, parseInt(modalQtyInput.value) || 1));
    modalQtyInput.value = modalQty;
  });

  modalAddBtn.addEventListener('click', () => {
    addToCartWithQuantity(itemId, itemName, price, modalQty);
    closeModal();
  });
}

// ==========================================
// 11. CHECKOUT SYSTEM
// ==========================================

function showCheckoutModal() {
  if (!AppState.user) {
    showNotification('Please login to proceed with checkout', 'warning');
    showLoginModal();
    return;
  }

  let checkoutHTML = `
    <div style="background: white; border-radius: 8px; padding: 30px; max-width: 600px; margin: 20px auto;">
      <h2 class="text-danger mb-4">📦 Checkout</h2>

      <div class="card mb-3">
        <div class="card-header bg-danger text-white">
          <strong>Delivery Address</strong>
        </div>
        <div class="card-body">
          <select id="addressSelect" class="form-select mb-2">
            <option value="">Select an address</option>
            ${AppState.addresses.map((addr, i) => 
              `<option value="${i}">${addr.name} - ${addr.street}</option>`
            ).join('')}
          </select>
          <button class="btn btn-sm btn-primary" onclick="addNewAddress()">+ Add New Address</button>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header bg-danger text-white">
          <strong>Payment Method</strong>
        </div>
        <div class="card-body">
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="payment" value="credit" id="creditCard" checked>
            <label class="form-check-label" for="creditCard">
              💳 Credit/Debit Card
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="payment" value="wallet" id="wallet">
            <label class="form-check-label" for="wallet">
              💰 Wallet (Balance: $${(parseFloat(localStorage.getItem('walletBalance')) || 50).toFixed(2)})
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="payment" value="upi" id="upi">
            <label class="form-check-label" for="upi">
              📱 UPI/Digital Payment
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="payment" value="cod" id="cod">
            <label class="form-check-label" for="cod">
              🚚 Cash on Delivery
            </label>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-header bg-danger text-white">
          <strong>Delivery Instructions (Optional)</strong>
        </div>
        <div class="card-body">
          <textarea id="specialInstructions" class="form-control" placeholder="E.g., Ring doorbell, leave at door, etc." rows="3"></textarea>
        </div>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-secondary flex-grow-1" onclick="closeCartModal()">Back</button>
        <button class="btn btn-danger flex-grow-1" onclick="completeOrder()">Complete Order</button>
      </div>
    </div>
  `;

  showModal('Checkout', checkoutHTML);
}

function addNewAddress() {
  let addressHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 400px; margin: 20px auto;">
      <h4>Add New Address</h4>
      <div class="mb-2">
        <label class="form-label">Address Label (Home/Work/Other)</label>
        <input type="text" id="addrLabel" class="form-control" placeholder="e.g., Home">
      </div>
      <div class="mb-2">
        <label class="form-label">Street Address</label>
        <input type="text" id="addrStreet" class="form-control" placeholder="123 Main St">
      </div>
      <div class="mb-2">
        <label class="form-label">City</label>
        <input type="text" id="addrCity" class="form-control">
      </div>
      <div class="mb-2">
        <label class="form-label">Zip Code</label>
        <input type="text" id="addrZip" class="form-control">
      </div>
      <button class="btn btn-primary w-100 mb-2" onclick="saveAddress()">Save Address</button>
      <button class="btn btn-secondary w-100" onclick="closeModal()">Cancel</button>
    </div>
  `;

  showModal('Add Address', addressHTML);
}

function saveAddress() {
  const label = document.getElementById('addrLabel').value;
  const street = document.getElementById('addrStreet').value;
  const city = document.getElementById('addrCity').value;
  const zip = document.getElementById('addrZip').value;

  if (!label || !street || !city || !zip) {
    showNotification('Please fill all address fields', 'warning');
    return;
  }

  AppState.addresses.push({
    name: label,
    street,
    city,
    zip
  });

  localStorage.setItem('addresses', JSON.stringify(AppState.addresses));
  closeModal();
  showNotification('Address added successfully!', 'success');
  showCheckoutModal();
}

function completeOrder() {
  const addressSelect = document.getElementById('addressSelect');
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  const specialInstructions = document.getElementById('specialInstructions').value;

  if (!addressSelect.value) {
    showNotification('Please select a delivery address', 'warning');
    return;
  }

  const selectedAddress = AppState.addresses[parseInt(addressSelect.value)];
  const selectedPayment = paymentMethod.value;

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = calculateDiscount(subtotal);
  const tax = (subtotal - discount) * 0.05;
  const deliveryFee = 2.99;
  const total = (subtotal - discount) + tax + deliveryFee;

  const order = {
    id: 'ORD' + Date.now(),
    date: new Date().toISOString(),
    items: [...AppState.cart],
    address: selectedAddress,
    paymentMethod: selectedPayment,
    instructions: specialInstructions,
    subtotal,
    discount,
    tax,
    deliveryFee,
    total,
    status: 'Confirmed',
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString() // 45 mins
  };

  AppState.orders.push(order);
  localStorage.setItem('orders', JSON.stringify(AppState.orders));

  // Clear cart and promo
  AppState.cart = [];
  AppState.appliedPromo = null;
  localStorage.setItem('cart', JSON.stringify(AppState.cart));
  loadCartBadge();

  closeModal();
  showOrderConfirmation(order);
}

function showOrderConfirmation(order) {
  let confirmHTML = `
    <div style="background: white; border-radius: 8px; padding: 30px; max-width: 500px; margin: 20px auto; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
      <h2 class="text-success mb-3">Order Confirmed!</h2>
      
      <div class="card mb-3">
        <div class="card-body">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Total Amount:</strong> <span style="font-size: 24px; color: #28a745;">$${order.total.toFixed(2)}</span></p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
          <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
          <p><strong>Delivery Address:</strong> ${order.address.street}, ${order.address.city}</p>
        </div>
      </div>

      <div class="alert alert-info">
        🚚 Your order is being prepared<br>
        Track your order in "My Orders"
      </div>

      <button class="btn btn-danger w-100" onclick="closeModal()">Back to Home</button>
    </div>
  `;

  showModal('Order Confirmed', confirmHTML);
  showNotification('🎉 Order placed successfully! Check your email for confirmation.', 'success');
}

function showMyOrders() {
  if (AppState.orders.length === 0) {
    showNotification('You haven\'t placed any orders yet', 'info');
    closeModal();
    return;
  }

  let ordersHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 700px; margin: 20px auto;">
      <h2 class="text-danger mb-4">📋 My Orders</h2>
  `;

  AppState.orders.forEach(order => {
    ordersHTML += `
      <div class="card mb-3">
        <div class="card-header bg-danger text-white">
          <strong>${order.id}</strong> - ${new Date(order.date).toLocaleDateString()}
        </div>
        <div class="card-body">
          <p><strong>Status:</strong> <span class="badge bg-success">${order.status}</span></p>
          <p><strong>Items:</strong> ${order.items.length} item(s)</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p><strong>Delivery:</strong> ${order.address.street}</p>
          <button class="btn btn-sm btn-primary" onclick="showOrderDetails('${order.id}')">View Details</button>
        </div>
      </div>
    `;
  });

  ordersHTML += '</div>';
  showModal('My Orders', ordersHTML);
}

function showOrderDetails(orderId) {
  const order = AppState.orders.find(o => o.id === orderId);
  if (!order) return;

  let detailsHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h3>${order.id}</h3>
      
      <h5>Order Items:</h5>
      <table class="table table-sm table-striped mb-3">
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>x${item.quantity}</td>
              <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="card p-2 mb-3 bg-light">
        <p><strong>Delivery Address:</strong><br>${order.address.street}, ${order.address.city}, ${order.address.zip}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
        <p><strong>Order Status:</strong> <span class="badge bg-success">${order.status}</span></p>
        ${order.instructions ? `<p><strong>Instructions:</strong> ${order.instructions}</p>` : ''}
      </div>

      <button class="btn btn-secondary w-100" onclick="showMyOrders()">Back</button>
    </div>
  `;

  showModal('Order Details', detailsHTML);
}

// ==========================================
// 12. SIDEBAR FEATURES
// ==========================================

function showBillsPage() {
  let billsHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 600px; margin: 20px auto;">
      <h2 class="text-danger mb-3">📄 Bills & Invoices</h2>
      ${AppState.orders.length === 0 ? 
        '<p class="alert alert-info">No bills yet. Place an order to get started!</p>' :
        `<table class="table table-striped">
          <thead>
            <tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Action</th></tr>
          </thead>
          <tbody>
            ${AppState.orders.map(order => `
              <tr>
                <td>${order.id}</td>
                <td>${new Date(order.date).toLocaleDateString()}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><button class="btn btn-sm btn-primary" onclick="downloadInvoice('${order.id}')">Download</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>`
      }
      <button class="btn btn-secondary w-100 mt-3" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Bills & Invoices', billsHTML);
}

function downloadInvoice(orderId) {
  const order = AppState.orders.find(o => o.id === orderId);
  showNotification(`Downloading invoice for ${orderId}...`, 'info');
  // Simulate download
  setTimeout(() => {
    showNotification(`✅ Invoice downloaded successfully!`, 'success');
  }, 1500);
}

function showWalletPage() {
  const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 50;

  let walletHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">💰 Wallet</h2>
      
      <div class="card mb-3" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <div class="card-body text-center">
          <h5>Available Balance</h5>
          <h2 style="color: white;">$${walletBalance.toFixed(2)}</h2>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Add Money to Wallet</label>
        <input type="number" id="addAmount" class="form-control" placeholder="Enter amount" min="1" max="10000">
      </div>

      <button class="btn btn-primary w-100 mb-2" onclick="addMoneyToWallet()">Add Money</button>
      <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Wallet', walletHTML);
}

function addMoneyToWallet() {
  const amount = parseFloat(document.getElementById('addAmount').value);

  if (!amount || amount < 1) {
    showNotification('Enter a valid amount', 'warning');
    return;
  }

  let currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 50;
  currentBalance += amount;
  localStorage.setItem('walletBalance', currentBalance);

  showNotification(`✅ $${amount.toFixed(2)} added to wallet!`, 'success');
  showWalletPage();
}

function showNotificationsCenter() {
  let notifHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">🔔 Notifications</h2>
      
      <div class="alert alert-success d-flex justify-content-between align-items-center">
        <div>
          <strong>Order Confirmed</strong><br>
          <small>Your order #ORD123 has been confirmed</small>
        </div>
        <button class="btn btn-sm btn-close"></button>
      </div>

      <div class="alert alert-info d-flex justify-content-between align-items-center">
        <div>
          <strong>Special Offer</strong><br>
          <small>Get 20% off on next order with code SAVE20</small>
        </div>
        <button class="btn btn-sm btn-close"></button>
      </div>

      <div class="alert alert-warning d-flex justify-content-between align-items-center">
        <div>
          <strong>Delivery Update</strong><br>
          <small>Your order is on the way (5 mins away)</small>
        </div>
        <button class="btn btn-sm btn-close"></button>
      </div>

      <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Notifications', notifHTML);
}

function showContactForm() {
  let contactHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">📞 Contact Us</h2>
      
      <div class="mb-3">
        <label class="form-label">Subject</label>
        <input type="text" class="form-control" id="contactSubject" placeholder="Your subject">
      </div>

      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea class="form-control" id="contactMessage" rows="4" placeholder="Your message..."></textarea>
      </div>

      <button class="btn btn-danger w-100 mb-2" onclick="submitContact()">Send Message</button>
      <button class="btn btn-secondary w-100" onclick="closeModal()">Cancel</button>
    </div>
  `;

  showModal('Contact Us', contactHTML);
}

function submitContact() {
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;

  if (!subject || !message) {
    showNotification('Please fill all fields', 'warning');
    return;
  }

  showNotification('✅ Your message has been sent! We\'ll respond soon.', 'success');
  closeModal();
}

function showSettingsPage() {
  let settingsHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">⚙️ Settings</h2>
      
      <div class="mb-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="notifToggle" checked>
          <label class="form-check-label" for="notifToggle">
            Push Notifications
          </label>
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="emailToggle" checked>
          <label class="form-check-label" for="emailToggle">
            Email Notifications
          </label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Theme</label>
        <select class="form-select">
          <option selected>Light</option>
          <option>Dark</option>
          <option>Auto</option>
        </select>
      </div>

      <button class="btn btn-primary w-100 mb-2" onclick="saveSettings()">Save Settings</button>
      <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Settings', settingsHTML);
}

function saveSettings() {
  showNotification('✅ Settings saved successfully!', 'success');
  closeModal();
}

function showAddressBook() {
  let addressHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">📍 My Addresses</h2>
      
      ${AppState.addresses.length === 0 ? 
        '<p class="alert alert-info">No addresses saved yet</p>' :
        AppState.addresses.map((addr, i) => `
          <div class="card mb-2">
            <div class="card-body">
              <strong>${addr.name}</strong><br>
              ${addr.street}, ${addr.city}, ${addr.zip}
              <button class="btn btn-sm btn-danger ms-2" onclick="deleteAddress(${i})">Delete</button>
            </div>
          </div>
        `).join('')
      }

      <button class="btn btn-primary w-100 mb-2" onclick="addNewAddress()">+ Add Address</button>
      <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Addresses', addressHTML);
}

function deleteAddress(index) {
  AppState.addresses.splice(index, 1);
  localStorage.setItem('addresses', JSON.stringify(AppState.addresses));
  showAddressBook();
  showNotification('Address deleted', 'info');
}

function showPaymentMethods() {
  let paymentHTML = `
    <div style="background: white; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
      <h2 class="text-danger mb-3">💳 Payment Methods</h2>
      
      <div class="card mb-2">
        <div class="card-body">
          <strong>💳 Credit/Debit Card</strong><br>
          <small>Visa, Mastercard, Amex</small>
        </div>
      </div>

      <div class="card mb-2">
        <div class="card-body">
          <strong>📱 UPI</strong><br>
          <small>Google Pay, PhonePe, Paytm</small>
        </div>
      </div>

      <div class="card mb-2">
        <div class="card-body">
          <strong>🏦 Net Banking</strong><br>
          <small>All major banks supported</small>
        </div>
      </div>

      <button class="btn btn-secondary w-100" onclick="closeModal()">Close</button>
    </div>
  `;

  showModal('Payment Methods', paymentHTML);
}

// ==========================================
// 13. MODAL SYSTEM
// ==========================================

function showModal(title, content) {
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease-out;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
  `;

  modal.innerHTML = content;
  overlay.appendChild(modal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.body.appendChild(overlay);
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => overlay.remove(), 300);
  }
}

function initializeModals() {
  // Modal animations CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.3); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);
}

function addCheckoutModal() {
  // Additional checkout UI enhancement
}

// ==========================================
// 14. NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;

  const colors = {
    'success': '#28a745',
    'error': '#dc3545',
    'warning': '#ffc107',
    'info': '#17a2b8'
  };

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${colors[type] || colors['info']};
    color: white;
    padding: 15px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==========================================
// 15. UTILITY FUNCTIONS
// ==========================================

// Global functions for HTML onclick events
window.removeFromCart = removeFromCart;
window.showItemDetails = showItemDetails;
window.applyPromoCode = applyPromoCode;
window.closeModal = closeModal;
window.closeCartModal = closeCartModal;
window.proceedToCheckout = proceedToCheckout;
window.completeOrder = completeOrder;
window.showOrderDetails = showOrderDetails;
window.showMyOrders = showMyOrders;
window.downloadInvoice = downloadInvoice;
window.addMoneyToWallet = addMoneyToWallet;
window.submitContact = submitContact;
window.saveSettings = saveSettings;
window.deleteAddress = deleteAddress;
window.addNewAddress = addNewAddress;
window.saveAddress = saveAddress;
window.logoutUser = logoutUser;
window.showUserProfile = showUserProfile;
window.showLoginModal = showLoginModal;
window.showWalletPage = showWalletPage;
window.showAddressBook = showAddressBook;
window.showPaymentMethods = showPaymentMethods;
window.showBillsPage = showBillsPage;
window.showNotificationsCenter = showNotificationsCenter;
window.showContactForm = showContactForm;
window.showSettingsPage = showSettingsPage;
window.showCheckoutModal = showCheckoutModal;

console.log('🎉 Food Ordering System - FULLY LOADED & READY TO USE!');
