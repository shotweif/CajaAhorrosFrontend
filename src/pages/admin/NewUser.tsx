import React, { useState } from "react";
import SignupForm from "../../components/FormClient/SignupForm";
import { X } from "lucide-react";

interface NewUserProps {
    setIsAddNewUser: (action: boolean) => void;
}

const NewUser: React.FC<NewUserProps> = ({ setIsAddNewUser }) => {
    const [isLogin, setIsLogon] = useState(true);
    const [isWating, setIsWating] = useState(false);

    function signupLogin() {
        setIsLogon(false);
    }

    function waitResponse(awaitRes: boolean) {
        setIsWating(awaitRes)
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000066] w-full h-screen flex items-center justify-center z-50">
            <div className="flex flex-col items-end gap-1">
                <button className="w-7 h-7 bg-white rounded-full p-1"
                    onClick={()=> setIsAddNewUser(false)}>
                    <X className="w-full h-full text-black rounded-full" />
                </button>
            <SignupForm signupLogin={signupLogin} waitResponse={waitResponse} />
            </div>
        </div>
    );
}
export default NewUser;