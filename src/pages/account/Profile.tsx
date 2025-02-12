import React, { useState, useEffect } from "react";
import { getUserProfile, getAccountsUser } from "../../services/apiClient";
import NavBar from "../NavBar";
import AccountOverview from "../../components/Account/AccountOverview";
import { BadgeDollarSign, ChevronRight, ChevronRightCircle, FileText, LockKeyhole, Wallet } from "lucide-react";
import Loading from "../../components/load/Loading";
import Transfer from "../../components/Account/Transfer";
import { useAuth } from "../../contexts/AuthContext";
import { CuentaCliente } from '../../Models/Acount';
// import { Client } from '../../Models/Client';
import HistorialTransact from "../../components/History/HistorialTransact";
import AdminPage from "../admin/AdminPafe";
// kenneth@banknet.com

import imgST from '../../assets/image/jinx.jpg';
import imgLS from '../../assets/image/112116494_p0.jpg';
import img3 from '../../assets/image/bomb.jpg';
import img2 from '../../assets/image/pato.jpg';
import img1 from '../../assets/image/santuario.jpg';



const Profile: React.FC = () => {
    const { logout } = useAuth();

    const [isWating, setIsWating] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [cuentas, setGetCuentas] = useState<CuentaCliente[]>([]);

    // const [editing, setEditing] = useState(false);
    const [optionSelect, setOptionSelect] = useState<number>(5);

    const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
    // const profileImage = "";



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
                if (!error.response?.data) {
                    console.error("Error al cargar el perfil:", error.response?.data || error.message);
                    logout();
                }

                error.response.data.cuentas ? setGetCuentas(error.response.data.cuentas) : null;
                console.log(error.response?.data);

            }
        };

        fetchProfile();
    }, []);

    const handleOptionClick = (option: number) => {
        setOpenSubMenu(false);
        setOptionSelect(option);
    }

    function profileImage(imgName: string) {
        switch (imgName) {
            case 'st':
                return imgST

            case 'ls':
                return imgLS

            case 'bomb':
                return img3

            case 'pato':
                return img2

            default:
                return img1;
        }
    }

    // const handleSave = async () => {
    //     try {
    //         if (profileData) {
    //             await updateUserProfile(profileData); // Llama a la función de Axios
    //             setEditing(false);
    //         }
    //     } catch (error: any) {
    //         console.error("Error al actualizar el perfil:", error.response?.data || error.message);
    //     }
    // };

    return (
        <>
            <NavBar />
            {/* <div className="grid grid-cols-1 lg:flex p-4 gap-4 relative"> */}
            <div className="w-full h-auto bg-white flex p-2 justify-between items-center md:absolute left-0 md:-translate-y-[110%] translate-y-0 z-10 md:-z-10 sticky top-0">
                <button className="w-8 h-8 text-purple-500" onClick={() => openSubMenu ? setOpenSubMenu(false) : setOpenSubMenu(true)}>
                    <ChevronRightCircle className={`${openSubMenu ? 'rotate-180' : 'rotate-0'} w-full h-full transition-all`} />
                </button>
            </div>
            <div className="grid grid-cols-1 md:gap-y-4 lg:gap-4 p-4 col-span-1 lg:grid-cols-6 relative">

                {profileData ?
                    <>
                        {/* <div className=" w-full -translate-x-full lg:-translate-x-0 lg:w-auto lg:h-auto absolute lg:relative z-50"> */}
                        <div className={`${openSubMenu ? 'translate-x-0' : '-translate-x-[110%]'} p-4 md:p-0 w-full h-screen bg-[#333333de] md:bg-inherit md:col-span-2 z-50 fixed top-0 left-0 md:translate-x-0 md:relative md:h-auto transition-all`}>
                            {/* Contenedor del menu */}

                            {/* <div className="w-auto md:w-[400px] xl:w-[500px] min-h-10 bg-white rounded-md shadow flex flex-col items-center p-2"> */}
                            <div className="w-auto bg-white rounded-md shadow flex flex-col items-center p-2 md:col-span-1 relative">
                                <button className="w-8 h-8 text-purple-500" onClick={() => openSubMenu ? setOpenSubMenu(false) : setOpenSubMenu(true)}>
                                    <ChevronRightCircle className={`${openSubMenu ? 'rotate-180' : 'rotate-0'} w-8 h-8 transition-all absolute top-2 left-2 md:overflow-hidden md:h-0 md:w-0`} />
                                </button>

                                {/* Account data */}
                                <img src={profileImage(profileData.imageName)} alt="" className="w-24 h-24 border-2 md:w-36 md:h-36 xl:w-52 xl:h-52 bg-gray-300 rounded-full object-cover" />
                                <div className="w-full my-3 text-center">
                                    <div className="text-xl font-medium flex items-center justify-center gap-2 uppercase">
                                        <h2 className="">{profileData.nombre}</h2>
                                        <h2 className="">{profileData.apellido}</h2>

                                    </div>
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
                                    {/* <div className="w-full h-10 border-l-2 hover:bg-purple-100 transition-all rounded flex items-center relative cursor-pointer"
                                        onClick={() => handleOptionClick(4)}>
                                        <Settings className="h-4 ml-3" />
                                        <p className="mx-1">Settings</p>
                                        <ChevronRight className="absolute right-4 text-gray-500" />
                                    </div> */}
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

                        <div className="grid grid-cols-1 gap-6 w-full h-auto relative col-span-1 lg:col-span-4">
                            {(optionSelect === 5 && profileData.rol === 'Admin') ?
                                <AdminPage /> :
                                optionSelect === 4 ?
                                    <>condig</> :
                                    optionSelect === 3 ?
                                        <HistorialTransact idUser={profileData.idCliente} /> :
                                        optionSelect === 2 ?
                                            <Transfer idCliente={profileData.idCliente} nombreUsuario={profileData.nombre + ' ' + profileData.apellido} handleOptionClick={handleOptionClick} /> :
                                            <AccountOverview accountData={cuentas} clienteId={profileData.idCliente} loadState={setIsWating} />
                            }
                        </div>
                    </>
                    : null}
            </div>
            {isWating &&
                <Loading loadPage={true} />
            }
        </>
    );
};


export default Profile;
