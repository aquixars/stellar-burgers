import React, { useEffect } from "react";
import cn from "classnames";
import styles from "./order-details.module.css";
import IngredientImage from "../../components/feed-card/components/ingredient-image/ingredient-image";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectOrderByNumber } from "../../services/slices/ws-orders";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { fetchOrdersThunk } from "../../services/slices/order";
import { useModifyOrders } from "../../hooks/useModifyOrders";

export const OrderReadyStatus = {
    PENDING: "pending",
    DONE: "done"
};

export const OrderStatusOutput = {
    PENDING: "Готовится",
    DONE: "Выполнен"
};

const OrderDetails = () => {
    const dispatch = useAppDispatch();
    const { number } = useParams<{ number: string }>();
    const ordersFromSockets = useAppSelector(selectOrderByNumber(+number! ?? 0));

    useEffect(() => {
        if (!ordersFromSockets) {
            dispatch(fetchOrdersThunk());
        }
    }, [ordersFromSockets, dispatch, number]);

    useModifyOrders();

    if (!ordersFromSockets) {
        return null;
    }

    const orderStatus = ordersFromSockets.status.toUpperCase() as keyof typeof OrderStatusOutput;

    return (
        <div className={styles.root}>
            <p className={cn(styles.orderNumber, "text text_type_digits-default mb-10")}>#{ordersFromSockets.number}</p>
            <h1 className="text text_type_main-medium mb-3">{ordersFromSockets.name}</h1>
            <p className="text text_type_main-default mb-15">{OrderStatusOutput[orderStatus]}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={cn(styles.list, "custom-scroll mb-10")}>
                {ordersFromSockets.modifiedIngredients?.map((ing, i) => (
                    <li key={ing.id} className={styles.ingredient}>
                        <IngredientImage key={`${ing.id}-${ordersFromSockets._id}-${i}`} src={ing.img} renderDiv />
                        <p className={cn(styles.title, "text text_type_main-default ml-4 mr-4")}>{ing.name}</p>
                        <p className={styles.priceContainer}>
                            <span className="text text_type_main-default mr-2">
                                {ing.qty} x {ing.price}
                            </span>{" "}
                            <CurrencyIcon type="primary" />
                        </p>
                    </li>
                ))}
            </ul>
            <div className={styles.info}>
                <time className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</time>
                <div className={styles.priceContainer}>
                    <span className="text text_type_main-default mr-2">{ordersFromSockets.price}</span>{" "}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
