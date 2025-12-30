/* ===================================
   JAVASCRIPT CUSTOMIZATION GUIDE
   ===================================
   
   1. EDIT PRODUCTS - See "PRODUCTS DATA" section below
   2. EDIT WHATSAPP NUMBER - See "WhatsApp Configuration" section
   3. Categories must match the onclick values in HTML:
      - scented
      - decorative
      - gift-sets
      - seasonal
      
   Do not change function names or structure
================================== */

/* ========================================
   PRODUCTS DATA - EDIT YOUR PRODUCTS HERE
======================================== */

// EDIT: Add, remove, or modify products in this array
const products = [
    {
        id: 1,                              // Keep unique for each product
        name: "Lavender Dreams",            // EDIT: Product name
        category: "scented",                // EDIT: Must be: scented, decorative, gift-sets, or seasonal
        price: 499,                         // EDIT: Current price
        oldPrice: 699,                      // EDIT: Original price (for sale items) - Remove if not on sale
        image: "https://images.unsplash.com/photo-1602874801006-97c285c362c0?w=400",  // EDIT: Product image URL
        badge: "SALE"                       // EDIT: Badge text (SALE, NEW, POPULAR, SEASONAL) - Leave empty "" for no badge
    },
    {
        id: 2,
        name: "Vanilla Bliss",
        category: "scented",
        price: 549,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400",
        badge: "POPULAR"
    },
    {
        id: 3,
        name: "Ocean Breeze",
        category: "scented",
        price: 599,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
        badge: "NEW"
    },
    {
        id: 4,
        name: "Rose Garden",
        category: "decorative",
        price: 449,
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400",
        badge: ""
    },
    {
        id: 5,
        name: "Luxury Gift Set",
        category: "gift-sets",
        price: 1299,
        oldPrice: 1599,
        image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400",
        badge: "SALE"
    },
    {
        id: 6,
        name: "Winter Spice",
        category: "seasonal",
        price: 649,
        image: "https://images.unsplash.com/photo-1602874801006-97c285c362c0?w=400",
        badge: "SEASONAL"
    },
    {
        id: 7,
        name: "Citrus Fresh",
        category: "scented",
        price: 529,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400",
        badge: ""
    },
    {
        id: 8,
        name: "Amber Glow",
        category: "decorative",
        price: 479,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400",
        badge: "NEW"
    }
    // COPY the block above to add more products
    // Remember to:
    // 1. Change the id to be unique
    // 2. Add a comma after the previous product
];

/* ========================================
   SHOPPING CART - Do not edit this section
======================================== */
let cart = [];

/* ========================================
   PAGE INITIALIZATION
   Runs when the page loads
======================================== */
window.onload = function() {
    loadCart();                          // Load saved cart from browser
    displayProducts('featured', 6);      // Show 6 featured products on home page
    displayProducts('all', products.length);  // Show all products on products page
    updateCartUI();                      // Update cart display
};

/* ========================================
   DISPLAY PRODUCTS ON PAGE
   section: 'featured' or 'all'
   limit: number of products to show
======================================== */
function displayProducts(section, limit) {
    // Get the container element
    const container = section === 'featured' 
        ? document.getElementById('featuredProducts')
        : document.getElementById('allProducts');
    
    // Clear existing products
    container.innerHTML = '';
    
    // Get products to display
    const productsToShow = products.slice(0, limit);
    
    // Create HTML for each product
    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image-container">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.replace('-', ' ')}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ₹${product.price}
                    ${product.oldPrice ? `<span class="product-old-price">₹${product.oldPrice}</span>` : ''}
                </div>
            </div>
        `;
        
        // Add click event to show product detail
        productCard.onclick = () => showProductDetail(product);
        container.appendChild(productCard);
    });
}

/* ========================================
   FILTER PRODUCTS BY CATEGORY
   category: 'all', 'scented', 'decorative', 'gift-sets', 'seasonal'
======================================== */
function filterProducts(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Get products container
    const container = document.getElementById('allProducts');
    container.innerHTML = '';

    // Filter products by category
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    // Display filtered products
    filtered.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image-container">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.replace('-', ' ')}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ₹${product.price}
                    ${product.oldPrice ? `<span class="product-old-price">₹${product.oldPrice}</span>` : ''}
                </div>
            </div>
        `;
        
        productCard.onclick = () => showProductDetail(product);
        container.appendChild(productCard);
    });

    // Navigate to products page and scroll to top
    showPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================
   SHOW PRODUCT DETAIL
   Shows confirmation dialog to add product to cart
