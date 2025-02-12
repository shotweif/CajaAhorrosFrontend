import React from 'react';
import NavBar from '../NavBar';
import { Code, Network, Plug2 } from 'lucide-react';

import imgi1 from '../../assets/image/jinx.jpg';
import imgi2 from '../../assets/image/112116494_p0.jpg';

import reactImg from '../../assets/icon/image.png';
import netcoreImg from '../../assets/icon/image2.png';
import postgresImg from '../../assets/icon/image3.png';

const AboutUs: React.FC = () => {
    return (
        <div>
            <NavBar />
            <div className="about-us p-[5%] flex flex-col gap-y-3">
                <h1 className='text-2xl font-bold w-full text-center'>Dearrollo de BankNET</h1>

                <section className='pt-6 border-t'>
                    <h1 className='text-2xl font-bold'>Sobre Nosotros</h1>
                    <p>
                        Bienvenidos a nuestra plataforma de cuenta bancaria web, un proyecto desarrollado para la materia de Ingeniería de Software en la Universidad Politécnica Salesiana. Este esfuerzo estudiantil nos ha permitido poner en práctica nuestros conocimientos en el desarrollo de aplicaciones web utilizando tecnologías modernas y eficientes.
                    </p>
                </section>

                <section>
                    <h2 className='text-2xl font-semibold'>Objetivo del Proyecto</h2>
                    <p>
                        El objetivo principal de este proyecto es desarrollar una plataforma completa para la gestión bancaria, enfocándose específicamente en cuentas de ahorro. Esta aplicación busca ofrecer funciones básicas como consultar saldo, transferencias electrónicas y depósitos.
                    </p>
                </section>

                <section className='pt-6 border-t'>
                    <h2 className='text-2xl font-semibold w-full text-center'>Tecnologías Utilizadas</h2>
                    <ul className='w-full flex flex-col gap-2 px-[5%]'>
                        <li className='flex gap-1 items-center'> <img src={reactImg} alt="" className='w-20 h-20 bg-gray-200 object-cover' /> <strong>React:</strong> Framework para construir interfaces de usuario interactivas.</li>
                        <li className='flex gap-1 items-center'> <img src={netcoreImg} alt="" className='w-20 h-20 bg-gray-200 object-cover' /> <strong>.NET Core:</strong> Plataforma de desarrollo de aplicaciones web eficiente y escalable.</li>
                        <li className='flex gap-1 items-center'> <img src={postgresImg} alt="" className='w-20 h-20 bg-gray-200 object-cover' /> <strong>PostgreSQL:</strong> Sistema de gestión de bases de datos relacional robusto y seguro.</li>
                    </ul>

                </section>
                <section className='pt-6 border-t'>
                    <h2 className='text-2xl font-semibold w-full text-center'>Integrantes</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2 text-xs sm:text-sm'>

                        <div className='w-full sm:min-w-[400px] p-2 px-[8%] rounded-md bg-white flex flex-col sm:flex-row gap-1 items-center shadow'>
                            <div className='flex items-center justify-center w-full sm:w-auto pb-[2px] sm:pr-[2px] border-b sm:border-b-0 sm:border-r'>
                                <img src={imgi1} className='min-w-36 w-36 min-h-36 h-36 bg-white rounded-full object-cover border-2 mr-5' alt="" />
                            </div>
                            <ul className='ml-2'>
                                <li><strong>Estudiante:</strong> Kenneth Eduardo Tutillo Duarte</li>
                                <li><strong>Correo:</strong> ktutillod@est.ups.edu.ec</li>
                                <li><strong>Carrera:</strong> Ing en Ciencias de la computacion</li>
                                <li className='pl-2 flex items-center gap-2 mt-1'> <Code className='w-5 h-5' /> Software</li>
                            </ul>
                        </div>

                        <div className='w-full sm:min-w-[400px] p-2 px-[8%] rounded-md bg-white flex flex-col sm:flex-row gap-1 items-center shadow'>
                            <div className='flex items-center justify-center w-full sm:w-auto pb-[2px] sm:pr-[2px] border-b sm:border-b-0 sm:border-r'>
                                <img src={imgi2} className='min-w-36 w-36 min-h-36 h-36 bg-white rounded-full object-cover border-2 mr-5' alt="" />
                            </div>
                            <ul className='ml-2'>
                                <li><strong>Estudiante:</strong> Liseth Estefania Pushug </li>
                                <li><strong>Correo:</strong> lpushush-@est.ups.edu.ec</li>
                                <li><strong>Carrera:</strong> Ing en Ciencias de la computacion</li>
                                <li className='pl-2 flex items-center gap-2 mt-1'> <Network className='w-5 h-5' /> Reded</li>
                            </ul>
                        </div>

                    </div>
                </section>

                {/* <h2>Tecnologías Utilizadas</h2>
                <ul>
                    <li><strong>React:</strong> Framework para construir interfaces de usuario interactivas.</li>
                    <li><strong>.NET Core:</strong> Plataforma de desarrollo de aplicaciones web eficiente y escalable.</li>
                    <li><strong>PostgreSQL:</strong> Sistema de gestión de bases de datos relacional robusto y seguro.</li>
                </ul>

                <h2>Estructura del Proyecto</h2>
                <p>
                    El proyecto se compone de dos partes principales:
                </p>

                <ul>
                    <li><strong>Frontend:</strong> Desarrollado con React, donde la interfaz del usuario es completamente responsiva y fácil de usar.</li>
                    <li><strong>Backend:</strong> Implementado con .NET Core, incluyendo servicios RESTful para interactuar con la base de datos y manejar las operaciones bancarias.</li>
                </ul> */}

                {/* <h2>Desarrollo</h2>
                <p>
                    El equipo de desarrollo estudió y seleccionó las tecnologías más adecuadas para el proyecto. Se llevaron a cabo los siguientes pasos clave:
                </p>

                <ol>
                    <li><strong>Diseño del Modelo Conceptual:</strong> Definición del diseño general del sistema, incluyendo entidades, relaciones y atributos.</li>
                    <li><strong>Desarrollo Frontend:</strong> Construcción de componentes interactivos utilizando React y estilos responsivos con CSS o Frameworks como Material-UI o Ant Design.</li>
                    <li><strong>Implementación Backend:</strong> Creación de controladores, servicios y bases de datos usando .NET Core y PostgreSQL. Se implementaron funcionalidades para el registro, inicio de sesión, consultas bancarias y transacciones.</li>
                    <li><strong>Pruebas y Depuración:</strong> Realización exhaustiva de pruebas unitarias y de integración para asegurar la funcionalidad y la confiabilidad del sistema.</li>
                    <li><strong>Despliegue:</strong> Implementación de la aplicación en un servidor web, configurando la seguridad y el rendimiento óptimo.</li>
                </ol>

                <h2>Evaluación e Innovaciones</h2>
                <p>
                    Tras la implementación inicial, se realizaron evaluaciones exhaustivas para identificar áreas de mejora. Se propusieron varias innovaciones en los siguientes aspectos:
                </p>

                <ul>
                    <li><strong>Seguridad:</strong> Implementación de autenticación y autorización seguras utilizando JWT (JSON Web Tokens) y SSL/TLS.</li>
                    <li><strong>Rendimiento:</strong> Optimización del código y la base de datos para mejorar el tiempo de respuesta en las consultas frecuentes.</li>
                    <li><strong>Interfaz de Usuario:</strong> Mejora en la experiencia del usuario a través de una diseño más intuitivo y fácil de usar.</li>
                </ul>

                <h2>Conclusión</h2>
                <p>
                    Este proyecto no solo nos ha permitido aplicar los conocimientos teóricos adquiridos durante nuestra formación académica, sino que también ha sido una oportunidad valiosa para aprender y mejorar nuestras habilidades en la práctica del desarrollo de software. Esperamos que esta plataforma bancaria web pueda ser de utilidad para estudiantes e incluso a personas interesadas en el manejo de sus finanzas personales.
                </p> */}
            </div>
        </div>
    );
};

export default AboutUs;
