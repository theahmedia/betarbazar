import axios from 'axios';

// Register
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, userData);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token); // Store token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user info
    }

    return response.data;
  } catch (error) {
    return error.response?.data?.message || "Registration failed.";
  }
};
// Login
export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, userData);
    return data;
  } catch (error) {
    throw error.response.data;
  }
}


// Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`, { password: newPassword });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};