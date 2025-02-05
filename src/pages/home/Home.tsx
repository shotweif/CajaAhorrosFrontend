import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import NavBar from "../NavBar";
import photo from "../../assets/image/AHORROALAVISTA.png";

const Home: React.FC = () => {
    const { logout } = useAuth();
    
    return (
        <div className="w-full text-center flex flex-col items-center">
            {/* Header */}
            <NavBar />
            
            {/* Body */}
            <div className="w-full h-full p-4 flex flex-1 flex-col items-center justify-center">
                <h1>Bienvenido a Caja de Ahorros</h1>
                <img src={photo} alt="Imagen de bienvenida" className="aspect-video w-2/4 h-auto" />
                <nav className="mt-5 ">
                    <ul className="space-y-3">
                        <li><button className="p-2 bg-slate-200"><a href="/profile">Perfil</a></button></li>
                    </ul>
                </nav>
            </div>

        </div>
    );
}

export default Home;