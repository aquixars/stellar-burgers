import React, { SyntheticEvent, useRef } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlay {
    onClose: () => void;
}

const ModalOverlay = (props: IModalOverlay) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClick = (evt: SyntheticEvent) => {
        if (evt.target === overlayRef.current) {
            props.onClose();
        }
    };

    return <div className={styles.root} onClick={handleClick} ref={overlayRef} />;
};

export default ModalOverlay;
