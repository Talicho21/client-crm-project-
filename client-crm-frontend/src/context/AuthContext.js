import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ MULTIPLE ADMIN CREDENTIALS - Add as many as you want!
  const ADMIN_CREDENTIALS = [
    {
      email: 'admin@crm.com',
      password: 'admin123',
      username: 'Admin User',
      id: '1'
    },
    {
      email: 'john@crm.com',
      password: 'john123',
      username: 'John Admin',
      id: '2'
    },
    {
      email: 'sarah@crm.com',
      password: 'sarah123',
      username: 'Sarah Manager',
      id: '3'
    },
    // Add more admins here:
    // {
    //   email: 'your_email@domain.com',
    //   password: 'your_password',
    //   username: 'Your Name',
    //   id: '4'
    // }
  ];

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // Only set if it's admin (extra security)
      if (parsedUser.role === 'admin') {
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // LOGIN FUNCTION - Checks against multiple admins
  const login = (email, password) => {
    
    // Find if any admin matches the entered credentials
    const foundAdmin = ADMIN_CREDENTIALS.find(
      admin => admin.email === email && admin.password === password
    );
    
    // If found, login successful
    if (foundAdmin) {
      
      const userData = {
        id: foundAdmin.id,
        username: foundAdmin.username,
        email: foundAdmin.email,
        role: 'admin'
      };
      
      const token = 'admin-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { 
        success: true, 
        user: userData 
      };
    }
    
    // If no admin found, login fails
    return { 
      success: false, 
      error: 'Invalid admin credentials. Access denied.' 
    };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};