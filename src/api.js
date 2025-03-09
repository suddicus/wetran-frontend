import axios from "axios";

const API_URL = "https://website-traffic-analyzer.herokuapp.com/api";

export const register = (email, password) => axios.post(`${API_URL}/auth/register`, { email, password });

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const getTrafficStats = async (website) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/traffic/stats?website=${website}`, {
        headers: { Authorization: token }
    });
    return response.data;
};

export const logout = () => localStorage.removeItem("token");
