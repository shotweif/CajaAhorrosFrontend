import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SectioCardProps {
    iconCard: any;
    description: string;
    pathNav: string;
    btnMsg: string;
    layoutSect: string;
}

const SectioCard: React.FC<SectioCardProps> = ({ iconCard, description, pathNav, btnMsg, layoutSect }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const locate = (path: string) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    }
    
    return (
        <div className={`w-full h-[250px]  rounded-xl p-1 shadow overflow-hidden relative bg-[#fff] ${layoutSect}`}>
            {/* <img src={image} alt="" className="absolute top-0 left-0 object-cover" /> */}
            <div className="w-full h-full relative bg-[#fff] backdrop-blur-[3px] flex flex-col items-center justify-center rounded-lg">

                <div className="w-full h-[80px]">
                    {iconCard}
                </div>
                <div className="flex gap-2 items-center cursor-default">
                    <h2 className="font-semibold text-lg">{description}</h2>
                </div>
                <button className="py-2 px-4 bg-purple-800 hover:bg-purple-600 transition-all text-white flex items-center rounded-md mt-4"
                    onClick={() => locate(pathNav)}>
                    <p>{btnMsg}</p>
                    <ChevronRight className="ml-3 w-4" />
                </button>

            </div>
        </div>
    );
};

export default SectioCard;