import React, { useEffect } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";

import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
    closeDetailsPopup,
    fetchIngredients,
    resetActiveIngredient,
    selectActiveIngredient,
    selectIsDetailsPopupOpen
} from "../../services/slices/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ANIMATION_DURATION = 300; // мс

const App = () => {
    const dispatch = useAppDispatch();
    const activeIngredient = useAppSelector(selectActiveIngredient);
    const isDetailsPopupOpen = useAppSelector(selectIsDetailsPopupOpen);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const onModalClose = () => {
        dispatch(closeDetailsPopup());
        setTimeout(() => dispatch(resetActiveIngredient()), ANIMATION_DURATION);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.root}>
                <AppHeader />
                <div className={styles.burgerContainer}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                    <Modal open={isDetailsPopupOpen} onClose={onModalClose}>
                        {activeIngredient && <IngredientDetails ingredient={activeIngredient} />}
                    </Modal>
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
