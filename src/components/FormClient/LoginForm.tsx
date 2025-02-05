import React, { useCallback, useState } from "react";
// import { validateForm } from '../../utility/Validation';
import { LoginRequest } from '../../Models/Client';
import { LoginUser } from '../../services/apiClient';
import { useAuth } from "../../contexts/AuthContext";
// import ToastifyComp from "../Notify/toastifyComp"; // Adjust the import path as necessary

interface LoginFormProp {
    signupLogin: () => void;
    waitResponse: (awaitRes: boolean) => void;
}

const LoginForm: React.FC<LoginFormProp> = ({ signupLogin, waitResponse }) => {
    const { login } = useAuth();
    const [userData, setUserData] = useState<LoginRequest>({ CorreoElectronico: '', Password: '' });
    // const [notifyCreate, setNotifyCreate] = useState<any>();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    }, [setUserData]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        waitResponse(true);

        try {
            const dataLogin = await LoginUser(userData); // Llama a la función de Axios
            login(dataLogin); // Guarda el token en el estado global

        } catch (error: any) {
            console.error("Error al iniciar sesión:", error.response?.data || error.message);
        }
        
        waitResponse(false);
    };

    return (
        <>
            <div className={` w-64 h-auto bg-[#ffffff] p-4 rounded-md shadow-xl relative`}>
                <form onSubmit={handleLogin} id="loginForm">
                    <h2 className="mb-2">Login</h2>
                    <div className="w-full text-[12px] font-normal ">
                        <input type="email"
                            name="CorreoElectronico"
                            value={userData.CorreoElectronico}
                            placeholder="Correo electrónico"
                            className="w-full h-6 p-3 py-4 bg-slate-100 rounded-md mb-2  focus:outline-none "
                            onChange={handleInputChange} />

                        <input type="password"
                            name="Password"
                            value={userData.Password}
                            placeholder="Contraseña"
                            className="w-full h-6 p-3 py-4 bg-slate-100 mb-6 rounded-md focus:outline-none " id="loginPassword"
                            onChange={handleInputChange} />
                    </div>
                    <button className="p-2 bg-purple-600 hover:bg-purple-500 transition-all text-white text-xs rounded-lg w-full"
                        // onClick={() => sendData()}
                        type="submit" form="loginForm">
                        Submit
                    </button>
                    <h3 className="text-[10px] opacity-50 cursor-pointer mt-1 mx-2" onClick={signupLogin}>Signup acount</h3>
                </form>
            </div>
            {/* <ToastifyComp mensaje={notifyCreate} /> */}
        </>
    );
}

export default LoginForm;