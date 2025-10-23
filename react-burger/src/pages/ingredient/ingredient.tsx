import React from "react";
import Layout from "../../components/layout/layout";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css";
import classNames from "classnames";

const IngredientPage = () => {
    return (
        <Layout>
            <h1 className={classNames(styles.textAlignCenter, "text text_type_main-large mt-10 mb-10")}>
                Детали ингредиента
            </h1>
            <IngredientDetails /> {/* тот же компонент, что и в модалке */}
        </Layout>
    );
};

export default IngredientPage;
