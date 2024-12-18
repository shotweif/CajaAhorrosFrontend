import React from "react"
import logo from '../assets/logo/petra-12.svg';
import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const Paths = [
        { path: '/', name: 'Inicio' },
        { path: '/', name: 'Informacion' },
        { path: '/', name: 'Sobre nosotros' }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const locate = (path: string) => {
        if(location.pathname !== path){
            navigate(path);
        }
    }

    return (
        <div className="w-full h-12 grid grid-cols-12 px-2 bg-purple-900 text-white text-lg">
            <div className="col-span-1 w-full flex items-center justify-center">
                <img src={logo} alt="" className="h-10 p-1 " />
            </div>
            <div className="col-span-9 flex items-center justify-start gap-3 ">
                {Paths.map((obj, index) => (
                    <h2 className="font-light cursor-pointer px-2 py-1" key={index} onClick={() => locate(obj.path)}>
                        <h2>{obj.name}</h2>
                    </h2>
                ))}
            </div>
            <div className="col-span-2 w-full flex items-center justify-center">
                <div className="w-auto py-2 px-4 rounded-lg text-base bg-[#ffffff30] flex items-center justify-center ">
                    {!isAuthenticated ?
                        <a href="/login">Login / Signup</a> :
                        <button className="" onClick={logout}>
                            <LogOut className="w-5" />
                        </button>
                    }

                </div>
            </div>
        </div>
    );
}

export default NavBar;