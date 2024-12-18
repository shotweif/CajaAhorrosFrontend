import axios from "axios";

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;
const TIME_OUT = 5000;

const api = axios.create({
    baseURL: BACKEND_ENDPOINT, // URL backend
    timeout: TIME_OUT, // Tiempo máximo de espera
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el token de autenticación si está disponible
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
