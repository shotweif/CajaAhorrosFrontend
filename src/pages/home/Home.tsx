import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import NavBar from "../NavBar";

const Home: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className="w-full text-center">
            {/* Header */}
            <NavBar />
            
            <h1>Bienvenido a Caja de Ahorros</h1>
            <img src="/ruta/a/tu/imagen.jpg" alt="Imagen de bienvenida" />
            <nav className="mt-5 ">
                <ul className="space-y-3">
                    <li><button className="p-2 bg-slate-200"><a href="/profile">Perfil</a></button></li>
                    <li><button className="p-2 bg-slate-200" onClick={logout}>Cerrar Sesión</button></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;