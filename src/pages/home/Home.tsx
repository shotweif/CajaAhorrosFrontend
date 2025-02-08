import React from "react";
import NavBar from "../NavBar";
// import photo from "../../assets/image/AHORROALAVISTA.png";
import photo from "../../assets/image/kilian-karger-hXWZJgYjqJI-unsplash.jpg";
import image1 from "../../assets/image/andre-taissin-Dc2SRspMak4-unsplash.jpg";
import image2 from "../../assets/image/cardmapr-nl-s8F8yglbpjo-unsplash.jpg";
import image3 from "../../assets/image/jason-dent-3wPJxh-piRw-unsplash.jpg";


import { HandCoins, PiggyBank, ShieldCheck } from "lucide-react";
import SectioCard from "../../components/HomeComp/SectioCard";

const Home: React.FC = () => {
    const verfLoged = sessionStorage.getItem('user');

    const section = [
        {
            image: image1, iconos: <PiggyBank className="h-full w-full stroke-[1px]" />, btnMsg: 'Comensemos',
            descripcion: 'Aun no te unes? Guarda tu cash de forma segura.',
            layoutSect: '',
            locationPath: `/profile/${verfLoged}`
        },
        {
            image: image2, iconos: <HandCoins className="h-full w-full stroke-[1px]" />, btnMsg: 'Iniciar ahora',
            descripcion: 'Siguiente paso para darle movimiento a tu dinero.',
            layoutSect: '',
            locationPath: !verfLoged ? '/login':`/profile/${verfLoged}`
        },
        {
            image: image3, iconos: <ShieldCheck className="h-full w-full stroke-[1px]" />, btnMsg: 'Saver mas',
            descripcion: 'Seguridad y Tranquilidad con cada movimiento.',
            layoutSect: 'md:col-span-2',
            locationPath: '/security-and-privacity'
        }
    ]

    return (
        <div className="w-full text-center flex flex-col items-center cursor-default">
            {/* Header */}
            <NavBar />

            {/* Body */}
            <div className="w-full h-full flex flex-1 flex-col items-center justify-center relative pb-5">
                <img src={photo} alt="Imagen de bienvenida" className="aspect-video w-full h-[300px] top-0 left-0 absolute z-0 object-cover" />
                <div className="w-full flex flex-col justify-center h-[300px] bg-[#e2c5fab2] relative z-10">
                    <h2 className=" p-2 text-xl font-semibold">Bienvenido a Caja de Ahorros de</h2>
                    <h1 className=" p-2 text-3xl font-bold mb-10">BankNet</h1>
                </div>

                <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.map((sec, i) => (
                        <SectioCard pathNav={sec.locationPath} iconCard={sec.iconos} description={sec.descripcion} btnMsg={sec.btnMsg} layoutSect={sec.layoutSect} key={i} />
                    ))}
                </div>
            </div>
            <footer className="p-2 text-white bg-gray-800 text-center text-xs w-full">
                <h2>Desarrollado por Kenneth Tutillo & Liseth Pushug, 01 del 2025</h2>
            </footer>

        </div>
    );
}

export default Home;