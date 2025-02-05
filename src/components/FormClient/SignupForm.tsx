import React, { useCallback, useState } from "react";
import { validateForm } from '../../utility/Validation';
import { Client } from '../../Models/Client';
import { SignupUser } from '../../services/apiClient';
import { CircleCheckBig } from "lucide-react";

interface SignupFormProp {
    signupLogin: () => void;
    waitResponse: (awaitRes: boolean) => void;
}

const SignupForm: React.FC<SignupFormProp> = ({ signupLogin, waitResponse }) => {
    const [userData, setUserData] = useState<Client>({
        CorreoElectronico: '', Nombre: '', Phone: '', Password: '', Rol: ''
    });
    const regex = /^[0-9]+$/;
    const [issignup, setIssignup] = useState(false);

    // editar campos
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'Number' && value.length > 0 && !regex.test(value)) {
            return;
        };

        setUserData(prev => ({ ...prev, [name]: value }));
    }, [setUserData]);

    // function sendData() {
    //     if (!validateForm(userData)) {
    //         console.log('Los datos deben ser corectos.')
    //         return;
    //     }

    //     waitResponse(true);
    //     SignupUser(userData);
    //     console.log('Enviando data.');
    // }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        waitResponse(true);

        try {
            if (!validateForm(userData)) {
                console.log('Los datos deben ser corectos.')
                return;
            }

            const creado = await SignupUser(userData); // Llama a la función de Axios
            console.log('Usuario:', creado);
            setIssignup(true);

        } catch (error: any) {
            console.error("Error al Crear el usuario", error.response?.data || error.message);
        }
        waitResponse(false);
    };

    const goLogin = () => {
        signupLogin();
        setIssignup(false);
    }

    return (
        <div className={` w-64 h-auto bg-[#ffffff] p-4 rounded-md shadow-xl relative transition-all`}>
            {!issignup ? <form id="signupForm" onSubmit={handleLogin}>
                <h2 className="mb-2">Signup</h2>
                <div className="w-full text-[12px] font-normal ">
                    <input type="email" name="CorreoElectronico" value={userData.CorreoElectronico}
                        placeholder="* E-mail"
                        className="w-full h-6 p-3 py-4 bg-slate-100 mb-2 rounded-md focus:outline-none"
                        onChange={handleInputChange} />

                    <input type="text" name="Nombre" value={userData.Nombre}
                        placeholder="* Name"
                        className="w-full h-6 p-3 py-4 bg-slate-100 mb-2 rounded-md focus:outline-none "
                        onChange={handleInputChange} />

                    <input type="text" name="Phone" value={userData.Phone}
                        placeholder="Phone" pattern="[0-9]*"
                        className="w-full h-6 p-3 py-4 bg-slate-100 mb-2 rounded-md focus:outline-none "
                        onChange={handleInputChange} />

                    <input type="password" name="Password" value={userData.Password}
                        placeholder="* Password"
                        className="w-full h-6 p-3 py-4 bg-slate-100 mb-4 rounded-md focus:outline-none " id="signupPassword"
                        onChange={handleInputChange} />
                </div>
                <button className="p-2 bg-purple-600 hover:bg-purple-500 transition-all text-white text-xs rounded-lg w-full"
                    type="submit" form="signupForm">
                    Submit
                </button>
                <h3 className="text-[10px] opacity-50 cursor-pointer mt-1 mx-2" onClick={signupLogin}>Login acount</h3>
            </form>:
            <div className="w-full flex flex-col justify-center items-center text-[12px] font-normal ">
                <CircleCheckBig size={50} className="text-green-500 m-2" />
                <h2 className="mb-2">User create successfully</h2>
                <button className="p-2 bg-purple-600 hover:bg-purple-500 transition-all text-white text-xs rounded-lg w-full"
                    type="button" onClick={goLogin}>
                    Login
                </button>
            </div>}
        </div>
    );
}

export default SignupForm;