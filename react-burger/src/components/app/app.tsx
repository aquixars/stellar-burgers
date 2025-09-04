import React, { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./app.module.css";
import OrderDetails from "../order-details/order-details";
import { API_URL, getResponseData } from "../../utils/api";
import { BurgerIngredient } from "../../models/burger-ingredient";
import { BurgerIngredientType } from "../../models/enums/burger-ingredient-types";

const getIngredientById = (ingredients: BurgerIngredient[], ingredientId: string | null) =>
    ingredientId && ingredients.find((i) => i._id === ingredientId);

const App = () => {
    const [data, setData] = useState<BurgerIngredient[]>([]);

    useEffect(() => {
        fetch(API_URL)
            .then(getResponseData)
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false);
    const [selectedIngredientId, setSelectedIngredientId] = useState<null | string>(null);

    const selectedIngredient = data ? getIngredientById(data, selectedIngredientId) : null;

    const handleIngredientDetailsModalClose = () => {
        setIsIngredientDetailsModalOpen(false);

        // закрываем после небольшой задержки, чтобы успела корректно закрыться модалка
        // 300 мс - это transition модалки
        setTimeout(() => setSelectedIngredientId(null), 300);
    };
    const handleIngredientClick = (ingredientId: string) => {
        setIsIngredientDetailsModalOpen(true);
        setSelectedIngredientId(ingredientId);
    };

    const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
    const handleOrderDetailsModalClose = () => {
        setIsOrderDetailsModalOpen(false);
    };
    const handlePlaceOrderClick = () => {
        setIsOrderDetailsModalOpen(true);
    };

    // передаём в конструктор бургера первую попавшуюся булку
    const bun = data ? data.find((d) => d.type === BurgerIngredientType.BUN) : null;
    // передаём в конструктор бургера начинки и соусы
    const fillingsAndSauces = data ? data.filter((d) => d.type !== BurgerIngredientType.BUN) : null;

    return data ? (
        <>
            <div className={styles.root}>
                {/* заголовок */}
                <AppHeader />

                <div className={styles.main}>
                    {/* ингредиенты */}
                    <BurgerIngredients ingredients={data} onIngredientClick={handleIngredientClick} />

                    {/* конструктор */}
                    {bun && fillingsAndSauces && (
                        <BurgerConstructor
                            bun={bun}
                            fillingsAndSauces={fillingsAndSauces}
                            onIngredientClick={handleIngredientClick}
                            handlePlaceOrderClick={handlePlaceOrderClick}
                        />
                    )}
                </div>
            </div>

            {/* модалки */}

            <Modal isOpen={isIngredientDetailsModalOpen} onClose={handleIngredientDetailsModalClose}>
                {selectedIngredient && <IngredientDetails ingredient={selectedIngredient} />}
            </Modal>

            <Modal isOpen={isOrderDetailsModalOpen} onClose={handleOrderDetailsModalClose}>
                <OrderDetails />
            </Modal>
        </>
    ) : (
        <p>Ожидайте, идёт загрузка данных...</p>
    );
};

export default App;
