import React from "react";
import { logoutUser } from "../../services/apiClient";
import { useAuth } from "../../contexts/AuthContext";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logoutUser(); // Limpia el localStorage
        logout(); // Actualiza el estado global
    };

    return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default LogoutButton;
