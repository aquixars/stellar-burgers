import cn from "classnames";
import React from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Ingredient from "./components/ingredient/ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
    addIngredient,
    clearConstructor,
    selectBun,
    selectMains,
    selectPrice
} from "../../services/slices/ingredients";
import styles from "./burger-constructor.module.css";
import {
    openOrderPopup,
    closeOrderPopup,
    selectIsOrderPopupOpen,
    selectOrderDetails,
    selectOrderLoading,
    postOrderThunk
} from "../../services/slices/order";
import { useDrop } from "react-dnd";
import { selectIsAuthenticated } from "../../services/slices/user";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const bun = useAppSelector(selectBun);
    const mains = useAppSelector(selectMains);
    const price = useAppSelector(selectPrice);
    const orderDetails = useAppSelector(selectOrderDetails);
    const orderLoading = useAppSelector(selectOrderLoading);
    const isOrderPopupOpen = useAppSelector(selectIsOrderPopupOpen);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const [{ isHover }, dropTarget] = useDrop({
        accept: "order-from-menu",
        collect: (monitor) => ({ isHover: monitor.isOver() }),
        drop(item: any) {
            dispatch(addIngredient(item.id));
        }
    });

    const onOrderSubmit = () => {
        if (!bun || orderLoading) return;

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const ingredientsIds = [bun, ...mains].map((i) => i._id);
        dispatch(postOrderThunk(ingredientsIds)).then(() => {
            dispatch(openOrderPopup());
            dispatch(clearConstructor());
        });
    };

    const onClose = () => dispatch(closeOrderPopup());

    return (
        <section className={cn(styles.root, "ml-10", { [styles.root_over]: isHover })} ref={dropTarget as any}>
            {bun && <Ingredient bun position="top" {...bun} />}
            <ul className={cn(styles.list, "custom-scroll")}>
                {mains.map((item) => (
                    <Ingredient {...item} key={item.uniqueId} />
                ))}
            </ul>
            {bun && <Ingredient bun position="bottom" {...bun} />}

            <div className={styles.footer}>
                <div className={cn(styles.results, "mt-10")}>
                    <p className={cn(styles.totalCost, "mr-10")}>
                        <span className="text text_type_digits-medium mr-2">{price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button htmlType="button" type="primary" size="large" onClick={onOrderSubmit}>
                        {orderLoading ? "Загрузка..." : "Оформить заказ"}
                    </Button>
                </div>
            </div>

            <Modal open={isOrderPopupOpen} onClose={onClose}>
                <OrderDetails {...orderDetails} />
            </Modal>
        </section>
    );
};

export default BurgerConstructor;
