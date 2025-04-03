import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerUser = async (userData) => {
  return await api.post(`/api/auth/register`, userData);
};
// export const loginUser = async (userData) => {
//   return await api.post(`/api/auth/login`, userData);
// };


export const loginUser = async (userData) => {
  try {
    console.log('Attempting to log in with userData:', userData); // Log userData for debugging
    const response = await api.post(`/api/auth/login`, userData);
    console.log('Login successful:', response.data); // Log successful response
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Invalid credentials');
    } else {
      console.error('Login failed:', error.message);
    }
    throw error;
  }
};

export const logoutUser = async () => {
  return await api.get(`/api/auth/logout`);
};