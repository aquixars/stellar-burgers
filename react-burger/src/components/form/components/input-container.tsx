import cn from "classnames";
import React from "react";
import styles from "../form.module.css";

interface IInputContainer {
    children: React.ReactNode;
}

const InputContainer = (props: IInputContainer) => {
    return <div className={cn(styles.inputContainer, "mb-6")}>{props.children}</div>;
};

export { InputContainer };
