import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

export const fetchCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (formData) => {
  return await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCategory = async (id, formData) => {
  return await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
