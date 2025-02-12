import React from "react";

interface ActionPopUpProps {
    CloseActionPopup: () => void;
    DeleteAction: () => void;

}

const ActionPopUp: React.FC<ActionPopUpProps> = ({ CloseActionPopup, DeleteAction }) => {
    return (
        <>
            <div className='w-full h-screen bg-[#000000cb] fixed top-0 left-0 z-50 flex items-center justify-center p-4'>
                <div className='p-2 rounded-md flex flex-col relative bg-white w-[280px] md:w-[480px] gap-2'>
                    <h1 className='text-lg font-semibold'>Do you want to do?</h1>
                    <div className='w-full text-sm'>This action is permanet, if continue you can't undo.</div>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <button className='p-2 px-3 bg-purple-800 text-white rounded-md'
                            onClick={() => DeleteAction()}>Continue</button>
                        <button className='p-2 px-3 bg-gray-800 text-white rounded-md'
                            onClick={() => CloseActionPopup()}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ActionPopUp;