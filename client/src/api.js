import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 