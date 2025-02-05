import React, { useState, useEffect } from "react";
import { getUserProfile, getAccountsUser, updateUserProfile } from "../../services/apiClient";
import NavBar from "../NavBar";
import AccountOverview from "../../components/Account/AccountOverview";
import { BadgeDollarSign, ChevronRight, FileText, LockKeyhole, Settings, Wallet } from "lucide-react";
import Loading from "../../components/load/Loading";
import Transfer from "../../components/Account/Transfer";
import { useAuth } from "../../contexts/AuthContext";

const Profile: React.FC = () => {
    const { logout } = useAuth();

    const [isWating, setIsWating] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [cuentas, setGetCuentas] = useState<any[]>([]);

    const [editing, setEditing] = useState(false);
    const [optionSelect, setOptionSelect] = useState<number>(1);
    const profileImage = "https://images.unsplash.com/photo-1736288002606-9db16875f180?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D";

    useEffect(() => {
        // Obtener los datos del perfil desde el backend
        const fetchProfile = async () => {
            try {
                const email = sessionStorage.user

                const cliente = await getUserProfile(email);
                setProfileData(cliente);

                const accounts = await getAccountsUser(cliente.idCliente);
                setGetCuentas(accounts.cuentas);
                console.log(cliente)

            } catch (error: any) {
                console.error("Error al cargar el perfil:", error.response?.data || error.message);
                logout();
            }
        };

        fetchProfile();
    }, []);

    const handleOptionClick = (option: number) => {
        setOptionSelect(option);
    }

    const loadState = (value: boolean) => {
        setIsWating(value)
    }

    const handleSave = async () => {
        try {
            if (profileData) {
                await updateUserProfile(profileData); // Llama a la función de Axios
                setEditing(false);
            }
        } catch (error: any) {
            console.error("Error al actualizar el perfil:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="grid grid-cols-1 lg:flex p-4 gap-4 relative">
                {profileData ?
                    <>
                        <div className=" w-full -translate-x-full lg:-translate-x-0 lg:w-auto lg:h-auto absolute lg:relative z-50">
                            {/* Contenedor del menu */}
                            <div className="w-auto md:w-[400px] xl:w-[500px] min-h-10 bg-white rounded-md shadow flex flex-col items-center p-2">
                                {/* Account data */}
                                <img src={profileImage} alt="" className="w-24 h-24 md:w-36 md:h-36 xl:w-52 xl:h-52 bg-gray-300 rounded-full object-cover" />
                                <div className="w-full my-3 text-center">
                                    <h2 className="text-xl font-medium">{profileData.nombre}</h2>
                                    <p className="text-sm font-extralight">
                                        Last login: {profileData?.ultimaFechaLogin ? profileData.ultimaFechaLogin.split("T")[0] : "Fecha no disponible"}
                                    </p>
                                </div>

                                {/* Menu de opciones */}
                                <div className="w-full space-y-1 text-gray-500">
                                    <div className="w-full h-10 border-l-2 hover:bg-purple-100 transition-all rounded flex items-center relative cursor-pointer"
                                        onClick={() => handleOptionClick(1)}>
                                        <Wallet className="h-4 ml-3" />
                                        <p className="mx-1"> Accounts</p>
                                        <ChevronRight className="absolute right-4 text-gray-500" />
                                    </div>
                                    <div className="w-full h-10 border-l-2 hover:bg-purple-100 transition-all rounded flex items-center relative cursor-pointer"
                                        onClick={() => handleOptionClick(2)}>
                                        <BadgeDollarSign className="h-4 ml-3" />
                                        <p className="mx-1">Transfers</p>
                                        <ChevronRight className="absolute right-4 text-gray-500" />
                                    </div>
                                    <div className="w-full h-10 border-l-2 hover:bg-purple-100 transition-all rounded flex items-center relative cursor-pointer"
                                        onClick={() => handleOptionClick(3)}>
                                        <FileText className="h-4 ml-3" />
                                        <p className="mx-1">Movements</p>
                                        <ChevronRight className="absolute right-4 text-gray-500" />
                                    </div>
                                    <div className="w-full h-10 border-l-2 hover:bg-purple-100 transition-all rounded flex items-center relative cursor-pointer"
                                        onClick={() => handleOptionClick(4)}>
                                        <Settings className="h-4 ml-3" />
                                        <p className="mx-1">Settings</p>
                                        <ChevronRight className="absolute right-4 text-gray-500" />
                                    </div>
                                    {profileData && profileData.rol !== 'Admin' ? null :
                                        <div className="w-full h-10 border-l-2 border-purple-500 bg-purple-950 hover:bg-purple-800 transition-all rounded flex items-center relative cursor-pointer text-white"
                                            onClick={() => handleOptionClick(5)}>
                                            <LockKeyhole className="h-4 ml-3" />
                                            <p className="mx-1">Admin</p>
                                            <ChevronRight className="absolute right-4" />
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 w-full h-auto relative">
                            {optionSelect === 5 ?
                                <>Data Max</> :
                                optionSelect === 4 ?
                                    <>condig</> :
                                    optionSelect === 3 ?
                                        <>historial</> :
                                        optionSelect === 2 ?
                                            <Transfer cuentas={cuentas} /> :
                                            <AccountOverview accountData={cuentas} clienteId={profileData.idCliente} loadState={loadState} />
                            }
                        </div>
                    </>
                    : null}


                {/* {profileData ? (
                <div    >
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={profileData.nombre}
                            onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })}
                            disabled={!editing}
                        />
                    </label>
                    <label>
                        Correo:
                        <input
                            type="email"
                            value={profileData.correoElectronico}
                            disabled
                        />
                    </label>
                    <button onClick={() => setEditing(true)}>Editar</button>
                    {editing && <button onClick={handleSave}>Guardar</button>}
                </div>
            ) : (
                <p>Cargando...</p>
            )} */}
            </div>
            {isWating &&
                <Loading loadPage={true} />
            }
        </>
    );
};


export default Profile;
