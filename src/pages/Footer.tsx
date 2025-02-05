import React from "react"
import logoUPS from '../assets/logo/UPS.png';

interface socialMedia {
    github: string,
    linkedin: string,
    email: string,
}

const NavBar: React.FC = () => {
    return (
        <div className="w-full h-12 bg-[#222222] relative bottom-0">
            <div className="w-full h-full grid grid-cols-2">
                <div className="w-full h-full flex justify-center items-center col-span-1 text-white">
                    <img src={logoUPS} className="h-8 mr-1" alt="" />
                    <h2>Universidad Politecnica Salesiana</h2>
                </div>
                <div className="w-full h-full flex justify-center items-center col-span-1">
                    <img src="" alt="" className="w-8 h-8 bg-white rounded-full" />
                </div>
            </div>
            <div className="w-full h-auto flex justify-center bg-black text-white text-[10px]">
                <h2 className="py-1">Desarrollado por Kenneth Duarte & Liseth Pushug</h2>
            </div>
        </div>
    );
}

export default NavBar;