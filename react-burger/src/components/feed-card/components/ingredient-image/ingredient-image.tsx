import React from "react";
import styles from "./ingredient-image.module.css";

interface IIngredientImage {
    src: string;
    renderDiv?: boolean;
    style?: React.CSSProperties;
}
const IngredientImage = ({ src, renderDiv = false, style }: IIngredientImage) => {
    if (renderDiv) {
        return (
            <div style={style} className={styles.ingredient}>
                <img className={styles.ingredientImage} src={src} alt="ингредиент" />
            </div>
        );
    }

    return (
        <li style={style} className={styles.ingredient}>
            <img className={styles.ingredientImage} src={src} alt="ингредиент" />
        </li>
    );
};

export default IngredientImage;
