import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await API.post('/register', userData);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/login', credentials);
        return { success: true, data: response.data, status: response.status };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        };
    }
};

export const getAllUsers = async () => {
    try {
        const response = await API.get('/users');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await API.put(`/update/users/${id}`, userData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await API.delete(`/delete/users/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};
