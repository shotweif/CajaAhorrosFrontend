import React, { useState } from "react";
// import { VerifyUser } from '../../services/UserConection';
import imBackground from '../../assets/image/loginBackground.png';
import SignupForm from "../../components/FormClient/SignupForm";
import LoginForm from "../../components/FormClient/LoginForm";
import NavBar from "../NavBar";
import Loading from "../../components/load/Loading";

// window.onload = async () =>{
//     if(sessionStorage.user) {
//         const user = JSON.parse(sessionStorage.user);
//         if(await VerifyUser(user.authToken, user.email)){
//             location.replace('/');
//         }
//     }
// }

const Signup: React.FC = () => {
    const [isLogin, setIsLogon] = useState(true);
    const [isWating, setIsWating] = useState(false);

    function signupLogin() {
        isLogin ? setIsLogon(false) : setIsLogon(true);
    }

    function waitResponse(awaitRes: boolean) {
        setIsWating(awaitRes)
    }

    return (
        <>
            <div className="w-full h-screen bg-white">
                {/* Header */}
                <NavBar />

                {/* Body */}
                <div className={`w-full h-full fixed flex justify-center items-center overflow-hidden`}>
                    <img src={imBackground} className="absolute w-full h-full object-cover object-center" alt="" />

                    <div className={` fixed w-full h-full flex justify-center items-center transition-all`}>
                        <div className="w-full h-full bg-gray-800 opacity-70"></div>

                        {/* Iniciar Sesiòn */}
                        <section className={`${isLogin ? 'translate-x-0' : 'translate-x-full'} w-full h-auto absolute flex items-center justify-center transition-all`}>
                            <LoginForm signupLogin={signupLogin} waitResponse={waitResponse} />
                        </section>

                        {/* Crear Cuenta */}
                        <section className={`${!isLogin ? 'translate-x-0' : '-translate-x-full'} w-full h-auto absolute flex items-center justify-center transition-all`}>
                            <SignupForm signupLogin={signupLogin} waitResponse={waitResponse} />
                        </section>

                    </div>
                </div>
            </div>
            
            {isWating &&
                <Loading loadPage={true} />
            }
        </>
    );
}

export default Signup;