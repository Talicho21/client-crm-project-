import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaUsers, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '15px 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <Link to="/dashboard" style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: 'white', 
        textDecoration: 'none' 
      }}>
        Client CRM
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ 
          textDecoration: 'none', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <FaTachometerAlt /> Dashboard
        </Link>
        
        <Link to="/leads" style={{ 
          textDecoration: 'none', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <FaUsers /> Leads
        </Link>
        
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              padding: '8px 15px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px'
            }}
          >
            <FaUserCircle size={24} color="#ffd700" />
            <span>{user?.username || 'Admin'}</span>
            <FaChevronDown size={12} />
          </div>

          {showDropdown && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: 0,
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
              width: '150px',
              zIndex: 1000
            }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: 'none',
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;