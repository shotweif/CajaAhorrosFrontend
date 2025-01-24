import { Check, Loader2 } from 'lucide-react';
import { validateAccount, startTransfer } from "../../services/apiClient";
import React, { useState } from 'react';

interface TransferProps {
    cuentas: any[];
}

const Transfer: React.FC<TransferProps> = ({ cuentas }) => {
    const [selectedAccount, setSelectedAccount] = useState(cuentas[0]);
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [validateRes, setValidateRes] = useState<boolean>(false);
    const [loadValidate, setLoaderValidate] = useState<boolean>(false);
    const [valueTransfer, setValueTransfer] = useState<string>('00.0');
    const [stateTransfer, setStateTransfer] = useState<boolean>(false);

    const formatAccountNumber = (number: string) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1-');
    };

    const changeAccount = (accountNum: string) => {
        setAccountNumber(accountNum);
        setValidateRes(false);
    }

    const validateNumber = async () => {
        setLoaderValidate(true);
        const changeFormate = accountNumber.split("-");
        const { success } = await validateAccount(changeFormate.join(''));
        setValidateRes(success);
        setLoaderValidate(false);
    }

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const account = cuentas.find(cuenta => cuenta.numeroCuenta === e.target.value);
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
        const changeFormate = accountNumber.split("-");
        console.log(valueTransfer);
        const transferencia = {
            idCuentaOrigen: selectedAccount.numeroCuenta,
            idCuentaDestino: changeFormate.join(''),
            monto: valueTransfer
        }

        if (validateRes) {
            const success = await startTransfer(transferencia);
            setStateTransfer(success);
        }
    }

    return (
        <div className='w-full'>
            <h1 className='p2 text-2xl font-bold mb-2'>Make your transfer</h1>
            <div className='grid gap-2'>
                <h2 className='text-lg font-medium'>Select the source account:</h2>
                <select className='p-2 rounded-lg shadow' onChange={handleAccountChange}>
                    {cuentas.map((cuenta, i) => (
                        <option key={i} value={cuenta.numeroCuenta}>
                            Nro {formatAccountNumber(cuenta.numeroCuenta)}
                        </option>
                    ))}
                </select>
            </div>
            <div className='grid gap-2 mt-5 w-full'>
                <h2 className='text-lg font-medium'>Destination Account:</h2>
                <div className='w-full flex'>
                    <input type="text" className='p-2 rounded-md mr-2 w-full shadow' onChange={(e) => changeAccount(e.target.value)} />
                    <button className='p-2 px-4 bg-green-700 hover:bg-green-600 rounded-md text-white transition-all'
                        disabled={validateRes}
                        onClick={() => validateNumber()}>
                        {loadValidate ? <Loader2 className='animate-spin' /> :
                            !validateRes ? 'Validate' : <Check />}
                    </button>
                </div>
            </div>
            <div className='mt-8'>
                <h1 className='text-xl font-medium'>Available Balance</h1>
                <h2 className='text-3xl font-light'>
                    ${selectedAccount?.saldo}
                </h2>
            </div>
            <div className='w-full grid gap-2 mt-6'>
                <h2 className='text-xl font-medium'>
                    Value to be transferred:
                </h2>
                <input type="number"
                value={valueTransfer}
                className='w-full p-2 rounded-md shadow' 
                onChange={handleMontoChange}
                 />
            </div>

            <button className='mt-8 w-full p-4 px-6 rounded-md text-lg font-semibold text-white bg-purple-800 hover:bg-purple-600 transition-all'
                disabled={(selectedAccount.saldo < valueTransfer)}
                onClick={() => tranferSatrt()}>
                Transfer
            </button>

        </div>
    );
};

export default Transfer;