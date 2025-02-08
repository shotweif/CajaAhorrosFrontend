import React, { useEffect, useState } from "react";
import { getUserTransacctons, postUserTransacctonsFilter } from "../../services/apiClient";
import { Brush, Paintbrush } from "lucide-react";

interface HistorialTransactProps {
    idUser: number;
}

const HistorialTransact: React.FC<HistorialTransactProps> = ({ idUser }) => {
    const todayLimt = (new Date().toISOString().split("T")[0]);
    const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
    const formatAccountNumber = (number: string) => number.replace(/(\d{4})(?=\d)/g, '$1-');
    const [selectedAccount, setSelectedAccount] = useState<any>();
    const [isWating, setIsWating] = useState(true);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [cuentas, setCuentas] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchProfile = async () => {
        setIsWating(false);
        try {
            const historyTransactions = await getUserTransacctons(idUser);
            setTransactions(historyTransactions.historial);
            setCuentas(historyTransactions.cuentasDelUsuario);
            setSelectedAccount(historyTransactions.cuentasDelUsuario[0])
        } catch (error: any) {
            console.error("Error al cargar el perfil:", error.response?.data || error.message);
        }
        setIsWating(true);
    };

    useEffect(() => {

        fetchProfile();
    }, []);

    const consultarFitrado = async () => {
        const formattedAccountNumber = selectedAccount ? formatAccountNumber(selectedAccount.numeroCuenta) : '';
        const historyTransactions = await postUserTransacctonsFilter(idUser, today, formattedAccountNumber.split("-").join(''));
        setTransactions(historyTransactions.historial);
        console.log(historyTransactions)
    }

    const formatDateString = (dateString: string): string => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const dataMove = (cuenta: string) => cuentas.some(a => a.numeroCuenta === cuenta) ? 'text-red-700' : 'text-green-700';

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const account = cuentas.find(cuenta => cuenta.numeroCuenta === e.target.value);
        setSelectedAccount(account);
    };

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const displayedTransactions = transactions.slice().reverse().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='w-full'>
            {isWating ? (
                <>
                    {/* Page ACTION BAR */}
                    <div className='font-semibold w-full text-lg mb-2 flex flex-col sm:flex-row justify-between items-center overflow-hidden top-0 left-0'>
                        <h1>Account History</h1>
                        <form id="filterHistory" className="flex items-center gap-2 flex-col sm:flex-row">
                            <div className="flex items-center gap-1">
                                <button className="p-2 w-9 h-9 flex items-center justify-center rounded-md bg-white shadow-sm md:w-full" type="button"
                                    onClick={fetchProfile}>
                                    <Paintbrush className="stroke-[1px] text-purple-500 w-full h-full" />
                                </button>
                                <input type="date" className="p-2 text-sm rounded-md shadow" value={today} max={todayLimt} onChange={(e) => setToday(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-2">
                            <select className='p-2 rounded-lg shadow text-sm font-normal' onChange={handleAccountChange}>
                                {cuentas.map((cuenta, i) => (
                                    <option key={i} value={cuenta.numeroCuenta}>
                                        Nro {formatAccountNumber(cuenta.numeroCuenta)}
                                    </option>
                                ))}
                            </select>
                            <button className='px-3 py-1.5 w-full sm:w-auto text-white bg-green-600 hover:bg-green-500 rounded text-sm transition-all'
                                type="button"
                                onClick={consultarFitrado}>
                                Filtrar
                            </button>
                            </div>
                        </form>
                    </div>

                    <section className='w-full overflow-x-scroll'>
                        <div className={`w-full grid gap-2 transition-all min-w-[800px]`}>
                            <div className="w-full p-4 grid gap-2 grid-cols-5 bg-white rounded-md text-sm font-bold">
                                <h2 className="border-r-2">ID</h2>
                                <h2 className="border-r-2">Monto</h2>
                                <h2 className="border-r-2">Origen</h2>
                                <h2 className="border-r-2">Destino</h2>
                                <h2>Fecha</h2>
                            </div>
                            {displayedTransactions.map((trans, i) => (
                                <div className="w-full p-4 grid grid-cols-5 bg-white hover:bg-violet-100 cursor-default rounded-md text-sm gap-2" key={i}>
                                    <h2>{trans.idTransaccion}</h2>
                                    <h2 className={`${dataMove(trans.idCuentaOrigen)}`}>${trans.monto}</h2>
                                    <h2>{trans.idCuentaOrigen}</h2>
                                    <h2>{trans.idCuentaDestino}</h2>
                                    <h2>{formatDateString(trans.fechaTransaccion)}</h2>
                                </div>
                            ))}
                        </div>

                    </section>

                    <div className="flex justify-between items-center mt-4 bottom-4 left-0 bg-white p-2 rounded-md text-sm">
                        <button className='px-3 py-1.5 bg-gray-300 rounded disabled:opacity-50' value={'Hola'} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button className='px-3 py-1.5 bg-gray-300 rounded disabled:opacity-50' onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                </>
            ) : (
                <div className='w-full h-40 grid gap-2'>
                    <div className='w-full h-14 bg-gray-200 animate-pulse rounded-lg'></div>
                    <div className='w-full h-24 bg-gray-200 animate-pulse rounded-lg'></div>
                </div>
            )}
        </div>
    );
};

export default HistorialTransact;