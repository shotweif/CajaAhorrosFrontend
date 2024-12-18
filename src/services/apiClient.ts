import { Client, LoginRequest } from '../Models/Client';
import api from "../utility/axiosConfig";
import axios from "axios";

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKENDPOINT;

export const SignupUser = async (client: Client) => {
    const response = await axios.post(`${BACKEND_ENDPOINT}/Register`, client);
    console.log(response.data);
    return response.data;
}

export const LoginUser = async (client: LoginRequest) => {
    // const response = await axios.post(`${BACKEND_ENDPOINT}/Login`, client);
    // localStorage.setItem("token", response.data.token); // Guardar el token en el almacenamiento local
    // sessionStorage.user = JSON.stringify(response.data);

    // console.log(response);
    const response = await api.post("/Clientes/Login", client);
    if(!response.data.success){
        return { NotifyGen: 'Error al Iniciar Sesión' };
    }
    return response.data;
}

export const GetAcount = async (client: LoginRequest) => {
    const response = await axios.post(`${BACKEND_ENDPOINT}/Login`, client);
    localStorage.setItem("token", response.data.token); // Guardar el token en el almacenamiento local
    sessionStorage.user = JSON.stringify(response.data);

    console.log(response);
    return response;
}

export const VerifyUser = async (authToken: string, email: string): Promise<boolean> => {
    const response = await axios.post(`${BACKEND_ENDPOINT}/`, {authToken, email});
    return response.data;
}