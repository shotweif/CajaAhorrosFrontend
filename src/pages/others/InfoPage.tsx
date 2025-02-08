import React from 'react';
import NavBar from '../NavBar';

const InfoPage: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="info-page p-[5%] flex flex-col gap-y-3">
                <h1>Información sobre la Plataforma</h1>

                <section className="section mt-4">
                    <h2>Introducción a la Plataforma de Banca de Ahorro</h2>
                    <p>
                        Bienvenidos a nuestra plataforma de banca de ahorro, diseñada para facilitar el manejo financiero personal y educar sobre las mejores prácticas en gestión de finanzas.
                    </p>
                </section>

                <section className="section mt-4">
                    <h2>Funcionalidades Principales</h2>
                    <ul className="list-disc pl-4">
                        <li><strong>Registro y Cuentas:</strong> Abre hasta 3 cuentas bancarias con solo un click. Tu información personal es segura y respaldada.</li>
                        <li><strong>Transferencias:</strong> Realiza transferencias electrónicas rápidas y seguras a cualquier cuenta bancaria en el mundo.</li>
                        <li><strong>Movimientos Bancarios:</strong> Consulta tus movimientos financieros en tiempo real, categorizados para una mejor visión de tus transacciones.</li>
                    </ul>
                </section>

                <section className="section mt-4">
                    <h2>Beneficios</h2>
                    <ul className="list-disc pl-4">
                        <li><strong>Seguridad:</strong> Tu información financiera es protegida con métodos de autenticación Argon2.</li>
                        <li><strong>Conveniencia:</strong> Accede a tus cuentas y realiza operaciones desde cualquier lugar, en cualquier momento, gracias a nuestra plataforma web.</li>
                        <li><strong>Educación Financiera:</strong> Aprende sobre ahorro, inversión y gestión financiera con información educativa incorporada en la plataforma.</li>
                    </ul>
                </section>

                <section className="section mt-4">
                    <h2>Contacto</h2>
                    <p>
                        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar nuestro equipo de soporte. Estamos aquí para ayudarte.
                    </p>
                </section>
            </div>

        </div>
    );
};

export default InfoPage;
