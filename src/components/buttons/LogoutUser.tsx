import React from "react";
import { logoutUser } from "../../services/apiClient";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logoutUser(); // Limpia el localStorage
        logout(); // Actualiza el estado global
    };

    // return <button onClick={handleLogout}>Cerrar Sesión</button>;
    return (<button className="w-full h-full flex items-center justify-center" onClick={logout}>
        <LogOut className="w-4" />
    </button>)
};

export default LogoutButton;
