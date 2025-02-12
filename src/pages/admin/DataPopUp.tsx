import { CircleCheckBig, CircleOff } from "lucide-react";
import React from "react";

interface ActionPopUpProps {
    dataObject: any;
    CloseDataPopup: () => void;

}

const DataPopUp: React.FC<ActionPopUpProps> = ({ dataObject, CloseDataPopup }) => {
    console.log(dataObject)
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
                                        <td className='p-2'>${dataObject.saldo}</td>
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
                        <button className='p-2 px-3 bg-purple-800 text-white rounded-md'
                            disabled={true}>edit</button>
                        <button className='p-2 px-3 bg-gray-800 text-white rounded-md'
                            onClick={() => CloseDataPopup()}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DataPopUp;