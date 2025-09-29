import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    setError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (register(formData.email, formData.password, formData.name)) {
      onNavigate('gallery');
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us to explore beautiful flowers</p>
        
        <div className="auth-form">
          <div className="form-group">
            <div className="form-label">Full Name</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <div className="form-label">Email</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <div className="form-label">Password</div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <div className="form-label">Confirm Password</div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button onClick={handleSubmit} className="auth-button">
            Create Account
          </button>
        </div>
        
        <p className="auth-switch">
          Already have an account? 
          <button 
            className="link-button" 
            onClick={() => onNavigate('login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;