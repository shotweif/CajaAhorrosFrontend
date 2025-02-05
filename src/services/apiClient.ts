import { Client, LoginRequest } from '../Models/Client';
import api from "./axiosConfig";

// const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;

// **Crear usuario**
export const SignupUser = async (client: Client) => {
    const response = await api.post(`Clientes/Register`, client);
    console.log(response.data);
    return response.data;
}

// **Iniciar sesión**
export const LoginUser = async (client: LoginRequest) => {
    const response = await api.post("/Clientes/Login", client);
    console.log(response.data);
    return response.data;
};

// **Obtener perfil de usuario**
// export const getUserProfile = async () => {
//     try {
//         const response = await api.get("/Clientes/Perfil");
//         return response.data;

//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Error al obtener perfil:', {
//                 status: error.response?.status,
//                 data: error.response?.data,
//                 headers: error.response?.headers
//             });
            
//             // Si es error de autenticación
//             if (error.response?.status === 401) {
//                 throw new Error('No autorizado. Por favor, inicie sesión nuevamente.');
//             }
//         }
//         throw error;
//     }
// };

// **Obtener perfil de usuario**
export const getUserProfile = async (userWebId: string) => {
    const response = await api.get(`/Clientes/Perfil/${userWebId}`,);
    return response.data;
};

// **Obtener las cuentas del usuario**
export const CreateAccountsUser = async (userId: number) => {
    const response = await api.post(`/Clientes/CrearCuenta/${userId}`,);
    return response.data;
};

export const getAccountsUser = async (userId: number) => {
    const response = await api.get(`/Clientes/ConsultarCuentas/${userId}`,);
    return response.data;
};

export const validateAccount = async (accountNumber: string) => {
    const response = await api.get(`/Clientes/Validar/${accountNumber}`,);
    console.log(response.data)
    return response.data;
    // console.log(accountNumber);
    // return true;
};

export const startTransfer = async (transferencia: any) => {
    console.log('se va a realizar: ', transferencia);
    const response = await api.post("/Clientes/IniciarTransferencia",  transferencia );
    console.log('llego: ', response.data);
    return response.data;
};

// **Actualizar perfil del usuario**
export const updateUserProfile = async (profileData: any) => {
    const response = await api.put("/Clientes/Perfil", profileData);
    return response.data;
};

// **Cerrar sesión** (opcional: limpiar localStorage)
export const logoutUser = () => {
    localStorage.removeItem("token");
};



export const VerifyUser = async (authToken: string, email: string): Promise<boolean> => {
    const response = await api.post(`Clientes/`, {authToken, email});
    return response.data;
}