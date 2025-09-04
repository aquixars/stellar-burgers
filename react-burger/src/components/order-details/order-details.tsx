import React from "react";

import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/check-mark-icon";

const OrderDetails = () => {
    return (
        <>
            <div className={styles.orderDetailsRoot}>
                <h1 className="text text_type_digits-large pt-20 pb-8">034536</h1>
                <p className="text text_type_main-medium pb-15">идентификатор заказа</p>

                <CheckMarkIcon className="pb-15" type="primary" />
                <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default pb-15 text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </>
    );
};

export default OrderDetails;
