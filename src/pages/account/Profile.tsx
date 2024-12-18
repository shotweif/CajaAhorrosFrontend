import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";

const Profile: React.FC = () => {
    const [profileData, setProfileData] = useState<any>(null);

    //    useEffect(() => {
    //        // Obtener los datos del perfil desde el backend
    //        const fetchProfile = async () => {
    //            const token = localStorage.getItem("token");
    //            const response = await fetch("http://localhost:5000/api/Clientes/Perfil", {
    //                headers: { Authorization: `Bearer ${token}` },
    //            });
    //            const data = await GetAcount();
    //            setProfileData(data);
    //        };

    //        fetchProfile();
    //    }, []);

    const handleUpdate = () => {
        // Lógica para guardar los cambios
        console.log("Datos actualizados");
    };

    return (
        <div>
            {/* Header */}
            <NavBar />
            
            <h1>Perfil</h1>
            {profileData ? (
                <div>
                    <p>Nombre: {profileData.nombre}</p>
                    <p>Correo: {profileData.correoElectronico}</p>
                    <button onClick={handleUpdate}>Guardar Cambios</button>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Profile;
