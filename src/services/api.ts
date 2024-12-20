import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  // Add Authorization token if exists
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error(error.response?.data || "An error occurred");
    return Promise.reject(error);
  }
);

export default api;
