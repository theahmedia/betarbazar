import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/brands`;

export const fetchBrands = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return the brands data
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;  // Throw an error if the request fails
  }
};

export const createBrand = async (brandData) => {
  try {
    const response = await axios.post(API_URL, brandData);
    return response.data;  // Return the newly created brand
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
};

export const updateBrand = async (id, brandData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, brandData);
    return response.data;  // Return the updated brand
  } catch (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
};

export const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with an error:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to delete brand');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from the server');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up the request:', error.message);
      throw new Error('Failed to delete brand');
    }
  }
};
