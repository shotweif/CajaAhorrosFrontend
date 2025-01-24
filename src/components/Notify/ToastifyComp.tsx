import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastifyCompProp {
    mensaje: any;
}   

const ToastifyComp: React.FC<ToastifyCompProp> = ({ mensaje }) => {
    // const notify = () => {
    //     toast("This is a toast notification!");
    // };
    console.log(mensaje);
    const mensajeToast = () => toast.info(mensaje);
    mensajeToast();
    
    return (
        <div>
            {/* <button onClick={notify}>Show Toast</button> */}
            <ToastContainer />
        </div>
    );
};

export default ToastifyComp;