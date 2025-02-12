import { Check, CheckCircle, ChevronLeftCircle, Loader2, X } from 'lucide-react';
import { validateAccount, startTransfer, getAccountsUser } from "../../services/apiClient";
import React, { useEffect, useState } from 'react';
import { CuentaCliente } from '../../Models/Acount';

interface TransferProps {
    idCliente: number;
    nombreUsuario: string;
    handleOptionClick: (option: number) => void;
}

const Transfer: React.FC<TransferProps> = ({ idCliente, nombreUsuario, handleOptionClick }) => {
    const [selectedAccount, setSelectedAccount] = useState<any>([]);
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [cuentas, setGetCuentas] = useState<CuentaCliente[]>([]);

    const [validateRes, setValidateRes] = useState<boolean>(false);
    const [toTransfier, setToTransfier] = useState<string>('');

    // Mensaje de error por validacion de numero de cuenta
    const [isNotAccount, setIsNotAccount] = useState<boolean>(true);
    const [isMessage, setMessage] = useState<string>('');

    const [loadValidate, setLoaderValidate] = useState<boolean>(false);
    const [valueTransfer, setValueTransfer] = useState<string>('');
    const [stateTransfer, setStateTransfer] = useState<boolean>(false);

    const [dateTransactio, setDateTransaction] = useState('');
    const [idComprobante, setIdComprobante] = useState('');

    const formatAccountNumber = (number: string) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1-');
    };

    const ActionMessge = (action: boolean, mesg: string) => {
        setMessage(mesg);
        setIsNotAccount(action);
        action ? null :
            setTimeout(() => {
                setIsNotAccount(true);
            }, 3000);
    };

    const changeAccount = (accountNum: string) => {
        setAccountNumber(accountNum);
        setValidateRes(false);
    };

    const validateNumber = async () => {
        if (accountNumber.length < 5) {
            ActionMessge(false, 'El numero de cuenta no es valido');;
            return;
        }

        setLoaderValidate(true);
        const changeFormate = accountNumber.split("-");
        try {

            const { success, message, dataRes } = await validateAccount(changeFormate.join(''));
            setValidateRes(success);
            setLoaderValidate(false);
            setToTransfier(dataRes)

            if (!success) {
                ActionMessge(false, message);
                return;
            }
        } catch (error) {
            console.error("Ocurrio un error inesperado al validar la cuenta: ", error);
        }

        ActionMessge(true, '');

    };

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const account = cuentas.find(cuenta => cuenta.numeroCuenta === value);

        setSelectedAccount(account);
    };

    const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Expresión regular para validar hasta 2 decimales y un rango máximo de 99999.99
        const regex = /^\d{1,5}(\.\d{0,2})?$/;

        // Validar el valor antes de actualizar el estado
        if (regex.test(value) || value === "") {
            setValueTransfer(value);
        }
    };

    const tranferSatrt = async () => {
        const changeFormate = accountNumber.split("-").join('');

        if (!(selectedAccount.saldo > 0) || selectedAccount.saldo < valueTransfer) {
            // console.log('no tienes saldo');
            ActionMessge(false, 'Tu saldo es insuficiente para realizar este movimiento.');
            return;
        }

        if (!validateRes || !valueTransfer || !(parseInt(valueTransfer) > 0)) {
            // console.log('No se puede comenzara la transaccion');
            ActionMessge(false, 'No se puede comenzara la transaccion');
            return;
        }

        const transferencia = {
            idCuentaOrigen: selectedAccount.numeroCuenta,
            idCuentaDestino: changeFormate,
            monto: parseInt(valueTransfer)
        }

        const { success, dataRes, newTransferenciaId } = await startTransfer(transferencia);
        setStateTransfer(success);
        setDateTransaction(dataRes);
        setIdComprobante(newTransferenciaId)
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const accounts = await getAccountsUser(idCliente);
                setGetCuentas(accounts.cuentas);
                // console.log(accounts);

                const activeAccounts = accounts.cuentas.filter((c: { activo: boolean; }) => c.activo);
                if (accounts.cuentas.length > 0) {
                    setSelectedAccount(activeAccounts[0]);
                }

            } catch (error: any) {
                if (!error.response?.data) {
                    console.error("Error al cargar el perfil:", error.response?.data || error.message);
                }

                error.response.data.cuentas ? setGetCuentas(error.response.data.cuentas) : null;
                console.log(error.response?.data);
            }
        };

        fetchProfile();
        // const activeAccounts = cuentas.filter(c => c.activo);
        // if (activeAccounts.length > 0) {
        //     setSelectedAccount(activeAccounts[0]);
        // }
    }, []);

    return (
        <div className='w-full p-4 bg-white rounded-md shadow flex flex-col gap-y-2 text-sm md:text-base'>
            <h1 className='p2 text-2xl font-bold mb-2 text-center py-2'>Make your transfer</h1>

            {/* Saldo */}
            <div className='w-full mb-5'>
                <h1 className='text-base sm:text-lg lg:text-xl font-semibold'>Available Balance</h1>
                <h2 className='text-3xl lg:text-6xl font-extralight text-gray-500'>
                    ${selectedAccount.saldo}
                </h2>
            </div>

            {/* Cuenta origen */}
            <div className='grid gap-2'>
                <h2 className='lg:text-xl font-semibold'>Origin Account:</h2>
                <select className='p-2 rounded-lg border bg-gray-50' onChange={handleAccountChange}>
                    {cuentas.map((cuenta, i) => (
                        cuenta.activo ?
                            <option key={i} value={cuenta.numeroCuenta}>
                                Nro {formatAccountNumber(cuenta.numeroCuenta)}
                            </option>
                            : null
                    ))}
                </select>
            </div>

            {/* Cuenta destino */}
            <div className='grid gap-2 w-full'>
                <label className='lg:text-xl font-semibold' htmlFor='destinyAccount'>Destination Account:</label>
                <div className='w-full flex'>
                    <input type="text"
                        className='p-2 rounded-md mr-2 w-full border bg-gray-50'
                        id='destinyAccount'
                        placeholder='Nro 0000-0000-0000-0000'
                        onChange={(e) => changeAccount(e.target.value)} />
                    <button className='p-2 px-4 bg-green-600 hover:bg-green-500 rounded-md text-white transition-all'
                        disabled={validateRes}
                        onClick={() => validateNumber()}>
                        {loadValidate ? <Loader2 className='animate-spin' /> :
                            !validateRes ? 'Validate' : <Check />}
                    </button>
                </div>
            </div>

            {/* valor a transferir */}
            <div className='w-full grid gap-2 mt-6'>
                <label className=' lg:text-xl font-semibold' htmlFor='montoSend'>
                    Value to be transferred:
                </label>
                <input type="number"
                    id='montoSend'
                    value={valueTransfer}
                    placeholder='00.0'
                    className='w-full p-2 rounded-md border bg-gray-50'
                    onChange={handleMontoChange}
                />
            </div>

            {!isNotAccount &&
                <div className='mt-2 w-full flex items-center justify-center relative rounded-lg bg-red-300 border border-red-600 text-black italic text-sm text-center p-2'>
                    <h2>{isMessage}</h2>
                    <button className='w-4 h-4 absolute right-4' onClick={() => ActionMessge(true, '')}> <X className='w-full h-full' /> </button>
                </div>}

            <button className='mt-8 w-full p-4 px-6 rounded-md text-lg font-semibold text-white bg-purple-800 hover:bg-purple-600 transition-all'
                // disabled={(selectedAccount.saldo < valueTransfer)}
                onClick={() => tranferSatrt()}>
                Transfer
            </button>

            {stateTransfer &&
                <div className='w-full min-h-full p-2 bg-white rounded-md absolute top-0 flex flex-col items-center justify-center shadow'>

                    <div className='w-full h-full flex flex-1 flex-col'>
                        <h1 className='text-green-600 text-lg font-semibold flex items-center gap-2 w-full justify-center py-4'>
                            <CheckCircle className='w-8 h-8' /> Transaccion exitosa!
                        </h1>
                        <div className='w-full p-2'>
                            <h2 className='mb-8 text-center text-sm px-[8%]'>Comprobante nro: {idComprobante}</h2>
                            <div className='px-[8%]'>

                                <table className='w-full text-center grid gap-6'>
                                    <tbody className='border-b gap-4 sm:gap-0 grid grid-cols-1'>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Monto:</td>
                                            <td className='w-full text-left'>${valueTransfer}</td>
                                        </tr>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Fecha:</td>
                                            <td className='w-full text-left'>{dateTransactio}</td>
                                        </tr>
                                    </tbody>

                                    <tbody className='border-b gap-4 sm:gap-0 grid grid-cols-1'>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <th className='w-full text-left'>Cuenta Origen</th>
                                        </tr>

                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Nombre:</td>
                                            <td className='w-full text-left uppercase'>{nombreUsuario}</td>
                                        </tr>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Numero:</td>
                                            <td className='w-full text-left uppercase'>{selectedAccount.numeroCuenta}</td>
                                        </tr>
                                    </tbody>

                                    <tbody className='gap-4 sm:gap-0 grid grid-cols-1'>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <th className='w-full text-left'>Cuenta Destino</th>
                                        </tr>

                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Nombre:</td>
                                            <td className='w-full text-left uppercase'>{toTransfier}</td>
                                        </tr>
                                        <tr className='grid grid-cols-1 sm:grid-cols-2'>
                                            <td className='w-full text-left'>Numero cta:</td>
                                            <td className='w-full text-left uppercase'>{accountNumber.split("-").join('')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='w-full p-2 flex justify-center gap-2'>
                        {/* <button className='p-2 px-4 rounded-md bg-gray-500 hover:bg-gray-400 text-white transition-all'
                         onClick={() => setStateTransfer(false)}>Nueva transferencia</button> */}
                        <button className='p-2 px-4 rounded-md bg-purple-800 hover:bg-purple-600 text-white transition-all flex justify-center items-center'
                            onClick={() => handleOptionClick(1)}> <ChevronLeftCircle className='w-6 h-6 mr-2' /> Regrezar</button>
                    </div>
                </div>
            }
        </div>


    );
};

export default Transfer;