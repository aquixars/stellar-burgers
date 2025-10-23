// src/components/form/hint.tsx
import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../form.module.css";

interface IHint {
    children: string;
    linkHref: string;
    linkTitle: string;
}

const Hint: React.FC<IHint> = (props) => {
    return (
        <p className={cn(styles.hint, "text text_type_main-default text_color_inactive")}>
            {props.children}{" "}
            <Link to={props.linkHref} className={cn(styles.hintLink, "text text_type_main-default")}>
                {props.linkTitle}
            </Link>
        </p>
    );
};

export { Hint };
