import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';

const dummyProducts = [
  { 
    id: 1, 
    name: 'WH-1000XM4 Wireless Noise Cancelling', 
    brand: 'SONY',
    price: 299.99, 
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=90', 
    category: 'Electronics',
    rating: 4.8,
    reviews: '12,450',
    description: 'Industry-leading noise cancellation technology means you hear every word, note, and tune with incredible clarity.',
    features: ['Dual Noise Sensor', '30-hour battery', 'Speak-to-chat'],
    sizes: ['One Size'],
    colors: ['Black', 'Silver', 'Midnight Blue'],
    colorMap: {
      'Black': '#111827',
      'Silver': '#d1d5db',
      'Midnight Blue': '#1e3a8a'
    },
    variantData: {
      'Black': {
        main: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80']
      },
      'Silver': {
        main: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80']
      },
      'Midnight Blue': {
        main: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80']
      }
    },
    sku: 'SNY-WH-BK',
    tags: ['Audio', 'ANC'],
    additionalInfo: 'Weight: 254g'
  },
  { 
    id: 2, 
    name: 'Apple Watch Series 7 GPS', 
    brand: 'APPLE',
    price: 399.00, 
    originalPrice: 429.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=90', 
    category: 'Accessories',
    rating: 4.9,
    reviews: '8,200',
    description: 'Always-On Retina display has nearly 20% more screen area than Series 6.',
    features: ['Retina Display', 'ECG App', 'Swimproof'],
    sizes: ['41mm', '45mm'],
    colors: ['Midnight', 'Starlight', 'Red'],
    colorMap: {
      'Midnight': '#0f172a',
      'Starlight': '#f1f5f9',
      'Red': '#ef4444'
    },
    variantData: {
      'Midnight': {
        main: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1508685096489-7df30e13b390?w=400&q=80']
      },
      'Starlight': {
        main: 'https://images.unsplash.com/photo-1508685096489-7df30e13b390?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80']
      },
      'Red': {
        main: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1508685096489-7df30e13b390?w=400&q=80']
      }
    },
    sku: 'APL-WCH-7',
    tags: ['Tech', 'Health'],
    additionalInfo: 'Battery: 18h'
  },
  { 
    id: 3, 
    name: 'MX Mechanical Tactile Wireless', 
    brand: 'LOGITECH',
    price: 169.99, 
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1585506942812-e72e4d2847be?w=1600&q=90', 
    category: 'Computing',
    rating: 4.8,
    reviews: '5,100',
    description: 'Low-profile mechanical switches deliver next-level typing feel.',
    features: ['Mechanical Switches', 'Backlit', 'Logi Bolt'],
    sizes: ['Compact', 'Full'],
    colors: ['Graphite', 'Pale Grey'],
    colorMap: {
      'Graphite': '#374151',
      'Pale Grey': '#f3f4f6'
    },
    variantData: {
      'Graphite': {
        main: 'https://images.unsplash.com/photo-1585506942812-e72e4d2847be?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&q=80']
      },
      'Pale Grey': {
        main: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1585506942812-e72e4d2847be?w=400&q=80']
      }
    },
    sku: 'LOG-MX-MCH',
    tags: ['Office', 'Tech'],
    additionalInfo: 'Charge: USB-C'
  },
  { 
    id: 4, 
    name: 'Aviator Classic Polarized', 
    brand: 'RAY-BAN',
    price: 159.00, 
    originalPrice: 210.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=90', 
    category: 'Fashion',
    rating: 4.7,
    reviews: '3,200',
    description: 'Classic aviator frames with G-15 polarized lenses.',
    features: ['Polarized', 'UV Protection', 'Metal Frame'],
    sizes: ['Standard', 'Wide'],
    colors: ['Gold/Black', 'Silver/Blue', 'Gunmetal'],
    colorMap: {
      'Gold/Black': '#000000',
      'Silver/Blue': '#1e3a8a',
      'Gunmetal': '#4b5563'
    },
    variantData: {
      'Gold/Black': {
        main: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&q=80']
      },
      'Silver/Blue': {
        main: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80']
      },
      'Gunmetal': {
        main: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80']
      }
    },
    sku: 'RB-AV-POL',
    tags: ['Fashion', 'Summer'],
    additionalInfo: 'Material: Metal'
  },
  { 
    id: 5, 
    name: 'Nest Audio Smart Home', 
    brand: 'GOOGLE',
    price: 89.99, 
    originalPrice: 119.00,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=1600&q=90', 
    category: 'Electronics',
    rating: 4.6,
    reviews: '15,000',
    description: 'Meet Nest Audio. Hear music the way it should sound, with crisp vocals and powerful bass.',
    features: ['Google Assistant', 'Stereo Pair', 'Smart Home Control'],
    sizes: ['Standard'],
    colors: ['Chalk', 'Charcoal', 'Sky'],
    colorMap: {
      'Chalk': '#f8fafc',
      'Charcoal': '#1f2937',
      'Sky': '#bae6fd'
    },
    variantData: {
      'Chalk': {
        main: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&q=80']
      },
      'Charcoal': {
        main: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80']
      },
      'Sky': {
        main: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80']
      }
    },
    sku: 'GOOG-NST-AU',
    tags: ['Speaker', 'Smart Home'],
    additionalInfo: 'Drivers: 75mm woofer'
  },
  { 
    id: 6, 
    name: 'Leather Messenger Business', 
    brand: 'FOSSIL',
    price: 145.00, 
    originalPrice: 195.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=90', 
    category: 'Fashion',
    rating: 4.8,
    reviews: '2,400',
    description: 'Stay organized with a bag that’s as professional as you are.',
    features: ['Genuine Leather', 'Laptop Sleeve', 'Brass Hardware'],
    sizes: ['Medium', 'Large'],
    colors: ['Cognac', 'Black'],
    colorMap: {
      'Cognac': '#78350f',
      'Black': '#000000'
    },
    variantData: {
      'Cognac': {
        main: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80']
      },
      'Black': {
        main: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=1600&q=90',
        gallery: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80']
      }
    },
    sku: 'FOS-BAG-LTHR',
    tags: ['Bag', 'Business'],
    additionalInfo: 'Material: Leather'
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
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
  const shipping = 5.00;
  const total = subtotal + gst + shipping;

  const renderStore = () => {
    // Filter and Sort Logic (Basic for demo)
    const filteredProducts = dummyProducts;

    return (
      <main className="main-content store-view">
        <div className="breadcrumb-nav">
          <span>Home / <strong>Products</strong></span>
        </div>

        <div className="store-layout">
          {/* Sidebar Filters */}
          <aside className="sidebar">
            <div className="filter-header">
              <h3>FILTERS</h3>
              <button className="clear-all">CLEAR ALL</button>
            </div>

            <div className="filter-section">
              <h4>CATEGORIES</h4>
              <div className="filter-options">
                <label><input type="checkbox" defaultChecked /> Electronics <span>(2)</span></label>
                <label><input type="checkbox" defaultChecked /> Fashion <span>(2)</span></label>
                <label><input type="checkbox" defaultChecked /> Accessories <span>(1)</span></label>
                <label><input type="checkbox" defaultChecked /> Computing <span>(1)</span></label>
              </div>
            </div>

            <div className="filter-section">
              <h4>BRAND</h4>
              <div className="filter-options">
                <label><input type="checkbox" /> SONY</label>
                <label><input type="checkbox" /> APPLE</label>
                <label><input type="checkbox" /> RAY-BAN</label>
                <label><input type="checkbox" /> FOSSIL</label>
              </div>
            </div>

            <div className="filter-section">
              <h4>PRICE</h4>
              <div className="filter-options">
                <label><input type="radio" name="price" /> Rs. 0 to Rs. 100</label>
                <label><input type="radio" name="price" /> Rs. 100 to Rs. 200</label>
                <label><input type="radio" name="price" /> Rs. 200 to Rs. 500</label>
              </div>
            </div>

            <div className="filter-section">
              <h4>COLOR</h4>
              <div className="color-swatches-filter">
                <span className="swatch" style={{backgroundColor: '#000000'}}></span>
                <span className="swatch" style={{backgroundColor: '#ffffff', border: '1px solid #ddd'}}></span>
                <span className="swatch" style={{backgroundColor: '#3b82f6'}}></span>
                <span className="swatch" style={{backgroundColor: '#ef4444'}}></span>
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
                <select>
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
                    <div className="view-details-overlay">
                      <span>View Details</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h4 className="brand-name">{product.brand}</h4>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="price-row">
                      <span className="current-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <>
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                          <span className="discount-tag">({Math.round((1 - product.price/product.originalPrice) * 100)}% OFF)</span>
                        </>
                      )}
                    </div>
                    <div className="card-swatches">
                      {product.colors.map(color => (
                        <span 
                          key={color} 
                          className="mini-swatch" 
                          style={{ background: product.colorMap[color] }}
                        ></span>
                      ))}
                    </div>
                    <button className="add-to-cart-btn" onClick={() => {
                      addToCart(product, 1, product.sizes[0], product.colors[0]);
                    }}>
                      Add to Cart
                    </button>
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
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="qty-picker">
                            <button onClick={() => updateCartItemQty(item.cartId, (item.qty || 1) - 1)}>-</button>
                            <span>{item.qty || 1}</span>
                            <button onClick={() => updateCartItemQty(item.cartId, (item.qty || 1) + 1)}>+</button>
                          </div>
                        </td>
                        <td>${(item.price * (item.qty || 1)).toFixed(2)}</td>
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
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>GST (12%)</span>
                    <span>${gst.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>SHIPPING</span>
                    <div className="shipping-info">
                      <p>Flat rate: ${shipping.toFixed(2)}</p>
                      <p>Shipping to India</p>
                      <button>CHANGE ADDRESS</button>
                    </div>
                  </div>
                  <div className="summary-row total">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
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
                        <span>${(item.price * (item.qty || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-row">
                    <span>SUBTOTAL</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="order-row">
                    <span>GST (12%)</span>
                    <span>${gst.toFixed(2)}</span>
                  </div>
                  <div className="order-row">
                    <span>SHIPPING</span>
                    <span>Flat rate: ${shipping.toFixed(2)}</span>
                  </div>
                  <div className="order-row total">
                    <span>TOTAL</span>
                    <span>${total.toFixed(2)}</span>
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
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setView('store')} style={{cursor: 'pointer'}}>GeminiCommerce</div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
            )}
          </button>
          <div className="nav-cart" onClick={() => setView('cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge">{cart.length}</span>
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
                <span>&lt; PREV</span>
                <span>NEXT &gt;</span>
              </div>
            </div>

            <div className="modal-body-main">
              <div className="modal-gallery">
                <div className="thumbnails">
                  <div 
                    className={`thumb ${activeImage === (selectedProduct.variantData[selectedColor]?.main || selectedProduct.image) ? 'active' : ''}`} 
                    onClick={() => setActiveImage(selectedProduct.variantData[selectedColor]?.main || selectedProduct.image)}
                  >
                    <img src={selectedProduct.variantData[selectedColor]?.main || selectedProduct.image} alt="main" />
                  </div>
                  {selectedProduct.variantData[selectedColor]?.gallery.map((img, i) => (
                    <div key={i} className={`thumb ${activeImage === img ? 'active' : ''}`} onClick={() => setActiveImage(img)}>
                      <img src={img} alt={`thumb-${i}`} />
                    </div>
                  ))}
                </div>
                <div className="main-modal-image">
                  <img key={activeImage} src={activeImage} alt={selectedProduct.name} className="image-fade-in" />
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
                <p className="modal-price">${selectedProduct.price.toFixed(2)}</p>
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
                {activeTab === 'description' && <p>{selectedProduct.description}</p>}
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
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.cartId)}>&times;</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="total-row">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
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
