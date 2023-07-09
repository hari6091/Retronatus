import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://apiretronatus.azurewebsites.net",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

const addAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
  const json = await AsyncStorage.getItem("u");

  if (json) {
    const user = JSON.parse(json);
    const token = user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
  }

  return config;
};

api.interceptors.request.use(
  async (config) => {
    return addAuthorizationHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
