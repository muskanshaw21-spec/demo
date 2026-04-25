import { useState } from 'react';
import './App.css';
import Login from './Login';

const dummyProducts = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', category: 'Electronics' },
  { id: 2, name: 'Minimalist Smartwatch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', category: 'Accessories' },
  { id: 3, name: 'Ergonomic Keyboard', price: 129.50, image: 'https://images.unsplash.com/photo-1585506942812-e72e4d2847be?w=500&q=80', category: 'Computing' },
  { id: 4, name: 'Designer Sunglasses', price: 159.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80', category: 'Fashion' },
  { id: 5, name: 'Smart Home Speaker', price: 89.99, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80', category: 'Electronics' },
  { id: 6, name: 'Leather Messenger Bag', price: 145.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', category: 'Fashion' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo">GeminiCommerce</div>
        <div className="nav-cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="cart-badge">{cart.length}</span>
        </div>
      </nav>

      <main className="main-content">
        <header className="hero-section">
          <h1>Discover Premium Products</h1>
          <p>Curated collections for the modern lifestyle.</p>
        </header>

        <div className="product-grid">
          {dummyProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="card-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <span className="category-badge">{product.category}</span>
              </div>
              <div className="card-content">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
