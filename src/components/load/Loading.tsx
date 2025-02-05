import React from 'react';
import '../../styles/loading.css';

interface LoadingProps {
    loadPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loadPage }) => {
    return (
        <div className={`${loadPage ? 'bg-[#22222250]' :''} loading-container absolute top-0 left-0 w-full h-full flex items-center justify-center z-50`}>
            <div className="loader"></div>
        </div>
    );
};

export default Loading;