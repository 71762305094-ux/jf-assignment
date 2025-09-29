import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (login(email, password)) {
      onNavigate('gallery');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to view the flower gallery</p>
        
        <div className="auth-form">
          <div className="form-group">
            <div className="form-label">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <div className="form-label">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button onClick={handleSubmit} className="auth-button">
            Sign In
          </button>
        </div>
        
        <p className="auth-switch">
          Don't have an account? 
          <button 
            className="link-button" 
            onClick={() => onNavigate('register')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;