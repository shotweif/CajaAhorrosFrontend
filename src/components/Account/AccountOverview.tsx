import React, { useCallback, useEffect, useState } from 'react';
import noAccount from '../../assets/icon/accountant-25.svg';
import { getAccountsUser } from '../../services/apiClient';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import AccountCard from './AccountCard';
import AccountNew from './AccountNew';
import { CuentaCliente } from '../../Models/Acount';

interface AccountOverviewProps {
    accountData: any;
    clienteId: number;
    loadState: (value: boolean) => void;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ accountData, clienteId, loadState }) => {
    const [isWating, setIsWating] = useState(true);
    const [cuentas, setGetCuentas] = useState<CuentaCliente[]>([]);
    const [isOpenNow, setIsOpenNow] = useState<boolean>(false);

    const fectAccounts = useCallback(async () => {
        try {
            const accounts = await getAccountsUser(clienteId);
            setGetCuentas(accounts.cuentas);
        } catch (error: any) {
            if (!error.response?.data) {
                console.error("Error al cargar el perfil:", error.response?.data || error.message);
            }

            error.response.data.cuentas ? setGetCuentas(error.response.data.cuentas) : null;
            console.log(error.response?.data);
        }
        setIsWating(false);

    }, []);

    const OnClickNewAccount = () => {
        isOpenNow ? setIsOpenNow(false) : setIsOpenNow(true);
    }

    useEffect(() => {
        fectAccounts();
    }, []);

    return (

        <div className='space-y-2 w-full'>
            {!isWating ?
                <>
                    <div className='font-semibold text-lg mb-2 flex justify-between items-center overflow-hidden'>
                        <h1>Account Summary</h1>
                        <button className='p-2 px-3 text-white bg-green-600 hover:bg-green-500 rounded text-sm transition-all'
                            onClick={() => (setIsOpenNow(true))}>
                            Request account
                        </button>
                    </div>

                    <section className='w-full'>
                        {!isOpenNow &&
                            <div className={`w-full grid gap-2 transition-all`}>
                                {cuentas && cuentas?.map((data, index) => (
                                    <AccountCard key={index} dataAccount={data} />
                                ))}
                                {cuentas.length == 0 &&
                                    <div className='w-full min-h-[300px] flex flex-col items-center justify-center'>
                                        <img src={noAccount} alt="" className='w-64 opacity-50' />
                                        <h2 className='text-lg font-semibold text-gray-600'>
                                            Start use your money, open the account now! :D
                                        </h2>
                                        <button className='p-2 px-4 mt-5 bg-purple-800 hover:bg-purple-600 rounded-md text-sm text-white transition-all'
                                            onClick={() => setIsOpenNow(true)}>
                                            Open now
                                        </button>
                                    </div>
                                }
                            </div>}

                        {isOpenNow &&
                            <div className={`w-full space-y-2 transition-all`}>
                                <AccountNew clienteId={clienteId} OnClickNewAccount={OnClickNewAccount} maxAccount={cuentas.length} loadState={loadState} />
                            </div>}
                    </section>
                </>
                :
                <div className='w-full h-40 grid gap-2'>
                    <div className='w-full h-14 bg-gray-200 animate-pulse rounded-lg'></div>
                    <div className='w-full h-24 bg-gray-200 animate-pulse rounded-lg'></div>
                </div>
            }
        </div>
    );
};

export default AccountOverview;