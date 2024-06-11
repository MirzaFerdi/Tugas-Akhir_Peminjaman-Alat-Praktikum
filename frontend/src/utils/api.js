import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Content-Encoding": "gzip",
  },
});

api.interceptors.request.use(
  (config) => {
    const userPayloads = JSON.parse(localStorage.getItem("user_payloads"));
    if (userPayloads?.token) {
      config.headers.Authorization = `Bearer ${userPayloads?.token}`;
    }
    if (config.method === "put" || config.method === "PUT") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      window.location.href = "/forbidden";
    }
    return Promise.reject(error);
  }
);
