import React from 'react';
import { RxCross2 } from "react-icons/rx";
import './css/modal.css'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2> Are you sure you want to delete ?</h2>
                    <button onClick={onClose}><RxCross2 /></button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;