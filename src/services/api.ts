import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7157",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default api;
