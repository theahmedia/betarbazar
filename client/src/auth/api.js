import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
const PRODUCT_API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

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