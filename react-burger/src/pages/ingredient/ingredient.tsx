import React, { useEffect } from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { selectIngredients, fetchIngredients, selectIngredientsLoading } from "../../services/slices/ingredients";
import Layout from "../../components/layout/layout";

const CONTAINER_STYLE = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120
};

const Ingredient: React.FC = () => {
    const dispatch = useAppDispatch();

    const ingredients = useAppSelector(selectIngredients);
    const ingredientsLoading = useAppSelector(selectIngredientsLoading);

    useEffect(() => {
        // загрузить ингредиенты, если их нет
        if (!ingredients.length) {
            dispatch(fetchIngredients());
        }
    }, [ingredients]);

    if (!ingredients.length || ingredientsLoading) {
        return (
            <Layout>
                <h2 style={{ textAlign: "center" }}>Loading...</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={CONTAINER_STYLE}>
                <IngredientDetails />
            </div>
        </Layout>
    );
};

export default Ingredient;
