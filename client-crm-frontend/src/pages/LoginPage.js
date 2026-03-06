import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the login function from AuthContext
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      // Login successful - redirect to dashboard
      navigate('/dashboard');
    } else {
      // Login failed - show error
      setError(result.error);
      
      // Clear password field for security
      setFormData(prev => ({
        ...prev,
        password: ''
      }));
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Admin Shield Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            background: '#1a1a2e',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '30px'
          }}>
            🔐
          </div>
        </div>

        {/* Title */}
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          color: '#333',
          fontSize: '24px'
        }}>
          Admin Portal
        </h2>
        
        {/* Admin Only Badge */}
        <div style={{
          background: '#ffd700',
          color: '#1a1a2e',
          padding: '5px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '30px',
          width: '100px',
          margin: '0 auto 30px auto'
        }}>
          ADMIN ONLY
        </div>
        
        {/* Error Message */}
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #ef9a9a',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#555',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.border = '2px solid #1a1a2e'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              required
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#555',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Admin Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.border = '2px solid #1a1a2e'}
              onBlur={(e) => e.target.style.border = '2px solid #e0e0e0'}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '25px',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#16213e'}
            onMouseOut={(e) => e.target.style.background = '#1a1a2e'}
          >
            SECURE LOGIN
          </button>
        </form>

        {/* Simple admin note - NO CREDENTIALS SHOWN */}
        <div style={{ 
          borderTop: '2px dashed #e0e0e0',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '13px',
            margin: '0',
            fontStyle: 'italic'
          }}>
            🔒 Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;