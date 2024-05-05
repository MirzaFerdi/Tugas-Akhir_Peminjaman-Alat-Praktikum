import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.interceptors.request.use(
  (config) => {
    const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));
    if (userPayloads?.token) {
      config.headers.Authorization = `Bearer ${userPayloads?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
