import React from "react";
import styles from "./ingredient-image.module.css";

interface IIngredientImage {
    src: string;
    renderDiv?: boolean;
}
const IngredientImage = ({ src, renderDiv = false }: IIngredientImage) => {
    if (renderDiv) {
        return (
            <div className={styles.ingredient}>
                <img className={styles.ingredientImage} src={src} alt="ингредиент" />
            </div>
        );
    }

    return (
        <li className={styles.ingredient}>
            <img className={styles.ingredientImage} src={src} alt="ингредиент" />
        </li>
    );
};

export default IngredientImage;
