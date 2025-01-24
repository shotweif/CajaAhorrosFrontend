import axios, { AxiosError } from "axios";

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;
const TIME_OUT = 5000;

const api = axios.create({
    baseURL: BACKEND_ENDPOINT,
    timeout: TIME_OUT,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para requests
api.interceptors.request.use(
    (config) => {
        const Token = localStorage.getItem("token");
        
        // Debugging
        // console.log('Token en localStorage:', token);
        
        if (Token) {
            // Verificar formato del token
            // if (!token.includes('.')) {
            //     console.error('Token malformado:', token);
            //     throw new Error('Token JWT malformado');
            // }
            
            config.headers.Authorization = `Bearer ${Token}`;
            
            // Debugging
            console.log('Header de autorización:', config.headers.Authorization);
        } else {
            console.warn('No se encontró token en localStorage');
        }

        return config;
    },
    (error) => {
        console.error('Error en interceptor de request:', error);
        return Promise.reject(error);
    }
);

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Añadir interceptor para respuestas
// api.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         if (error.response?.status === 401) {
//             console.error('Error de autenticación:', error.response);
//             // Opcional: Redirigir al login o limpiar el token
//             localStorage.removeItem('token');
//         }
//         return Promise.reject(error);
//     }
// );

export default api;





// import axios from "axios";

// const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;
// const TIME_OUT = 5000;

// const api = axios.create({
//     baseURL: BACKEND_ENDPOINT, // URL backend
//     timeout: TIME_OUT, // Tiempo máximo de espera
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Interceptor para añadir el token de autenticación si está disponible
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // Obtén el token almacenado

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//             console.log('interceptor: ', config.headers.Authorization);

//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// export default api;
