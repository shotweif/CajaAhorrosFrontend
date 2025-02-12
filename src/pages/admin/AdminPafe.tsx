import { CircleCheckBig, CircleOff, Edit2, Eye, Loader, Loader2, Trash2, UserPlus2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getUsersProfilesConsultation, deleteObjectData, putNewStatus } from '../../services/apiClient';
import ActionPopUp from './ActionPopUp';
import DataPopUp from './DataPopUp';
import NewUser from './NewUser';
import EditPopUp from './EditPopUp';


const AdminPage: React.FC = () => {
    const [isShowUsers, setIsShowUsers] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([]);
    const [account, setAccount] = useState<any[]>([]);
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
    const [isOpenDataPopup, setIsOpenDataPopup] = useState<boolean>(false)
    isOpenDataPopup

    const fetchProfile = async () => {
        try {
            const usersList = await getUsersProfilesConsultation('users');
            setUsers(usersList);

            const accountList = await getUsersProfilesConsultation('accounts');
            setAccount(accountList);

        } catch (error: any) {
            console.error("Error al cargar el perfil:", error.response?.data || error.message);
        }
    };

    useEffect(() => {

        fetchProfile();
    }, []);

    // Acciones de eliminacion de objectos (clientes, cuentas)
    const [isIdObject, setIdObject] = useState<number>(0);
    const [isTable, setIsTable] = useState<string>('');

    const DeleteOpenPopup = (action: boolean, idObject: number, tabla: string) => {
        setIdObject(idObject);
        setIsTable(tabla);
        setIsOpenPopup(action);
    }

    const CloseActionPopup = () => {
        setIdObject(0);
        setIsTable('');
        setIsOpenPopup(false);
    }

    const DeleteAction = async () => {
        // console.log('Se eliminaran: ', isTable, 'con id: ', isIdObject)
        const responseAction = await deleteObjectData(isIdObject, isTable);
        !responseAction.success ? null : fetchProfile();
        CloseDataPopup();
    }


    // Acciones de visualizacion de la data (clientes, cuentas)
    const [isDataObject, setDataObject] = useState<any[]>([]);

    const DataOpenPopup = (action: boolean, data: any[]) => {
        setDataObject(data);
        setIsOpenDataPopup(action);
    }
    const CloseDataPopup = () => {
        setDataObject([]);
        setIsOpenDataPopup(false);
    }

    // Cabiar el estado de la cuenta
    const [isAwaitStatus, setIsAwaitStatus] = useState<boolean>(false);
    const [activeStatusAccount, setActiveStatusAccount] = useState<number>(0);

    const ChangeStatusAccount = async (idAccount: number) => {
        setActiveStatusAccount(idAccount);
        setIsAwaitStatus(true);

        setTimeout(async () => {
            const response = await putNewStatus(idAccount);
            response.success ? account.forEach(c => c.idCuenta == idAccount ? (c.activo ? c.activo = false : c.activo = true) : null) : null;
            setActiveStatusAccount(0);
            setIsAwaitStatus(false);
        }, 1000);
    }

    // Agregar usuario nuevo
    const [isAddNewUser, setIsAddNewUser] = useState<boolean>(false);

    // const AddNewPopup = () => {
    //     setIsAddNewUser(false);
    // }

    // Editar el objeto (clientes o cuentas)
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

    const OpenEditPopup = (action: boolean, data: any[]) => {
        setDataObject(data);
        setIsOpenEdit(action);
    }

    const CloseEditPopup = () => {
        setIsOpenEdit(false);
    }


    return (
        <div className='w-full h-full flex flex-col'>

            {/* Page ACTION BAR */}
            <div className='font-semibold w-full text-lg mb-2 flex flex-col sm:flex-row justify-between items-center overflow-hidden top-0 left-0'>
                <h1>Account History</h1>

                <div className='flex items-center gap-3'>
                    <button className={`bg-white border p-2 rounded-md`} onClick={() => setIsAddNewUser(true)}>
                        <UserPlus2 />
                    </button>

                    <div className='rounded-md flex items-center text-sm border'>
                        <button className={`${isShowUsers ? 'bg-purple-900 text-white' : 'bg-white text-black'} p-2  rounded-l-md`} onClick={() => setIsShowUsers(true)}>Usuarios</button>
                        <button className={`${!isShowUsers ? 'bg-purple-900 text-white' : 'bg-white text-black'} p-2  rounded-r-md`} onClick={() => setIsShowUsers(false)}>Cuentas</button>
                    </div>
                </div>
            </div>


            {/* USUARIOS */}
            {isShowUsers &&
                <div className='w-full bg-white rounded-md p-4 shadow overflow-x-scroll'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='border-b bg-gray-300'>
                                <th className='p-2 text-left'>ID</th>
                                <th className='p-2 text-left'>Nombre</th>
                                <th className='p-2 text-left'>Correo Electrónico</th>
                                <th className='p-2 text-left'>Cnt Cunetas</th>
                                <th className='p-2 text-left flex justify-end mr-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.idCliente} className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2'>{user.idCliente}</td>
                                    <td className='p-2 uppercase'>{user.apellido} {user.nombre}</td>
                                    <td className='p-2'>{user.correoElectronico}</td>
                                    <td className='p-2'>{user.numCuentas}</td>

                                    <td className='p-2 flex gap-2 justify-end items-center'>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => DataOpenPopup(true, user)}>
                                            <Eye className='w-full h-full' />
                                        </button>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => OpenEditPopup(true, user)}>
                                            <Edit2 className='w-full h-full' />
                                        </button>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => DeleteOpenPopup(true, user.idCliente, 'Clientes')}>
                                            <Trash2 className='w-full h-full' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {/* CUENTAS */}
            {!isShowUsers &&
                <div className='w-full bg-white rounded-md p-4 shadow'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='border-b bg-gray-300'>
                                <th className='p-2 text-left'>ID</th>
                                <th className='p-2 text-left'>Nro Cuenta</th>
                                <th className='p-2 text-left'>Cliente</th>
                                <th className='p-2 text-left'>Saldo</th>
                                <th className='p-2 text-left flex justify-end mr-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {account.map(cuenta => (
                                <tr key={cuenta.idCuenta} className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2'>{cuenta.idCuenta}</td>
                                    <td className='p-2'>{cuenta.numeroCuenta}</td>
                                    <td className='p-2 uppercase'>{cuenta.cliente.apellido} {cuenta.cliente.nombre}</td>
                                    <td className='p-2'>${cuenta.saldo}</td>
                                    <td className='p-2 flex gap-2 justify-end'>
                                        <button className=' rounded-full w-6 h-6 p-1 mr-4'
                                        disabled={isAwaitStatus}
                                            onClick={() => ChangeStatusAccount(cuenta.idCuenta)}>
                                            {!isAwaitStatus ?
                                                !cuenta.activo ? <CircleOff className='w-full h-full text-red-700' /> : <CircleCheckBig className='w-full h-full text-green-600' /> :
                                                cuenta.idCuenta == activeStatusAccount ? <Loader2 className='animate-spin text-purple-500' /> :
                                                    !cuenta.activo ? <CircleOff className='w-full h-full text-red-700' /> : <CircleCheckBig className='w-full h-full text-green-600' />}
                                        </button>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => DataOpenPopup(true, cuenta)}>
                                            <Eye className='w-full h-full' />
                                        </button>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => OpenEditPopup(true, cuenta)}>
                                            <Edit2 className='w-full h-full' />
                                        </button>
                                        <button className='bg-white rounded-full w-6 h-6 p-1'
                                            onClick={() => DeleteOpenPopup(true, cuenta.idCuenta, 'CuentaAhorro')}>
                                            <Trash2 className='w-full h-full' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {isOpenPopup &&
                <ActionPopUp CloseActionPopup={CloseActionPopup} DeleteAction={DeleteAction} />}
            {isOpenDataPopup &&
                <DataPopUp CloseDataPopup={CloseDataPopup} dataObject={isDataObject} />}
            {isAddNewUser &&
                <NewUser setIsAddNewUser={setIsAddNewUser} />}
            {isOpenEdit && 
                <EditPopUp CloseDataPopup={CloseEditPopup} dataObject={isDataObject} />}
        </div>
    );
};

export default AdminPage;
