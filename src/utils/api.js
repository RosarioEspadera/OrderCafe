import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchMenuItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};

export const submitOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/order`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
};