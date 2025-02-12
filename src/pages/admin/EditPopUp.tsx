import React, { useCallback, useEffect, useState } from "react";
import { CuentaCliente } from '../../Models/Acount';
import { Client } from '../../Models/Client';
import { BadgeDollarSignIcon, CircleCheckBig, CircleOff, LucideUserRoundPen } from "lucide-react";
import { putChangeUserPassword } from "../../services/apiClient";

interface EditPopUpProps {
    dataObject: any;
    CloseDataPopup: () => void;
}

const EditPopUp: React.FC<EditPopUpProps> = ({ dataObject, CloseDataPopup }) => {
    const [changeBalance, setChangeBalance] = useState<number>();
    const [changePassword, setChangePassword] = useState<string>('');


    // editar campos
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        name === 'balance' ? 
        setChangeBalance(parseInt(value)) :
        setChangePassword(value)

    }, [setChangeBalance, setChangePassword]);


    const putChangePassword = async (idUser: number, pass: string) => {
        if(pass.length < 3) {
            return;
        }
        
        try {
            const response = await putChangeUserPassword(idUser, pass);
            console.log(response);
            CloseDataPopup();

        } catch (error) {
            console.log(error);
        }
    }

    const putChangeBalance = async (idUser: number, balance: number) => {
        if(balance) {
            return;
        }
        try {
            const response = await putChangeBalance(idUser, balance);
            console.log(response);
            CloseDataPopup();

        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(() => {
    //     console.log(dataObject)
    //     // dataObject.idCliente ?
    //     // setUserData(dataObject) :
    //     setUserData(dataObject)

    //     console.log()
    // }, []);

    return (
        <>
            <div className='w-full h-screen bg-[#000000cb] fixed top-0 left-0 z-50 flex items-center justify-center p-4'>
                <div className='p-2 rounded-md flex flex-col relative bg-white w-[280px] md:w-[480px] gap-2'>
                    <h1 className='text-lg font-semibold text-center'>Cliente Data</h1>
                    {dataObject.idCliente ?
                        <table className='w-full text-sm'>
                            <thead>
                                <tr className='border-b bg-gray-300'>
                                    <th className='p-2 text-left'>Data</th>
                                    <th className='p-2 text-left'></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>ID</td>
                                    <td className='p-2'>{dataObject.idCliente}</td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Name</td>
                                    <td className='p-2 uppercase'>{dataObject.apellido} {dataObject.nombre}</td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Email</td>
                                    <td className='p-2'>{dataObject.correoElectronico} </td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Password</td>
                                    <td className='flex items-center gap-2 px-2'>
                                        <input type="password" className="p-2 rounded-md w-full h-full"
                                            name="passwordC"
                                            value={changePassword}
                                            placeholder="Change password" 
                                            onChange={handleInputChange}/>
                                        <button className="min-w-7 w-7 min-h-7 h-7 p-1 bg-purple-400 text-white rounded-md" type="button"
                                        onChange={() => putChangePassword(dataObject.idCliente, changePassword)}>
                                            <LucideUserRoundPen className="w-full h-full" />
                                        </button>
                                    </td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Phone</td>
                                    <td className='p-2'>{dataObject.phone}</td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Rol</td>
                                    <td className='p-2'>{dataObject.rol}</td>
                                </tr>
                                <tr className='border-b hover:bg-violet-200 cursor-default'>
                                    <td className='p-2 font-semibold'>Accounts</td>
                                    <td className='p-2'>{dataObject.numCuentas}</td>
                                </tr>
                            </tbody>
                        </table> :
                        dataObject.idCuenta ?
                            <table className='w-full text-sm'>
                                <thead>
                                    <tr className='border-b bg-gray-300'>
                                        <th className='p-2 text-left'>Data</th>
                                        <th className='p-2 text-left'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b hover:bg-violet-200 cursor-default'>
                                        <td className='p-2 font-semibold'>ID</td>
                                        <td className='p-2'>{dataObject.idCuenta}</td>
                                    </tr>
                                    <tr className='border-b hover:bg-violet-200 cursor-default'>
                                        <td className='p-2 font-semibold'>Account number</td>
                                        <td className='p-2'>{dataObject.numeroCuenta}</td>
                                    </tr>
                                    <tr className='border-b hover:bg-violet-200 cursor-default'>
                                        <td className='p-2 font-semibold'>Propietary</td>
                                        <td className='p-2 uppercase'>{dataObject.cliente.correoElectronico} </td>
                                    </tr>
                                    <tr className='border-b hover:bg-violet-200 cursor-default'>
                                        <td className='p-2 font-semibold'>Balance</td>
                                        <td className="flex gap-2 items-center px-2">
                                            <h1 className="mr-2">${dataObject.saldo}</h1>
                                                <input type="number" className="w-full bg-gray-100 h-full p-2 relative rounded-md"
                                                    name="balance"
                                                    value={changeBalance}
                                                    placeholder="Change balance"
                                                    onChange={handleInputChange} />
                                                <button className="min-w-7 w-7 min-h-7 h-7 p-1 bg-purple-400 text-white rounded-md" type="button">
                                                    <BadgeDollarSignIcon className="w-full h-full" />
                                                </button>
                                        </td>

                                        {/* <td className='p-2'>${dataObject.saldo}</td> */}
                                    </tr>
                                    <tr className='border-b hover:bg-violet-200 cursor-default'>
                                        <td className='p-2 font-semibold'>Staus</td>
                                        <td className='p-2'>
                                            <div className="rounded-full w-6 h-6 p-1 mr-4">
                                                {!dataObject.activo ? <CircleOff className='w-full h-full text-red-700' /> : <CircleCheckBig className='w-full h-full text-green-600' />}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> :
                            <div className="py-10">Sorry, something happen :(</div>}

                    <div className='w-full flex items-center justify-between mt-2'>
                        <button className='p-2 px-3 bg-purple-300 text-white rounded-md'
                            disabled={true}>edit</button>
                        <button className='p-2 px-3 bg-gray-800 text-white rounded-md'
                            onClick={() => CloseDataPopup()}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPopUp;