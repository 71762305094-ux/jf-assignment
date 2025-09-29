import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FlowerShop = ({ onNavigate, selectedFlower }) => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const flowers = [
    {
      id: 1,
      name: 'Rose',
      image: '/images/rose.jpg',
      description: 'A beautiful flower known for its fragrance and variety of colors. Perfect for expressing love and admiration.',
      price: 15.99,
      category: 'Classic'
    },
    {
      id: 2,
      name: 'Lily of the Valley',
      image: '/images/lily-of-the-valley.jpg',
      description: 'A delicate flower with a sweet scent, often associated with spring. Symbolizes happiness and purity.',
      price: 22.50,
      category: 'Delicate'
    },
    {
      id: 3,
      name: 'Foxtail Orchid',
      image: '/images/Foxtail-Orchid.jpg',
      description: 'An exotic flower known for its unique shape and vibrant colors. A rare and luxurious choice.',
      price: 45.00,
      category: 'Exotic'
    },
    {
      id: 4,
      name: 'Sunflower',
      image: '/images/sunflower.jpg',
      description: 'A vibrant yellow flower known for its love of the sun. Brings joy and positivity to any space.',
      price: 12.99,
      category: 'Cheerful'
    },
    {
      id: 5,
      name: 'Gloriosa',
      image: '/images/Gloriosa.jpg',
      description: 'A stunning climbing lily with flame-like petals in red and yellow hues. An eye-catching tropical beauty.',
      price: 38.00,
      category: 'Exotic'
    },
    {
      id: 6,
      name: 'Hibiscus',
      image: '/images/Hibiscus.jpg',
      description: 'A tropical flower with large, showy blooms in vibrant colors. Perfect for creating a paradise atmosphere.',
      price: 18.50,
      category: 'Tropical'
    },
    {
      id: 7,
      name: 'Jasmine',
      image: '/images/jasmine.jpg',
      description: 'A fragrant white flower often used in perfumes and teas. Known for its sweet, romantic scent.',
      price: 20.00,
      category: 'Fragrant'
    },
    {
      id: 8,
      name: 'Lotus',
      image: '/images/lotus.jpg',
      description: 'A sacred flower symbolizing purity and enlightenment in many cultures. Elegant and serene.',
      price: 32.00,
      category: 'Sacred'
    },
    {
      id: 9,
      name: 'Marigold',
      image: '/images/Marigold.jpg',
      description: 'A bright and cheerful flower commonly used in celebrations and decorations. Symbolizes warmth and creativity.',
      price: 10.99,
      category: 'Cheerful'
    }
  ];

  const displayFlower = selectedFlower 
    ? flowers.find(f => f.name === selectedFlower)
    : null;

  const handleBuy = (flower) => {
    setCart([...cart, flower]);
    setNotification(`${flower.name} added to cart! 🌸`);
    setTimeout(() => setNotification(''), 3000);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, flower) => total + flower.price, 0).toFixed(2);
  };

  return (
    <div className="shop-container">
      <header className="gallery-header">
        <h2 
          onClick={() => onNavigate('gallery')} 
          style={{ cursor: 'pointer' }}
          className="clickable-title"
        >
          🌸 Flower Gallery
        </h2>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={() => onNavigate('gallery')} className="list-button">
            Gallery
          </button>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {displayFlower ? (
        // Single Flower Detail View
        <div className="single-flower-view">
          <button onClick={() => onNavigate('shop')} className="back-button">
            ← Back to Shop
          </button>
          <div className="flower-detail-card">
            <div className="flower-detail-image-container">
              <img 
                src={displayFlower.image} 
                alt={displayFlower.name} 
                className="flower-detail-image"
              />
              <span className="category-badge">{displayFlower.category}</span>
            </div>
            <div className="flower-detail-content">
              <h1 className="flower-detail-title">{displayFlower.name}</h1>
              <p className="flower-detail-description">{displayFlower.description}</p>
              <div className="flower-detail-price">
                <span className="price-label">Price:</span>
                <span className="price-amount">${displayFlower.price}</span>
              </div>
              <button 
                onClick={() => handleBuy(displayFlower)} 
                className="buy-button-large"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Shop Grid View
        <div className="shop-content">
          <div className="shop-header-section">
            <h1 className="shop-title">🛍️ Flower Shop</h1>
            <p className="shop-subtitle">Browse our beautiful collection of flowers</p>
            {cart.length > 0 && (
              <div className="cart-summary">
                <span className="cart-count">Cart: {cart.length} items</span>
                <span className="cart-total">Total: ${getTotalPrice()}</span>
              </div>
            )}
          </div>

          <div className="shop-grid">
            {flowers.map((flower) => (
              <div className="shop-card" key={flower.id}>
                <div className="shop-card-image-container">
                  <img 
                    src={flower.image} 
                    alt={flower.name} 
                    className="shop-card-image"
                    onClick={() => onNavigate('shop', flower.name)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span className="category-badge-small">{flower.category}</span>
                </div>
                <div className="shop-card-content">
                  <h3 className="shop-card-title">{flower.name}</h3>
                  <p className="shop-card-description">{flower.description}</p>
                  <div className="shop-card-footer">
                    <span className="shop-card-price">${flower.price}</span>
                    <button 
                      onClick={() => handleBuy(flower)} 
                      className="buy-button"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerShop;