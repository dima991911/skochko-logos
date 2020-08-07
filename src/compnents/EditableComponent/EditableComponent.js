import React, {useState} from 'react';
import Modal from 'react-modal';
import "./EditableComponent.css";

import { commonIcons } from "../../images/icons";

export default function EditableComponent({ children, value, saveValue }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const changeValue = (e) => {
        setInputValue(e.target.value);
    };

    const saveChangedValue = () => {
        saveValue(inputValue);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="item-wrapper">
                <div className="edit-icon">
                    <img src={commonIcons.edit} alt="edit" onClick={showModal} />
                </div>

                {children}
            </div>

            <Modal
                isOpen={isModalOpen}
                className="modal"
                overlayClassName="modal-overlay"
            >

                <input type="text" className="modal-input" value={inputValue} onChange={changeValue} />

                <div className="modal-actions-container">
                    <button className="modal-action" onClick={saveChangedValue}>SAVE</button>
                    <button className="modal-action" onClick={hideModal}>CANCEL</button>
                </div>

            </Modal>
        </>
    )
}
