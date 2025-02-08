import React, { useState } from "react"
import logo from '../assets/logo/petra-12.svg';
import { Bell, ChevronRight, HandHeart, Home, Info, Landmark, Menu, Settings, User2, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutUser from '../components/buttons/LogoutUser';

const NavBar: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const Paths = [
        { path: '/', name: 'Inicio' , icon: <Home className="w-full h-full" /> },
        { path: '/banknet', name: 'Informacion', icon: <Landmark className="w-full h-full" /> },
        { path: '/about-ours', name: 'Sobre nosotros', icon: <HandHeart className="w-full h-full" /> }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const locate = (path: string) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    }

    return (
        <div className="w-full h-16 flex justify-between px-2 bg-[#4e2b5c] text-white text-lg z-50">
            <div className="w-auto flex items-center justify-start gap-3">
                <button className="h-full w-10 translate-x-0 md:-translate-x-[110%] md:w-0 md:h-0" type="button" onClick={() => openMenu ? setOpenMenu(false) : setOpenMenu(true)}>
                    <Menu className="text-white h-full w-10" />
                </button>

                {/* Logo */}
                <div className="flex items-center mr-2">
                    <img src={logo} alt="" className="aspect-video sm:w-auto sm:h-10 p-1 overflow-hidden w-0 h-0" />
                    <h1 className="font-bold text-lg">BankNet</h1>
                </div>

                {/* Navegacion WEB */}
                <div className="flex items-center gap-2 text-sm xl:text-base transition-all -translate-y-[150%] md:translate-y-0 overflow-hidden w-0 h-0 md:w-auto md:h-auto">
                    {Paths.map((obj, index) => (
                        <div className={`text-purple-300 hover:text-white transition-all font-light cursor-pointer px-2 py-1 flex items-center gap-1`}
                            key={index}
                            onClick={() => locate(obj.path)}>
                            <h2 className="w-4 h-4">{obj.icon}</h2>
                            <h2>{obj.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* MENU DE MOVIL */}
            <div className={`${openMenu ? 'translate-x-0' : '-translate-x-[120%]'} transition-all fixed p-2 pt-3 top-0 left-0 w-full h-full bg-[#ffffffdc] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 flex flex-col`}>
                <div className="w-full flex items-center gap-3">
                    <button className="h-10 w-10" type="button" onClick={() => setOpenMenu(false)}>
                        <X className="text-purple-900 h-full w-10" />
                    </button>
                    <h1 className="font-bold text-lg text-black">BankNet</h1>
                </div>

                <div className="p-2 text-black text-xl ">
                    {Paths.map((obj, index) => (
                        <div className={`text-purple-800 hover:text-purple-500 transition-all font-semibold cursor-pointer px-2 py-4 w-full hover:bg-purple-100 rounded-md flex items-center gap-2 relative`}
                            key={index}
                            onClick={() => locate(obj.path)}>
                            <h2 className="w-6 h-6">{obj.icon}</h2>
                            <h2>{obj.name}</h2>
                            <ChevronRight className="w-5 h-5 absolute right-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Barra de acciones de usuario */}
            <div className="col-span-1 w-auto flex items-center justify-end gap-3">
                {!isAuthenticated ?
                    null :
                    <>
                        <button className=" w-10 h-10 ">
                            <Bell className="w-5" />
                        </button>
                        {/* <button className="w-10 h-10">
                            <Settings className="w-5" />
                        </button> */}
                        <button className="w-10 h-10 rounded-lg bg-[#ffffff70] flex items-center justify-center" onClick={() => locate(`/profile/${sessionStorage.getItem('user')}`)}>
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