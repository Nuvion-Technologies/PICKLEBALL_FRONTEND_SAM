import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const AuthContext = createContext(null);
const SECRET_KEY = 'your-secret-key-here'; // In production, use environment variable

// Encryption/Decryption helpers
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
};

export const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const encryptedToken = localStorage.getItem('authToken');
      const encryptedUser = localStorage.getItem('user');

      if (encryptedToken && encryptedUser) {
        const decryptedUser = decryptData(encryptedUser);
        if (decryptedUser) {
          setIsAuthenticated(true);
          setUser(decryptedUser);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (credentials) => {
    const users = {
      'admin@flicknroll.com': {
        name: 'Admin User',
        role: 'Admin',
        password: 'fnr25'
      },
      'manager@flicknroll.com': {
        name: 'Manager User',
        role: 'Manager',
        password: 'fnr25'
      },
      'member@flicknroll.com': {
        name: 'Member User',
        role: 'Member',
        password: 'fnr25'
      }
    };

    const userInfo = users[credentials.email];
    
    if (userInfo && credentials.password === userInfo.password) {
      const userData = {
        name: userInfo.name,
        email: credentials.email,
        role: userInfo.role
      };

      // Generate a simple JWT-like token (in production, use proper JWT library)
      const token = btoa(JSON.stringify({
        user: userData.email,
        exp: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
      }));
      
      // Encrypt and store auth data
      const encryptedToken = encryptData(token);
      const encryptedUser = encryptData(userData);
      
      localStorage.setItem('authToken', encryptedToken);
      localStorage.setItem('user', encryptedUser);
      
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};