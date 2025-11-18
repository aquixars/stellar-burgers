import React from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../../../../components/feed-card/components/ingredient-image/ingredient-image";
import styles from "./order.module.css";
import { TOrder } from "../../../../services/slices/ws-orders";
import { formatDate } from "../../../../components/feed-card/feed-card";
import { OrderStatusOutput } from "../../../order-details/order-details";

interface IOrderProps {
    data: TOrder;
}

const Order = ({ data }: IOrderProps) => {
    const location = useLocation();

    const orderStatus = data.status.toUpperCase() as keyof typeof OrderStatusOutput;

    return (
        <li className={styles.orderContainer}>
            <Link className={styles.order} to={`orders/${data._id}`} state={{ background: location }}>
                <p className={styles.header}>
                    <span className="text text_type_digits-default">#{data.number}</span>
                    <time className="text text_type_main-default text_color_inactive">
                        {formatDate(data.createdAt)} i-GMT+3
                    </time>
                </p>
                <p className="text text_type_main-medium mb-2">{data.name}</p>
                <p className="text text_type_main-default mb-6">{OrderStatusOutput[orderStatus]}</p>

                <div className={styles.ingredientsContainer}>
                    <ul className={styles.ingredientsList}>
                        {data.modifiedIngredients?.slice(0, 5).map((ing, i) => (
                            <IngredientImage key={`${ing.id}-${data._id}-${i}`} src={ing.img} />
                        ))}
                    </ul>
                    <p className={cn(styles.priceContainer)}>
                        <span className="text text_type_digits-default mr-2">{data.price}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default Order;
