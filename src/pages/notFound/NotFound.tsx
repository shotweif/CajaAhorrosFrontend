import React from "react";
import NavBar from "../NavBar";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import imagen1 from '../../assets/image/andre-taissin-Dc2SRspMak4-unsplash.jpg'

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const locate = (path: string) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    }

    return (
        <div className="w-full h-screen text-center flex flex-col items-center cursor-default">
            <NavBar />

            <div className="w-full h-full flex flex-col items-center justify-center relative">
                <img src={imagen1} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
                <div className="flex flex-col items-center justify-center gap-y-3 w-full h-full relative bg-[#ffffffa4] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    :C
                    <h2 className="p-10 text-center bg-red-100 rounded-full">Page Not Found!</h2>
                    <button className="p-2 px-3 bg-purple-800 hover:bg-purple-600 text-white flex items-center rounded-lg"
                        onClick={() => locate('/')}>
                        <ChevronLeft className="w-4 h-4 mr-3" />
                        Back Home
                    </button>
                </div>
            </div>

            <footer className="p-2 text-white bg-gray-800 text-center text-xs w-full absolute bottom-0">
                <h2>Desarrollado por Kenneth Tutillo & Liseth Pushug, 01 del 2025</h2>
            </footer>
        </div>
    );
}

export default NotFound;