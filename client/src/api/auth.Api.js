import axios from 'axios';

const backendUrl = import.meta.env.VITE_API_URL || "https://api.betarbazar.com";;

// Register
export const registerUser = async (userData) => {
  try {
    //const response = await axios.post("http://localhost:5000/api/users/register", userData);
    const response = await axios.post(`${backendUrl}/api/users/register`, userData);

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
    //const { data } = await axios.post("http://localhost:5000/api/auth/login", userData);
    const { data } = await axios.post(`${backendUrl}/api/auth/login`, userData);
    return data;
  } catch (error) {
    throw error.response.data;
  }
}


// Reset Password
export const resetPassword = async (token, newPassword) => {
  try {
    //const { data } = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password: newPassword });
    const { data } = await axios.post(`${backendUrl}/api/users/reset-password/${token}`, { password: newPassword });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};