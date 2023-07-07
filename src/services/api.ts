import axios from "axios";

const api = axios.create({
  baseURL: "apiretronatus.azurewebsites.net",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default api;
