import React, { useState } from 'react';
import { CreateAccountsUser } from '../../services/apiClient';
import { CheckCircle, ChevronLeft, OctagonX, TriangleAlert } from 'lucide-react';

interface AccountNewProps {
    clienteId: number
    OnClickNewAccount: () => void;
    maxAccount: number;
    loadState: (value: boolean) => void;
}

const AccountNew: React.FC<AccountNewProps> = ({ clienteId, OnClickNewAccount, maxAccount, loadState }) => {
    const [tac, setTac] = useState<boolean>(false)
    const [createSuccess, setCreateSuccess] = useState<boolean>(false)

    // Obtener los datos del perfil desde el backend
    const createNewAccount = async () => {
        try {
            loadState(true);
            const { success } = await CreateAccountsUser(clienteId);
            // console.log(accounts);
            setTimeout(() => {
                setCreateSuccess(success);
            }, 2500);

        } catch (error: any) {
            console.error("Error al cargar el perfil:", error.response?.data || error.message);
        }
        loadState(false);
    };

    return (
        <div className={` w-full flex flex-col p-8 bg-white rounded-md shadow relative`}>
            <button className='h-10 absolute top-2 left-2 flex items-center text-gray-500'
                onClick={() => OnClickNewAccount()}>
                <ChevronLeft className="h-full " /> Back
            </button>
            {!createSuccess && maxAccount < 3 ?
                <div className=''>
                    <h2 className='text-lg font-bold mt-4'>Open a Savings Account.</h2>
                    <p className='mb-4'>Welcome to <strong>BankNet</strong>. Before proceeding with opening your savings account,
                        it is important that you read and accept the following terms and conditions:</p>

                    <h3 className='ml-2 font-semibold'>1. Account Usage:</h3>
                    <p className='ml-6 mb-2'>The savings account is designed exclusively for the management of personal funds and may not be used for illegal, commercial or business purposes.</p>

                    <h3 className='ml-2 font-semibold'>2. Information Security:</h3>
                    <p className='ml-6'> * It is your responsibility to maintain the confidentiality of your password and personal data.</p>
                    <p className='ml-6 mb-2'> * If you notice any suspicious activity on your account, please notify us immediately.</p>

                    <h3 className='ml-2 font-semibold'>3. Privacy:</h3>
                    <p className='ml-6 mb-2'>Your personal information will only be used to manage your account and comply with applicable legal regulations. Please see our [Privacy Policy] for more details..</p>

                    <h3 className='ml-2 font-semibold'>4. Modifications to the Terms:</h3>
                    <p className='ml-6 mb-2'>BankNet reserves the right to update these terms at any time. You will be notified of any changes before they become effective.</p>

                    <div className='mt-10'>
                        <input type="checkbox" name="acepto" id="acepto" onChange={() => setTac(!tac)} />
                        <label className='ml-2' htmlFor="acepto">Accept the terms and conditions.</label>

                    </div>
                    <button className={`${!tac ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-400'} mt-6  text-white rounded-md p-2 px-4 transition-all`}
                        disabled={!tac} onClick={() => createNewAccount()}>
                        Continue
                    </button>
                </div> :
                !createSuccess && maxAccount > 2 ?
                    <div className='w-full flex flex-col justify-center text-center items-center p-4'>
                        <OctagonX className='my-2 h-14 w-14 text-red-600 ' />
                        <h2 className='text-lg font-semibold'>Permiso denegado</h2>
                        <p className='mb-5'>Usted ya cuenta con el numero maximo de cuentas!</p>
                        <button className='px-4 py-2 rounded-md bg-gray-600 text-white'
                            onClick={() => OnClickNewAccount()}>
                            Back
                        </button>
                    </div> :
                    <div className='w-full flex flex-col justify-center text-center items-center p-4'>
                        <CheckCircle className='my-2 h-14 w-14 text-green-600 ' />
                        <h2 className='text-lg font-semibold'>Su cuenta se ha creado con exito!</h2>
                        <p className='mb-5'>La activacion de su cuenta se realizara dentro de un lapso maximo de 5h habilies.</p>
                        <button className='px-4 py-2 rounded-md bg-gray-600 text-white'
                            onClick={() => OnClickNewAccount()}>
                            Back
                        </button>
                    </div>
            }
        </div>
    );
};

export default AccountNew;