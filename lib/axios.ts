import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const username = "mvp-user";
    const password = "int20hmvp";

    const basicAuth = btoa(`${username}:${password}`);
    config.headers.Authorization = `Basic ${basicAuth}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
