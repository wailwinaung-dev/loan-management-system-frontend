// src/api/axios.ts
import axios from 'axios';

// Set up Axios with the base URL of your backend API
const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export default axios.create({
  baseURL: API_URL,
});
