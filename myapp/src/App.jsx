import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FlowerGallery from './components/FlowerGallery';
import FlowerShop from './components/FlowerShop';
import './App.css';

const AppContent = ({ currentPage, onNavigate, selectedFlower }) => {
  const { user } = useAuth();
  
  // Auto-redirect to gallery if logged in
  useEffect(() => {
    if (user && (currentPage === 'login' || currentPage === 'register')) {
      onNavigate('gallery');
    }
  }, [user, currentPage, onNavigate]);
  
  // Auto-redirect to login if not logged in and trying to access protected pages
  useEffect(() => {
    if (!user && (currentPage === 'gallery' || currentPage === 'shop')) {
      onNavigate('login');
    }
  }, [user, currentPage, onNavigate]);

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterPage onNavigate={onNavigate} />;
      case 'shop':
        return user ? <FlowerShop onNavigate={onNavigate} selectedFlower={selectedFlower} /> : <LoginPage onNavigate={onNavigate} />;
      case 'gallery':
        return user ? <FlowerGallery onNavigate={onNavigate} /> : <LoginPage onNavigate={onNavigate} />;
      default:
        return <LoginPage onNavigate={onNavigate} />;
    }
  };

  return renderPage();
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedFlower, setSelectedFlower] = useState(null);
  
  const handleNavigate = (page, flowerName = null) => {
    setCurrentPage(page);
    setSelectedFlower(flowerName);
  };
  
  return (
    <AuthProvider>
      <div className="app">
        <AppContent 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          selectedFlower={selectedFlower}
        />
      </div>
    </AuthProvider>
  );
};

export default App;