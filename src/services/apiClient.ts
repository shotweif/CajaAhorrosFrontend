import { Client, LoginRequest } from '../Models/Client';
import api from "./axiosConfig";

// const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;

//---- SECCION DE ACCIONES DEL USUARIO----//
// **Crear usuario**
export const SignupUser = async (client: Client) => {
    const response = await api.post(`Clientes/Register`, client);
    // console.log(response.data);
    return response.data;
}

// **Iniciar sesión**
export const LoginUser = async (client: LoginRequest) => {
    const response = await api.post("/Clientes/Login", client);
    // console.log(response.data);
    return response.data;
};

// **Obtener perfil de usuario**
export const getUserProfile = async (userWebId: string) => {
    const response = await api.get(`/Clientes/Perfil/${userWebId}`,);
    // console.log(response.data);
    return response.data;
};

//---- SECCION DE ACCIONES EN LAS CUENTAS DEL USUARIO----//
// **Se crea la cuenta del usuario**
export const CreateAccountsUser = async (userId: number) => {
    const response = await api.post(`/CuentaAhorro/CrearCuenta/${userId}`,);
    return response.data;
};

// **Obtener las cuentas del usuario**
export const getAccountsUser = async (userId: number) => {
    const response = await api.get(`/CuentaAhorro/ConsultarCuentas/${userId}`,);
    return response.data;
};

// **Se valida que la cuenta exista**
export const validateAccount = async (accountNumber: string) => {
    const response = await api.get(`/CuentaAhorro/Validar/${accountNumber}`,);
    // console.log(response.data)
    return response.data;
};

// **Se realiza la transaccion**
export const startTransfer = async (transferencia: any) => {
    const response = await api.put("/CuentaAhorro/IniciarTransferencia",  transferencia );
    return response.data;
};

// **Obtenemos el historial de transacciones**
export const getUserTransacctons = async (userId: number) => {
    const response = await api.get(`/CuentaAhorro/SummaryTransactions/${userId}`,);
    return response.data;
};
// **Obtenemos el historial de transacciones por filtro**
export const postUserTransacctonsFilter = async (userId: number, dateFilter: string, accountFilter: string) => {
    const filterData = {dateFilter, accountFilter}
    const response = await api.post(`/CuentaAhorro/SummaryTransactionsFilter/${userId}`,  filterData);
    return response.data.value;
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