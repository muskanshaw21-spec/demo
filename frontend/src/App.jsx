import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';

const dummyProducts = [
  { 
    id: 1, 
    name: 'Premium Red Puffer Jacket', 
    brand: 'GEMINI OUTERWEAR',
    price: 7490, 
    originalPrice: 9990,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1600&q=90', 
    category: 'MEN',
    rating: 4.9,
    reviews: '8k+',
    description: 'A premium lightweight red puffer jacket designed for extreme comfort.',
    features: ['Water-resistant', 'Lightweight'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black'],
    colorMap: { 'Red': '#ef4444', 'Black': '#000000' },
    sku: 'GM-PJ-001',
    tags: ['Outerwear', 'Winter']
  },
  { 
    id: 2, 
    name: 'Floral Print Summer Dress', 
    brand: 'GEMINI WOMEN',
    price: 3490, 
    originalPrice: 4990,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1600&q=90', 
    category: 'Women',
    rating: 4.8,
    reviews: '5k+',
    description: 'Flowy and elegant floral dress perfect for summer.',
    features: ['100% Cotton'],
    sizes: ['S', 'M', 'L'],
    colors: ['Floral'],
    colorMap: { 'Floral': '#f9a8d4' },
    sku: 'GM-WD-005',
    tags: ['Summer', 'Elegant']
  },
  { 
    id: 3, 
    name: 'Classic Denim Jacket', 
    brand: 'GEMINI MEN',
    price: 4590, 
    originalPrice: 6590,
    image: 'https://images.unsplash.com/photo-1576905300580-693525ecf2f6?w=1600&q=90', 
    category: 'MEN',
    rating: 4.7,
    reviews: '3.2k+',
    description: 'A timeless denim jacket for a classic look.',
    features: ['Durable denim'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue'],
    colorMap: { 'Blue': '#3b82f6' },
    sku: 'GM-MD-009',
    tags: ['Classic']
  },
  { 
    id: 4, 
    name: 'Kids Graphic T-Shirt', 
    brand: 'GEMINI KIDS',
    price: 990, 
    originalPrice: 1490,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1600&q=90', 
    category: 'KIDS',
    rating: 4.6,
    reviews: '1.2k+',
    description: 'Cool graphic t-shirt for active kids.',
    features: ['Soft cotton'],
    sizes: ['4Y', '6Y', '8Y'],
    colors: ['Yellow', 'Blue'],
    colorMap: { 'Yellow': '#fde047', 'Blue': '#3b82f6' },
    sku: 'GM-KT-012',
    tags: ['Kids', 'Casual']
  },
  { 
    id: 5, 
    name: 'Leather Handbag', 
    brand: 'GEMINI ACCESSORIES',
    price: 5990, 
    originalPrice: 8990,
    image: 'https://images.unsplash.com/photo-1584917033904-4911785b0953?w=1600&q=90', 
    category: 'Women',
    rating: 4.9,
    reviews: '2.5k+',
    description: 'Elegant leather handbag for the modern woman.',
    features: ['Genuine leather'],
    sizes: ['One Size'],
    colors: ['Tan', 'Black'],
    colorMap: { 'Tan': '#d97706', 'Black': '#000000' },
    sku: 'GM-WA-015',
    tags: ['Luxury', 'Accessory']
  },
  { 
    id: 6, 
    name: 'Kids Sport Shoes', 
    brand: 'GEMINI KIDS',
    price: 2490, 
    originalPrice: 3490,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=1600&q=90', 
    category: 'KIDS',
    rating: 4.7,
    reviews: '900',
    description: 'Lightweight and durable sport shoes for kids.',
    features: ['Breathable mesh'],
    sizes: ['2Y', '4Y', '6Y'],
    colors: ['Blue/Red'],
    colorMap: { 'Blue/Red': '#3b82f6' },
    sku: 'GM-KS-016',
    tags: ['Sport', 'Kids']
  },
  { 
    id: 7, 
    name: 'Men Formal Shirt', 
    brand: 'GEMINI FORMALS',
    price: 2990, 
    originalPrice: 3990,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1600&q=90', 
    category: 'MEN',
    rating: 4.8,
    reviews: '4k+',
    description: 'Crisp formal shirt for professional settings.',
    features: ['Slim fit'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue'],
    colorMap: { 'White': '#ffffff', 'Light Blue': '#93c5fd' },
    sku: 'GM-MF-017',
    tags: ['Office', 'Formal']
  },
  { 
    id: 8, 
    name: 'Women High-Waist Jeans', 
    brand: 'GEMINI DENIM',
    price: 3990, 
    originalPrice: 5490,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600&q=90', 
    category: 'Women',
    rating: 4.7,
    reviews: '6k+',
    description: 'Stylish high-waist jeans with a perfect fit.',
    features: ['Stretchable'],
    sizes: ['26', '28', '30', '32'],
    colors: ['Blue'],
    colorMap: { 'Blue': '#1d4ed8' },
    sku: 'GM-WD-018',
    tags: ['Denim', 'Trendy']
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [view, setView] = useState('store'); // 'store' or 'cart'
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Bag, 2: Checkout, 3: Confirmation
  const [activeViewCategory, setActiveViewCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('Recommended');
  const [theme, setTheme] = useState('light'); // Default to light for Myntra look
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState({
    name: 'Gemini User',
    email: 'user@gemini.com',
    memberSince: 'Oct 2023',
    orders: 12,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const goToNextProduct = () => {
    const currentIndex = dummyProducts.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % dummyProducts.length;
    setSelectedProduct(dummyProducts[nextIndex]);
  };

  const goToPrevProduct = () => {
    const currentIndex = dummyProducts.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + dummyProducts.length) % dummyProducts.length;
    setSelectedProduct(dummyProducts[prevIndex]);
  };

  const handleClearAll = () => {
    setActiveViewCategory('all');
    setSelectedBrands([]);
    setSelectedPriceRange('all');
    setSortBy('Recommended');
    setSearchQuery('');
  };

  // Prevent scrolling and initialize modal state
  useEffect(() => {
    if (selectedProduct || isCartOpen) {
      document.body.style.overflow = 'hidden';
      if (selectedProduct) {
        const firstColor = selectedProduct.colors[0];
        const initialImage = (selectedProduct.variantData && selectedProduct.variantData[firstColor]) 
          ? selectedProduct.variantData[firstColor].main 
          : selectedProduct.image;
          
        setActiveImage(initialImage);
        setSelectedSize(selectedProduct.sizes[0]);
        setSelectedColor(firstColor);
        setQuantity(1);
        setActiveTab('description');
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct, isCartOpen]);

  // Theme Sync Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (selectedProduct.variantData && selectedProduct.variantData[color]) {
      setActiveImage(selectedProduct.variantData[color].main);
    }
  };

  const addToCart = (product, forcedQty, forcedSize, forcedColor) => {
    const finalQty = forcedQty !== undefined ? forcedQty : quantity;
    const finalSize = forcedSize !== undefined ? forcedSize : selectedSize;
    const finalColor = forcedColor !== undefined ? forcedColor : selectedColor;
    
    // Determine the image based on variantData
    const finalImage = (product.variantData && product.variantData[finalColor]) 
      ? product.variantData[finalColor].main 
      : product.image;

    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === finalSize && 
      item.selectedColor === finalColor
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].qty += finalQty;
      setCart(newCart);
    } else {
      setCart([...cart, {
        ...product,
        price: product.sizePricing?.[finalSize] || product.price,
        image: finalImage,
        cartId: Date.now(),
        selectedSize: finalSize,
        selectedColor: finalColor,
        qty: finalQty
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateCartItemQty = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.cartId === cartId ? { ...item, qty: newQty } : item));
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const renderProfile = () => (
    <main className="main-content profile-view">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-info-card">
            <img src={user.avatar} alt="avatar" className="profile-avatar" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="profile-nav">
            <button className="active">Overview</button>
            <button onClick={() => setView('orders')}>Orders & Returns</button>
            <button onClick={() => setView('wishlist')}>Wishlist</button>
            <button>Coupons</button>
            <button>Gemini Credit</button>
            <button>Profile Details</button>
            <button className="logout-btn" onClick={() => window.location.reload()}>Logout</button>
          </nav>
        </div>
        <div className="profile-main">
          <h2>Account Overview</h2>
          <div className="overview-grid">
            <div className="stat-card">
              <span className="icon">📦</span>
              <div className="stat-info">
                <h4>{user.orders}</h4>
                <p>Orders</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="icon">❤️</span>
              <div className="stat-info">
                <h4>{wishlist.length}</h4>
                <p>Wishlist Items</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="icon">🎟️</span>
              <div className="stat-info">
                <h4>4</h4>
                <p>Coupons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const renderWishlist = () => (
    <main className="main-content wishlist-view">
      <div className="wishlist-header">
        <h2>My Wishlist <span>({wishlist.length} items)</span></h2>
      </div>
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" alt="empty" />
          <h3>YOUR WISHLIST IS EMPTY</h3>
          <p>Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</p>
          <button className="shop-now-btn" onClick={() => setView('store')}>CONTINUE SHOPPING</button>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map(product => (
            <div key={product.id} className="product-card">
              <div className="card-image-wrapper">
                <img src={product.image} alt={product.name} onClick={() => setSelectedProduct(product)} />
                <button className="remove-wishlist" onClick={() => toggleWishlist(product)}>&times;</button>
              </div>
              <div className="card-content">
                <h4 className="brand-name">{product.brand}</h4>
                <h3 className="product-title">{product.name}</h3>
                <div className="price-row">
                  <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
                <button className="move-to-bag" onClick={() => addToCart(product)}>MOVE TO BAG</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
  const subtotal = cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
  const discountAmount = subtotal * discount;
  const gst = (subtotal - discountAmount) * 0.12;
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal - discountAmount + gst + shipping;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'GEMINI20') {
      setDiscount(0.20);
      setCouponError('');
      alert('Coupon Applied! You saved 20%');
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.10);
      setCouponError('');
      alert('Coupon Applied! You saved 10%');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const renderStore = () => {
    const brands = [...new Set(dummyProducts.map(p => p.brand))];
    
    let filteredProducts = dummyProducts.filter(p => {
      const matchesCategory = activeViewCategory === 'all' || p.category === activeViewCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      
      let matchesPrice = true;
      if (selectedPriceRange === '0-2000') matchesPrice = p.price <= 2000;
      else if (selectedPriceRange === '2000-5000') matchesPrice = p.price > 2000 && p.price <= 5000;
      else if (selectedPriceRange === '5000-plus') matchesPrice = p.price > 5000;
      
      return matchesCategory && matchesSearch && matchesBrand && matchesPrice;
    });

    if (sortBy === 'Price: Low to High') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Customer Rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    return (
      <main className="main-content store-view">
        {/* Extra Small Aurora Fashion Coupon Ticker */}
        <div className="aurora-ticker-mini">
          <span>✨ CODE: <strong>AURORA25</strong> | EXTRA 25% OFF ✨</span>
        </div>

        {/* Myntra-style Category Circles */}
        <section className="category-circles">
          {['MEN', 'Women', 'KIDS', 'Electronics', 'Footwear', 'Home'].map(cat => (
            <div key={cat} className="cat-circle-item" onClick={() => setActiveViewCategory(cat)}>
              <div className="cat-circle-img">
                <img src={`https://images.unsplash.com/photo-${cat === 'MEN' ? '1490114538077-0a7f8cb49891' : cat === 'Women' ? '1567401893414-76b7b1e5a7a5' : '1519238263530-99bdd11df2ea'}?w=200&q=80`} alt={cat} />
              </div>
              <span>{cat}</span>
            </div>
          ))}
        </section>

        {/* Dynamic Banners */}
        <section className="promo-banners">
          <div className="main-banner-carousel">
            <img src="/promo_banner.png" alt="Flash Sale" />
            <div className="banner-nav-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </section>

        <div className="breadcrumb-nav">
          <span>Home / <strong>Clothing</strong> / {activeViewCategory.toUpperCase()}</span>
        </div>

        <div className="store-layout">
          {/* Sidebar Filters */}
          <aside className="sidebar">
            <div className="filter-header">
              <h3>FILTERS</h3>
              <button className="clear-all" onClick={handleClearAll}>CLEAR ALL</button>
            </div>

            <div className="filter-section">
              <h4>CATEGORIES</h4>
              <div className="filter-options">
                {['MEN', 'Women', 'KIDS'].map(cat => (
                  <label key={cat} onClick={() => setActiveViewCategory(cat)}>
                    <input type="checkbox" checked={activeViewCategory === cat} readOnly /> 
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>BRAND</h4>
              <div className="filter-options">
                {brands.map(brand => (
                  <label key={brand} onClick={() => toggleBrand(brand)}>
                    <input type="checkbox" checked={selectedBrands.includes(brand)} readOnly /> 
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>PRICE</h4>
              <div className="filter-options">
                {[
                  { label: 'Rs. 990 to Rs. 2000', val: '0-2000' },
                  { label: 'Rs. 2000 to Rs. 5000', val: '2000-5000' },
                  { label: 'Rs. 5000 and Above', val: '5000-plus' }
                ].map(range => (
                  <label key={range.val} onClick={() => setSelectedPriceRange(range.val)}>
                    <input type="radio" name="price" checked={selectedPriceRange === range.val} readOnly /> 
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid Area */}
          <section className="products-area">
            <div className="top-bar">
              <div className="sort-by">
                <span>Sort by:</span>
                <div className="custom-select">
                  <strong>{sortBy}</strong>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"></path></svg>
                  <div className="select-dropdown">
                    {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Customer Rating'].map(s => (
                      <div key={s} onClick={() => setSortBy(s)}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="card-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" onClick={() => setSelectedProduct(product)} />
                    <button 
                      className={`wishlist-icon-btn ${wishlist.find(p => p.id === product.id) ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.find(p => p.id === product.id) ? '#ff3f6c' : 'none'} stroke={wishlist.find(p => p.id === product.id) ? '#ff3f6c' : 'currentColor'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <div className="rating-badge">
                      <span>{product.rating} ★ | {product.reviews}</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h4 className="brand-name">{product.brand}</h4>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="price-row">
                      <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                      {product.originalPrice && (
                        <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                      <span className="discount-tag">({Math.round((1 - product.price/product.originalPrice) * 100)}% OFF)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  };

  const renderCart = () => (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-page-header">
          <button className="back-btn" onClick={() => setView('store')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"></path></svg>
            BACK TO STORE
          </button>
          <h1 className="cart-page-title">CHECKOUT</h1>
        </div>
        
        <div className="checkout-steps">
          <div className={`step ${checkoutStep >= 1 ? 'active' : ''}`} onClick={() => setCheckoutStep(1)}>
            <span className="step-num">01</span>
            <div className="step-text">
              <h3>SHOPPING BAG</h3>
              <p>Manage Your Items List</p>
            </div>
          </div>
          <div className={`step ${checkoutStep >= 2 ? 'active' : ''}`} onClick={() => setCheckoutStep(2)}>
            <span className="step-num">02</span>
            <div className="step-text">
              <h3>SHIPPING AND CHECKOUT</h3>
              <p>Checkout Your Items List</p>
            </div>
          </div>
          <div className={`step ${checkoutStep >= 3 ? 'active' : ''}`}>
            <span className="step-num">03</span>
            <div className="step-text">
              <h3>CONFIRMATION</h3>
              <p>Review And Submit Your Order</p>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          {checkoutStep === 1 && (
            <div className="shopping-bag-view">
              <div className="bag-main">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>SUBTOTAL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={item.cartId} style={{ animation: `fadeIn 0.4s ease forwards ${index * 0.05}s`, opacity: 0 }}>
                        <td>
                          <div className="cart-product-cell">
                            <img src={item.image} alt={item.name} />
                            <div className="cp-info">
                              <h4>{item.name}</h4>
                              <p className="cp-reviews">{item.reviews} reviews</p>
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price.toLocaleString('en-IN')}</td>
                        <td>
                          <div className="qty-picker">
                            <button onClick={() => updateCartItemQty(item.cartId, (item.qty || 1) - 1)}>-</button>
                            <span>{item.qty || 1}</span>
                            <button onClick={() => updateCartItemQty(item.cartId, (item.qty || 1) + 1)}>+</button>
                          </div>
                        </td>
                        <td>₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</td>
                        <td>
                          <button className="remove-row" onClick={() => removeFromCart(item.cartId)}>&times;</button>
                        </td>
                      </tr>
                    ))}
                    {cart.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-table">Your shopping bag is empty.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="cart-actions">
                  <button className="btn-outline" onClick={() => setView('store')}>CONTINUE SHOPPING</button>
                  <button className="btn-outline">UPDATE CART</button>
                </div>
              </div>
              
              <div className="bag-sidebar">
                <div className="summary-box">
                  <h3>CART TOTALS</h3>
                  
                  <div className="coupon-section">
                    <div className="coupon-input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button onClick={applyCoupon}>APPLY</button>
                    </div>
                    {couponError && <p className="coupon-error">{couponError}</p>}
                    {discount > 0 && <p className="coupon-success">Discount Applied: {discount * 100}% OFF</p>}
                  </div>

                  <div className="summary-details">
                    <div className="summary-row">
                      <span>SUBTOTAL</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>DISCOUNT ({discount * 100}%)</span>
                        <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>GST (12%)</span>
                      <span>₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row">
                      <span>SHIPPING</span>
                      <div className="shipping-info">
                        <p>Flat rate: ₹{shipping.toLocaleString('en-IN')}</p>
                        <p>Shipping to India</p>
                        <button>CHANGE ADDRESS</button>
                      </div>
                    </div>
                    <div className="summary-row total">
                      <span>TOTAL</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="terms-section">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={isTermsAccepted} 
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      />
                      <span className="checkmark"></span>
                      I agree to the <a href="#">Terms & Conditions</a>
                    </label>
                  </div>

                  <button 
                    className="checkout-btn-large" 
                    onClick={() => setCheckoutStep(2)} 
                    disabled={cart.length === 0 || !isTermsAccepted}
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="checkout-view" style={{ animation: 'slideInRight 0.5s ease' }}>
              <div className="billing-details">
                <div className="section-header">
                  <h3>SHIPPING ADDRESS</h3>
                  <p>Where should we send your order?</p>
                </div>
                <form className="billing-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input type="text" placeholder="John" required />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input type="text" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input type="text" placeholder="House number and street name" required />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" style={{marginTop: '15px'}} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Town / City *</label>
                      <input type="text" placeholder="Mumbai" required />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input type="text" placeholder="400001" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </form>

                <div className="payment-section" style={{ marginTop: '3rem' }}>
                  <div className="section-header">
                    <h3>PAYMENT METHOD</h3>
                    <p>Select your preferred way to pay</p>
                  </div>
                  <div className="payment-grid">
                    <div className="payment-method-card active">
                      <input type="radio" name="payment" id="card" defaultChecked />
                      <label htmlFor="card">
                        <div className="method-icon">💳</div>
                        <div className="method-info">
                          <span className="method-name">Credit / Debit Card</span>
                          <span className="method-desc">Pay securely with your card</span>
                        </div>
                      </label>
                    </div>
                    <div className="payment-method-card">
                      <input type="radio" name="payment" id="upi" />
                      <label htmlFor="upi">
                        <div className="method-icon">📱</div>
                        <div className="method-info">
                          <span className="method-name">UPI / NetBanking</span>
                          <span className="method-desc">Instant transfer from bank</span>
                        </div>
                      </label>
                    </div>
                    <div className="payment-method-card">
                      <input type="radio" name="payment" id="cod" />
                      <label htmlFor="cod">
                        <div className="method-icon">🚚</div>
                        <div className="method-info">
                          <span className="method-name">Cash on Delivery</span>
                          <span className="method-desc">Pay when you receive</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-sidebar">
                <div className="order-box">
                  <h3>ORDER SUMMARY</h3>
                  <div className="order-items">
                    {cart.map(item => (
                      <div key={item.cartId} className="order-item-mini">
                        <img src={item.image} alt="" />
                        <div className="mini-info">
                          <span className="name">{item.name}</span>
                          <span className="details">Qty: {item.qty} | {item.selectedSize}</span>
                        </div>
                        <span className="price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-summary-details">
                    <div className="order-row">
                      <span>Order Value</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="order-row">
                      <span>GST & Duties</span>
                      <span>₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="order-row">
                      <span>Delivery Charges</span>
                      <span className="free">FREE</span>
                    </div>
                    <div className="order-row total">
                      <span>Total Amount</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button className="place-order-btn" onClick={() => setCheckoutStep(3)}>
                    CONFIRM & PAY NOW
                  </button>
                  <p className="secure-text">🔒 Secure 256-bit SSL Encrypted Payment</p>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="confirmation-view" style={{ animation: 'scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
              <div className="conf-card">
                <div className="success-icon-wrapper">
                  <div className="success-icon">✓</div>
                  <div className="confetti-placeholder"></div>
                </div>
                <h2>Order Confirmed!</h2>
                <p>Your order <strong>#GEM-{Math.floor(Math.random() * 100000)}</strong> has been placed successfully. A confirmation email has been sent to your registered address.</p>
                <div className="conf-details">
                  <div className="detail-row">
                    <span>Estimate Delivery</span>
                    <span>{new Date(Date.now() + 5*24*60*60*1000).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                  </div>
                  <div className="detail-row">
                    <span>Payment Status</span>
                    <span className="success-badge">Paid Online</span>
                  </div>
                </div>
                <button className="checkout-btn-large" onClick={() => { setView('store'); setCheckoutStep(1); setCart([]); }}>
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`app-container ${isCartOpen ? 'cart-open' : ''}`}>
      <nav className={`navbar myntra-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <div className="nav-logo" onClick={() => setView('store')}>
            <svg viewBox="0 0 100 100" width="40" height="40">
              <path d="M10 90 L30 10 L50 60 L70 10 L90 90" stroke="var(--accent-color)" strokeWidth="8" fill="none" />
            </svg>
            <span>Gemini Store</span>
          </div>
          <div className="nav-menu">
            <span>MEN</span>
            <span>WOMEN</span>
            <span>KIDS</span>
            <span>HOME</span>
            <span>BEAUTY</span>
            <span>STUDIO</span>
          </div>
        </div>
        
        <div className="nav-center">
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-action-item" onClick={() => setView('profile')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Satyam</span>
          </div>
          <div className="nav-action-item" onClick={() => setView('wishlist')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>Wishlist</span>
          </div>
          <div className="nav-action-item nav-cart" onClick={() => setView('cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span>Bag</span>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </div>
        </div>
      </nav>

        {view === 'store' && renderStore()}
        {view === 'cart' && renderCart()}
        {view === 'profile' && renderProfile()}
        {view === 'wishlist' && renderWishlist()}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-top-bar">
              <button className="modal-back-btn" onClick={() => setSelectedProduct(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"></path></svg>
                BACK
              </button>
              <button className="close-modal-icon" onClick={() => setSelectedProduct(null)}>&times;</button>
            </div>
            
            <div className="modal-header-nav">
              <span className="breadcrumb">HOME / THE SHOP / {selectedProduct.category.toUpperCase()}</span>
              <div className="modal-prev-next">
                <span onClick={goToPrevProduct}>&lt; PREV</span>
                <span onClick={goToNextProduct}>NEXT &gt;</span>
              </div>
            </div>

            <div className="modal-body-main">
              <div className="modal-gallery">
                <div className="thumbnails">
                  <div className="thumb active">
                    <img src={selectedProduct.image} alt="main" />
                  </div>
                  <div className="thumb">
                    <img src={selectedProduct.image} alt="side" style={{filter: 'hue-rotate(45deg)'}} />
                  </div>
                </div>
                <div className="main-modal-image">
                  <button className="nav-arrow prev" onClick={goToPrevProduct}>&lt;</button>
                  <img key={selectedProduct.id} src={selectedProduct.image} alt={selectedProduct.name} className="image-fade-in" />
                  <button className="nav-arrow next" onClick={goToNextProduct}>&gt;</button>
                  <div className="image-zoom-hint">Roll over image to zoom</div>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-brand-row">
                  <h4 className="modal-brand-name">{selectedProduct.brand}</h4>
                  <span className="new-tag">NEW SEASON</span>
                </div>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                
                <div className="modal-rating-row">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className={s <= Math.round(selectedProduct.rating) ? 'star filled' : 'star'}>★</span>
                    ))}
                    <strong>{selectedProduct.rating}</strong>
                  </div>
                  <span className="divider">|</span>
                  <span className="review-count">{selectedProduct.reviews} Verified Reviews</span>
                </div>

                <div className="modal-price-row">
                  <span className="modal-current-price">₹{(selectedProduct.sizePricing?.[selectedSize] || selectedProduct.price).toLocaleString('en-IN')}</span>
                  <span className="modal-mrp">MRP <span className="strikethrough">₹{(selectedProduct.originalPrice || selectedProduct.price + 1000).toLocaleString('en-IN')}</span></span>
                  <span className="modal-discount-tag">(25% OFF)</span>
                </div>
                <p className="inclusive-taxes">inclusive of all taxes</p>

                <div className="selection-group">
                  <div className="selection-header">
                    <h4>SELECT SIZE</h4>
                    <span className="size-chart-link">SIZE CHART 📐</span>
                  </div>
                  <div className="size-picker">
                    {selectedProduct.sizes.map(size => (
                      <button 
                        key={size} 
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="selection-group">
                  <h4>SELECT COLOR</h4>
                  <div className="color-picker">
                    {selectedProduct.colors.map(color => (
                      <button 
                        key={color} 
                        className={`color-btn ${selectedColor === color ? 'active' : ''}`} 
                        style={{ background: selectedProduct.colorMap[color] }}
                        onClick={() => handleColorChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className="selected-color-name">{selectedColor}</p>
                </div>

                <div className="action-row">
                  <div className="quantity-selector">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button className="modal-add-btn" onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}>
                    Add to Cart
                  </button>
                </div>

                <div className="utility-buttons">
                  <button 
                    className={`util-btn ${wishlist.find(p => p.id === selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedProduct)}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      fill={wishlist.find(p => p.id === selectedProduct.id) ? '#ff3f6c' : 'none'} 
                      stroke={wishlist.find(p => p.id === selectedProduct.id) ? '#ff3f6c' : 'currentColor'} 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"></path>
                    </svg>
                    {wishlist.find(p => p.id === selectedProduct.id) ? 'WISHLISTED' : 'ADD TO WISHLIST'}
                  </button>
                  <button className="util-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4-4 4m4-4v13"></path></svg>
                    SHARE
                  </button>
                </div>

                <div className="meta-info">
                  <p><span>SKU:</span> {selectedProduct.sku}</p>
                  <p><span>CATEGORIES:</span> {selectedProduct.category}, Casual Wear</p>
                  <p><span>TAGS:</span> {selectedProduct.tags.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer-tabs">
              <div className="tabs-header">
                <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>DESCRIPTION</button>
                <button className={activeTab === 'additional' ? 'active' : ''} onClick={() => setActiveTab('additional')}>ADDITIONAL INFORMATION</button>
                <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>REVIEWS (2)</button>
              </div>
              <div className="tab-content">
                {activeTab === 'description' && (
                  <div>
                    <p style={{marginBottom: '1rem'}}>{selectedProduct.description}</p>
                    <h4 style={{fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)'}}>Key Features:</h4>
                    <ul style={{listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)'}}>
                      {selectedProduct.features?.map((f, i) => <li key={i} style={{marginBottom: '5px'}}>{f}</li>)}
                    </ul>
                  </div>
                )}
                {activeTab === 'additional' && <p>{selectedProduct.additionalInfo}</p>}
                {activeTab === 'reviews' && (
                  <div className="reviews-placeholder">
                    <p>There are no reviews yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer - Keeping it for quick access but primary focus is Cart Page */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.cartId)}>&times;</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total-row">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <button className="checkout-btn" onClick={() => { setView('cart'); setIsCartOpen(false); }}>
            View Full Cart
          </button>
        </div>
      </div>
      {isCartOpen && <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  );
}

export default App;
