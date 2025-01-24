import { Copy } from 'lucide-react';
import React from 'react';

interface AccountCardProps {
    dataAccount: any;
}

const AccountCard: React.FC<AccountCardProps> = ({ dataAccount }) => {
    const formatAccountNumber = (number: string) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1-');
    };

    const numberAccount = formatAccountNumber(dataAccount.numeroCuenta);

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 bg-white rounded-md p-4 shadow'>
            <div className=''>
                <div className="text-3xl font-bold">${dataAccount.saldo}</div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
            </div>

            <div className="grid grid-cols-1 space-y-2 xl:space-y-0 xl:grid-cols-2 xl:justify-end text-sm">
                <div className="flex xl:flex-col justify-between">
                    <span>Transactional Account</span>
                    <div className='flex items-center'>
                        <span className="font-medium">Nro</span>
                        <span className="ml-2">{numberAccount}</span>
                        <button className=''></button>
                    <button className='ml-2 w-4 h-4 text-gray-400'
                        onClick={() => navigator.clipboard.writeText(numberAccount)} >
                        <Copy className=' w-full h-full' />
                    </button>
                    </div>
                </div>
                <div className="flex xl:flex-col justify-between">
                    <span>Account status</span>
                    <div className="font-medium flex items-center">
                        {dataAccount.activo ?
                            <>
                                <div className='min-w-2 w-2 min-h-2 h-2 bg-green-500 rounded-full'></div>
                                <p className='ml-2'>Active</p>
                            </> :
                            <>
                                <div className='min-w-2 w-2 min-h-2 h-2 bg-red-900 rounded-full'></div>
                                <p className='ml-2'>Disabled</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;