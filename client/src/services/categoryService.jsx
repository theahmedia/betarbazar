import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BASE_API_URL = `${API_URL}/api/categories`;

export const fetchCategories = async () => {
  const response = await axios.get(BASE_API_URL);
  return response.data;
};

export const createCategory = async (formData) => {
  return await axios.post(BASE_API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCategory = async (id, formData) => {
  return await axios.put(`${BASE_API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${BASE_API_URL}/${id}`);
};
