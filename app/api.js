import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080', // or your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ error: "No response from server" });
    } else {
      // Something happened in setting up the request
      return Promise.reject({ error: error.message });
    }
  }
);

export default api;