import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }
    
    // Fetch user profile if token exists
    const fetchUserProfile = async () => {
      try {
        const userData = await authAPI.getUserProfile();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to authenticate user');
        // Remove invalid token
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authAPI.login(username, password);
      
      // Store the token
      localStorage.setItem('token', result.access_token);
      
      // Fetch user profile
      const userData = await authAPI.getUserProfile();
      setUser(userData);
      
      return true;
    } catch (err) {
      let errorMessage = 'Authentication failed';
      
      if (err.response && err.response.data && err.response.data.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const isAuthenticated = !!user;
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
