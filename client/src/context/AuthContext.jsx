import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (data) => {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data));
    setUser(data);
  };

  const register = async (data) => {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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