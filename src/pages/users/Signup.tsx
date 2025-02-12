import React, { useState } from "react";
// import { VerifyUser } from '../../services/UserConection';
import imBackground from '../../assets/image/loginBackground.png';
import SignupForm from "../../components/FormClient/SignupForm";
import LoginForm from "../../components/FormClient/LoginForm";
import NavBar from "../NavBar";
import Loading from "../../components/load/Loading";
import { X } from "lucide-react";

const Signup: React.FC = () => {
    const [isLogin, setIsLogon] = useState(true);
    const [isWating, setIsWating] = useState(false);
    const [isMessage, setMessage] = useState<string>('');
    const [isNotAccount, setIsNotAccount] = useState<boolean>(true);

    function signupLogin() {
        isLogin ? setIsLogon(false) : setIsLogon(true);
    }

    function waitResponse(awaitRes: boolean) {
        setIsWating(awaitRes)
    }

    const ActionMessge = (action: boolean, mesg: string) => {
        setMessage(mesg);
        setIsNotAccount(action);
        action ? null :
            setTimeout(() => {
                setIsNotAccount(true);
            }, 4000);
    };

    return (
        <>
            <div className="w-full h-screen bg-white">
                {/* Header */}
                <NavBar />

                {/* Body */}
                <div className={`w-full h-full fixed flex justify-center items-center overflow-hidden`}>
                    <img src={imBackground} className="absolute w-full h-full object-cover object-center aspect-video" alt="" />

                    <div className={` fixed w-full h-full flex justify-center items-center transition-all`}>
                        <div className="w-full h-full bg-gray-800 opacity-70"></div>

                        {/* Iniciar Sesiòn */}
                        <section className={`${isLogin ? 'translate-x-0' : 'translate-x-full'} w-full h-auto absolute flex items-center justify-center transition-all`}>
                            <LoginForm signupLogin={signupLogin} waitResponse={waitResponse} ActionMessge={ActionMessge} />
                        </section>

                        {/* Crear Cuenta */}
                        <section className={`${!isLogin ? 'translate-x-0' : '-translate-x-full'} w-full h-auto absolute flex items-center justify-center transition-all`}>
                            <SignupForm signupLogin={signupLogin} waitResponse={waitResponse} ActionMessge={ActionMessge} />
                        </section>

                    </div>

                    {!isNotAccount &&
                <div className='absolute top-5 right-5 mt-2 max-w-[300px] md:max-w-[450px] w-auto flex items-center justify-center rounded-lg bg-red-300 border border-red-600 text-black italic text-sm text-center p-2 shadow'>
                    <h2>{isMessage}</h2>
                    <button className='w-4 h-4 right-4' onClick={() => ActionMessge(true, '')}> <X className='w-full h-full' /> </button>
                </div>}

                </div>
            </div>

            {isWating &&
                <Loading loadPage={true} />
            }
        </>
    );
}

export default Signup;