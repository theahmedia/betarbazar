import axios from "axios";

// Use environment variable for API URL to switch between development and production
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth"; // Default to local for development
const PRODUCT_API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products`; // Default to local for development

// User API
export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const forgotPassword = async (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token, newPassword) => {
  return axios.post(`${API_URL}/reset-password`, { token, newPassword });
};

// Product API
export const fetchHotDeals = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/hot-deals`);
  return response.data;
};

export const fetchTodaysMarketPrice = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/todays-market-price`);
  return response.data;
};

export const fetchTopSelling = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/top-selling`);
  return response.data;
};

export const fetchBestSeller = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/best-seller`);
  return response.data;
};

export const fetchNewArrivals = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/new-arrivals`);
  return response.data;
};

export const fetchTopRated = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/top-rated`);
  return response.data;
};

export const fetchFeaturedProducts = async () => {
  const response = await axios.get(`${PRODUCT_API_URL}/featured-products`);
  return response.data;
};
