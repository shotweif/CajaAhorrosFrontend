import React from "react";
// import { logoutUser } from "../../services/apiClient";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut } from "lucide-react";

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();

    return (<button className="w-full h-full flex items-center justify-center" onClick={logout}>
        <LogOut className="w-4" />
    </button>)
};

export default LogoutButton;
