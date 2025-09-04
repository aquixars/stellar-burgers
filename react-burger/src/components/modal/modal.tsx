import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modals")!;

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = (props: IModalProps) => {
    const onEscKeydown = useCallback(
        (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                props.onClose();
            }
        },
        [props]
    );

    useEffect(() => {
        document.addEventListener("keydown", onEscKeydown);

        return () => {
            document.removeEventListener("keydown", onEscKeydown);
        };
    }, [onEscKeydown]);

    return ReactDOM.createPortal(
        <>
            <div
                className={
                    props.isOpen ? `${styles.modal} ${styles.openModal}` : `${styles.modal} ${styles.closedModal}`
                }>
                {/* оверлей */}
                <ModalOverlay onClose={props.onClose} />

                <div className={styles.content}>
                    {/* кнопка закрытия */}
                    <button className={styles.closeButton} onClick={props.onClose}>
                        <CloseIcon type="primary" />
                    </button>

                    {/* содержимое модалки */}
                    {props.children}
                </div>
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
