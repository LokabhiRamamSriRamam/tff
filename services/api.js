// services/api.js
import axios from "axios";
const API_BASE = "http://localhost:4000/api";

const api = {
  fetchProductsByQuery: async (params) => {
    const res = await axios.get(`${API_BASE}/products`, { params });
    return res;
  },
};

export default api;
