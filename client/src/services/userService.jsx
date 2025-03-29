import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BASE_API_URL = `${API_URL}/api/users`;

export const createUser = async (userData) => {
  const response = await axios.post(BASE_API_URL, userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(BASE_API_URL);
  return response.data;
};
export const getRoles = async () => {
  const response = await axios.get(BASE_API_URL);
  return response.data;
};

// export const getUserById = async (id) => {
//   try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching user data:", error);
//       return null; // Ensure it doesn't crash if the API fails
//   }
// };

export const getUserById = async (id) => {
  if (!id) throw new Error("User ID is required");
  
  const res = await fetch(`${API_URL}/api/users/${id}`); // Ensure correct port
  if (!res.ok) {
      throw new Error("Failed to fetch user");
  }
  return await res.json();
};



export const updateUser = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: "PUT", // or "PATCH" if only updating specific fields
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
      throw new Error("Failed to update user");
  }

  return res.json();
};


export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
