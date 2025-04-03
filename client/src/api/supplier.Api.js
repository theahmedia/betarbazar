import axios from 'axios';

const API_URL = 'http://localhost:5000/api/suppliers';

export const getSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSupplier = async (supplier) => {
  const response = await axios.post(API_URL, supplier);
  return response.data;
};

export const updateSupplier = async (id, supplier) => {
  const response = await axios.put(`${API_URL}/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};