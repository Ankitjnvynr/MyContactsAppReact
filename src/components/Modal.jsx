import React from 'react'
import { createPortal } from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";


function Modal({ onClose, isOpen, children }) {
    return createPortal(
        <>
            {isOpen && (
                <div className="absolute top-0 w-[100%] h-[100%] flex justify-center items-center backdrop-blur-sm " >
                    <div className='max-w-[350px] min-h-[200px] rounded-xl w-[80%] bg-[rgba(255,255,255,0.79)] p-4 m-auto border-yellow '>
                        <div className="flex justify-end  ">
                            <AiOutlineClose onClick={onClose} className=' self-end cursor-pointer text-2xl' />
                        </div>
                            {children}
                    </div>
                </div>
            )}
        </>,document.getElementById("modal-root")
    )
}

export default Modal