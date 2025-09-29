import React from 'react';
import { useAuth } from '../context/AuthContext';

const FlowerGallery = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  
  const flowers = [
    {
      name: 'Rose',
      image: '/images/rose.jpg',
      description: 'A beautiful flower known for its fragrance and variety of colors.'
    },
    {
      name: 'Lily of the Valley',
      image: '/images/lily-of-the-valley.jpg',
      description: 'A delicate flower with a sweet scent, often associated with spring.'
    },
    {
      name: 'Foxtail Orchid',
      image: '/images/Foxtail-Orchid.jpg',
      description: 'An exotic flower known for its unique shape and vibrant colors.'
    },
    {
      name: 'Sunflower',
      image: '/images/sunflower.jpg',
      description: 'A vibrant yellow flower known for its love of the sun as the name suggests.'
    },
    {
      name: 'Gloriosa',
      image: '/images/Gloriosa.jpg',
      description: 'A stunning climbing lily with flame-like petals in red and yellow hues.'
    },
    {
      name: 'Hibiscus',
      image: '/images/Hibiscus.jpg',
      description: 'A tropical flower with large, showy blooms in vibrant colors.'
    },
    {
      name: 'Jasmine',
      image: '/images/jasmine.jpg',
      description: 'A fragrant white flower often used in perfumes and teas.'
    },
    {
      name: 'Lotus',
      image: '/images/lotus.jpg',
      description: 'A sacred flower symbolizing purity and enlightenment in many cultures.'
    },
    {
      name: 'Marigold',
      image: '/images/Marigold.jpg',
      description: 'A bright and cheerful flower commonly used in celebrations and decorations.'
    }
  ];

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h2>🌸 Flower Gallery</h2>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={() => onNavigate('shop')} className="list-button">
            Shop
          </button>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>
      
      <div className="card-container">
        {flowers.map((flower, index) => (
          <div 
            className="card" 
            key={index}
            onClick={() => onNavigate('shop', flower.name)}
            style={{ cursor: 'pointer' }}
          >
            <img src={flower.image} alt={flower.name} className="card-image" />
            <div className="card-content">
              <h3>{flower.name}</h3>
              <p>{flower.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerGallery;