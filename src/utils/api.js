import axios from 'axios';

const API_BASE_URL = 'https://ordercafe-backend.onrender.com'; // Use your Render backend URL

// 🧾 Fetch all menu items
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/menu`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

// 🛒 Submit a new order
export const submitOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/order`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

// 🧍 Fetch a user's profile by ID
export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// 💾 Save or update user profile data
export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/update`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
