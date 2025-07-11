import axios from 'axios';

// Helper to get auth token from localStorage
const getAuthToken = () => localStorage.getItem('HRDS_ACCESS');

// Retrieve all data from sheet
export const getAllData = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get("http://localhost:3000/data", {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw for error handling in components
    }
};

// Add new data to sheet
export const addData = async (data) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(
            "http://localhost:3000/data/entry",
            data,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding data:', error);
        throw error;
    }
};

// Update existing data in sheet
export const updateData = async (id, data) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(`http://localhost:3000/dataupdate/${id}`,
            data,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// Delete data from sheet
export const deleteData = async (id) => {
    try {
        const token = getAuthToken();
        const response = await axios.put(
            `http://localhost:3000/datadelete/${id}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};