======================================== */
function showProductDetail(product) {
    const confirmation = confirm(`Add "${product.name}" to cart?\n\nPrice: ₹${product.price}`);
    if (confirmation) {
        addToCart(product);
    }
}

/* ========================================
   ADD PRODUCT TO CART
======================================== */
function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        // Increase quantity if already in cart
        existingItem.quantity++;
    } else {
        // Add new item to cart
        cart.push({ ...product, quantity: 1 });
    }
    
    // Save cart and update display
    saveCart();
    updateCartUI();
    
    // Show confirmation message
    alert(`${product.name} added to cart!`);
}

/* ========================================
   REMOVE ITEM FROM CART
======================================== */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

/* ========================================
   UPDATE CART USER INTERFACE
   Updates cart count, items list, and total
======================================== */
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Calculate total items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Show empty cart message if no items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    // Display cart items
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">Remove</div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Update total price
    cartTotal.textContent = `₹${total}`;
}

/* ========================================
   TOGGLE CART MODAL
   Opens/closes the shopping cart sidebar
======================================== */
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

/* ========================================
   TOGGLE MOBILE MENU
   Opens/closes navigation menu on mobile
======================================== */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

/* ========================================
   SWITCH BETWEEN PAGES
   pageName: 'home' or 'products'
======================================== */
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    if (pageName === 'home') {
        document.getElementById('homePage').classList.add('active');
    } else if (pageName === 'products') {
        document.getElementById('productsPage').classList.add('active');
    }
    
    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
    
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================
   SCROLL TO SECTION
   Scrolls to a specific section on home page
   sectionId: 'about' or 'contact'
======================================== */
function scrollToSection(sectionId) {
    // Make sure we're on home page
    showPage('home');
    
    // Wait for page to load, then scroll
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

/* ========================================
   WHATSAPP ORDER FUNCTION
   Sends cart contents to WhatsApp
======================================== */
function orderViaWhatsApp() {
    // Check if cart is empty
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    /* ========================================
       WHATSAPP CONFIGURATION
       EDIT YOUR WHATSAPP NUMBER HERE
    ======================================== */
    // EDIT: Replace with your WhatsApp number
    // Format: Country code + number (no + sign, no spaces)
    // Example for India: 919876543210
    // Example for US: 12025551234
    const phoneNumber = '919876543210';
    
    // Build order message
    let message = 'Hello! I would like to order:\n\n';
    let total = 0;
    
    // Add each item to message
    cart.forEach(item => {
        message += `${item.name} - ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    
    // Add total
    message += `\nTotal: ₹${total}\n\nThank you!`;
    
    // Encode message for URL (converts special characters)
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL and open in new tab
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

/* ========================================
   SAVE CART TO BROWSER
   Saves cart to localStorage so it persists
======================================== */
function saveCart() {
    localStorage.setItem('luxeCandles_cart', JSON.stringify(cart));
}

/* ========================================
   LOAD CART FROM BROWSER
   Loads saved cart from localStorage
======================================== */
function loadCart() {
    const savedCart = localStorage.getItem('luxeCandles_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/* ========================================
   CLOSE CART WHEN CLICKING OUTSIDE
   Automatically closes cart modal
======================================== */
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    // Close cart if clicking outside of it
    if (cartModal.classList.contains('active') && 
        !cartModal.contains(event.target) && 
        !cartIcon.contains(event.target)) {
        cartModal.classList.remove('active');
    }
});