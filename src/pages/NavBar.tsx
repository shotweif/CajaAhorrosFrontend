import React from "react"
import logo from '../assets/logo/petra-12.svg';

const NavBar: React.FC = () => {
    const Paths = [
        { path: '/', name: 'Inicio' },
        { path: '/', name: 'Informacion' },
        { path: '/', name: 'Sobre nosotros' }
    ]

    return (
        <div className="w-full h-12 grid grid-cols-12 px-2 bg-purple-900 text-white text-lg">
            <div className="col-span-1 w-full flex items-center justify-center">
                <img src={logo} alt="" className="h-10 p-1 " />
            </div>
            <div className="col-span-9 flex items-center justify-start gap-3 ">
                {Paths.map(obj => (
                    <h2 className="font-light cursor-pointer px-2 py-1">
                        <a href={obj.path}>{obj.name}</a>
                    </h2>
                ))}
            </div>
            <div className="col-span-2 w-full flex items-center justify-center">
                <div className="w-auto py-2 px-4 rounded-lg text-base bg-[#ffffff30]">
                    <a href="/login">Login / Signup</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;