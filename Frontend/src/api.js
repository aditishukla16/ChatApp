// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Backend API base URL
  withCredentials: true, // ✅ Always send cookies/auth headers
});

// Optional: You can add interceptors for logging or error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
