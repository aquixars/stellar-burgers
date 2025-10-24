import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import React from "react";
import styles from "../form.module.css";

interface ISubmit {
    children: React.ReactNode;
}

const Submit = ({ children }: ISubmit) => {
    return (
        <div className={cn(styles.buttonWrapper, "mb-20")}>
            <Button type="primary" size="medium" htmlType={"submit"}>
                {children}
            </Button>
        </div>
    );
};

export { Submit };
