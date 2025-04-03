import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;
const AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const createUser = async (userData) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();

};


export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, getAuthHeaders());
    return response.data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
