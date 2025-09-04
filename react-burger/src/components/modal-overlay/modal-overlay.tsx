import React, { SyntheticEvent, useRef } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay = (props: IModalOverlayProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClick = (evt: SyntheticEvent) => {
        if (evt.target === overlayRef.current) {
            props.onClose();
        }
    };

    return <div className={styles.modalOverlayRoot} onClick={handleClick} ref={overlayRef} />;
};

export default ModalOverlay;
