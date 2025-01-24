import React from "react"
import logo from '../assets/logo/petra-12.svg';
import { Bell, Settings, User2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutUser from '../components/buttons/LogoutUser';

const NavBar: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const Paths = [
        { path: '/', name: 'Inicio' },
        { path: '/', name: 'Informacion' },
        { path: '/', name: 'Sobre nosotros' }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const locate = (path: string) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    }

    return (
        <div className="w-full h-16 grid grid-cols-2 px-2 bg-[#4e2b5c] text-white text-lg">
            <div className="col-span-1 w-full flex items-center justify-start gap-3">
                {/* Logo */}
                <div className="flex items-center mr-2">
                    <img src={logo} alt="" className="aspect-video w-auto h-10 p-1 " />
                    <h1 className="font-bold text-lg">BankNet</h1>
                </div>
                {/* Navegacion */}
                <div className="col-span-9 flex items-center gap-2 text-sm xl:text-base transition-all -translate-y-full md:-translate-y-0">
                    {Paths.map((obj, index) => (
                        <h2 className={`opacity-80 hover:opacity-100 transition-all font-light cursor-pointer px-2 py-1`}
                            key={index}
                            onClick={() => locate(obj.path)}>
                            {obj.name}
                        </h2>
                    ))}
                </div>
            </div>
            {/* Barra de acciones de usuario */}
            <div className="col-span-1 w-full flex items-center justify-end gap-3">
                {!isAuthenticated ?
                    null :
                    <>
                        <button className=" w-10 h-10 ">
                            <Bell className="w-5" />
                        </button>
                        <button className="w-10 h-10">
                            <Settings className="w-5" />
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-[#ffffff70] flex items-center justify-center" onClick={() => navigate(`/profile/${sessionStorage.getItem}`)}>
                            <User2 className="w-5" />
                        </button>
                    </>
                }
                <div className="w-auto min-w-10 h-10 rounded-lg text-base bg-[#ffffff30] hover:bg-[#ffffff50] transition-all flex items-center justify-center">
                    {!isAuthenticated ?
                        <a href="/login" className="px-3">Login / Signup</a> :
                        <LogoutUser />

                    }
                </div>
            </div>
        </div>
    );
}

export default NavBar;