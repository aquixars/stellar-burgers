import cn from "classnames";
import React from "react";
import styles from "../form.module.css";

interface ITitle {
    children: React.ReactNode;
}

const Title = ({ children }: ITitle) => {
    return <p className={cn(styles.title, "text text_type_main-medium mb-6")}>{children}</p>;
};

export { Title };
