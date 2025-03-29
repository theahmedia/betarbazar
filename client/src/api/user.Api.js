import axios from "axios";

// Use the environment variable for API URL to switch between development and production environments
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/users"; // Default to local for development

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

// Fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response ? error.response.data : error;
  }
};

// Create user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/register`,
      userData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // assuming response contains the created user or token
  } catch (error) {
    console.error("Error creating user:", error);
    throw error.response ? error.response.data : error;
  }
};

// Update user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, getAuthHeaders());
    return response.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error.response ? error.response.data : error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response ? error.response.data : error;
  }
};
