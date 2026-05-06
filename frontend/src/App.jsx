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

  const subtotal = cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
  const gst = subtotal * 0.12;
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + gst + shipping;

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
        {/* Banner Section */}
        <section className="promo-banners">
          <div className="main-banner">
            <img src="/promo_banner.png" alt="Get 25% Off" />
          </div>
          <div className="featured-banner">
            <div className="featured-content">
              <h2>U.S. POLO ASSN.</h2>
              <p>Up To 50% Off</p>
              <button className="explore-btn">+ Explore</button>
            </div>
            <img src="/featured_banner.png" alt="Featured Collection" />
          </div>
        </section>

        <div className="breadcrumb-nav">
          <span>Home / <strong>Shop</strong></span>
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
                {['all', 'MEN', 'Women', 'KIDS', 'Electronics', 'Footwear'].map(cat => (
                  <label key={cat} onClick={() => setActiveViewCategory(cat)}>
                    <input type="radio" name="cat" checked={activeViewCategory === cat} readOnly /> 
                    {cat === 'all' ? 'All Products' : cat}
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
                <label onClick={() => setSelectedPriceRange('all')}>
                  <input type="radio" name="price" checked={selectedPriceRange === 'all'} readOnly /> All Prices
                </label>
                <label onClick={() => setSelectedPriceRange('0-2000')}>
                  <input type="radio" name="price" checked={selectedPriceRange === '0-2000'} readOnly /> Under ₹2000
                </label>
                <label onClick={() => setSelectedPriceRange('2000-5000')}>
                  <input type="radio" name="price" checked={selectedPriceRange === '2000-5000'} readOnly /> ₹2000 - ₹5000
                </label>
                <label onClick={() => setSelectedPriceRange('5000-plus')}>
                  <input type="radio" name="price" checked={selectedPriceRange === '5000-plus'} readOnly /> Over ₹5000
                </label>
              </div>
            </div>
          </aside>

          {/* Main Grid Area */}
          <section className="products-area">
            <div className="top-bar">
              <div className="item-count">
                <strong>{filteredProducts.length}</strong> items found
              </div>
              <div className="sort-by">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                </select>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-image-wrapper" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.name} className="product-image" />
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
        <h1 className="cart-page-title">CART</h1>
        
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
                  <div className="summary-row">
                    <span>SUBTOTAL</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
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
                  <button className="checkout-btn-large" onClick={() => setCheckoutStep(2)} disabled={cart.length === 0}>
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="checkout-view">
              <div className="billing-details">
                <h3>BILLING DETAILS</h3>
                <form className="billing-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input type="text" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Company Name (optional)</label>
                    <input type="text" placeholder="Company Name (optional)" />
                  </div>
                  <div className="form-group">
                    <label>Country / Region *</label>
                    <select defaultValue="India">
                      <option value="India">India</option>
                      <option value="US">United States (US)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input type="text" placeholder="House number and street name" />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" style={{marginTop: '10px'}} />
                  </div>
                  <div className="form-group">
                    <label>Town / City *</label>
                    <input type="text" />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select defaultValue="West Bengal">
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input type="text" />
                  </div>
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" />
                  </div>
                </form>
              </div>

              <div className="order-sidebar">
                <div className="order-box">
                  <h3>YOUR ORDER</h3>
                  <div className="order-header">
                    <span>PRODUCTS</span>
                    <span>SUBTOTALS</span>
                  </div>
                  <div className="order-items">
                    {cart.map(item => (
                      <div key={item.cartId} className="order-item">
                        <span>{item.name} x {item.qty || 1}</span>
                        <span>₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-row">
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="order-row">
                    <span>GST (12%)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="order-row">
                    <span>SHIPPING</span>
                    <span>Flat rate: ₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="order-row total">
                    <span>TOTAL</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="payment-methods">
                    <div className="method">
                      <input type="radio" name="payment" id="bank" defaultChecked />
                      <label htmlFor="bank">Direct bank transfer</label>
                      <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference.</p>
                    </div>
                    <div className="method">
                      <input type="radio" name="payment" id="check" />
                      <label htmlFor="check">Check payments</label>
                    </div>
                    <div className="method">
                      <input type="radio" name="payment" id="cod" />
                      <label htmlFor="cod">Cash on delivery</label>
                    </div>
                    <div className="method">
                      <input type="radio" name="payment" id="paypal" />
                      <label htmlFor="paypal">PayPal</label>
                    </div>
                  </div>
                  <button className="place-order-btn" onClick={() => setCheckoutStep(3)}>
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="confirmation-view">
              <div className="conf-card">
                <div className="success-icon">✓</div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your purchase. Your order number is #GEM-{Math.floor(Math.random() * 100000)}</p>
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
      <nav className="navbar myntra-nav">
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
          <div className="nav-action-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Satyam</span>
          </div>
          <div className="nav-action-item">
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

      {view === 'store' ? renderStore() : renderCart()}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>&times;</button>
            
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
                </div>
                <div className="main-modal-image">
                  <button className="nav-arrow prev" onClick={goToPrevProduct}>&lt;</button>
                  <img key={selectedProduct.id} src={selectedProduct.image} alt={selectedProduct.name} className="image-fade-in" />
                  <button className="nav-arrow next" onClick={goToNextProduct}>&gt;</button>
                </div>
              </div>

              <div className="modal-info">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <div className="modal-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className={s <= Math.round(selectedProduct.rating) ? 'star filled' : 'star'}>★</span>
                    ))}
                  </div>
                  <span className="review-count">{selectedProduct.reviews} reviews</span>
                </div>
                <p className="modal-price">₹{(selectedProduct.sizePricing?.[selectedSize] || selectedProduct.price).toLocaleString('en-IN')}</p>
                <p className="modal-description-short">{selectedProduct.description.substring(0, 120)}...</p>
                
                <div className="selection-group">
                  <h4>SIZES</h4>
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
                  <button className="util-btn">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"></path></svg>
                    ADD TO WISHLIST
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
