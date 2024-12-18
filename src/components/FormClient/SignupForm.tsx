import React, { useCallback, useState } from "react";
import { validateForm } from '../../utility/Validation';
import { Client } from '../../Models/Client';
import { SignupUser } from '../../services/apiClient';

interface SignupFormProp {
    signupLogin: () => void;
}

const SignupForm: React.FC<SignupFormProp> = ({ signupLogin }) => {
    const [userData, setUserData] = useState<Client>({
        CorreoElectronico: '', Nombre: '', Phone: '', Password: '', Rol: ''
    });
    const regex = /^[0-9]+$/;

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === 'Number' && value.length > 0 && !regex.test(value)){
            return;
        };
        
        setUserData(prev => ({ ...prev, [name]: value }));
    }, [setUserData]);

    function sendData() {
        if (!validateForm(userData)) {
            console.log('Los datos deben ser corectos.')
            return;
        }

        SignupUser(userData);
        console.log('Enviando data.');
    }

    return (
        <div className={` w-64 h-auto bg-[#ffffff] p-4 rounded-md shadow-xl relative`}>
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
                    className="w-full h-6 p-3 py-4 bg-slate-100 mb-4 rounded-md focus:outline-none " id=""
                    onChange={handleInputChange} />
            </div>
            <button className="p-2 bg-purple-600 hover:bg-purple-500 transition-all text-white text-xs rounded-lg w-full" onClick={() => sendData()}>Submit</button>
            <h3 className="text-[8px] opacity-50 cursor-pointer mt-1 mx-2" onClick={signupLogin}>Login acount</h3>
        </div>
    );
}

export default SignupForm;