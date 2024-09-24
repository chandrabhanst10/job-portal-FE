import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500', // Your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // You can modify the request config if needed
    // For example, you can add headers or modify the URL
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle errors globally if needed
    console.error('Response Error:', error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
