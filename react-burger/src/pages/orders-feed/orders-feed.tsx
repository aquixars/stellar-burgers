import Layout from "../../components/layout/layout";

import Orders from "./components/orders/orders";
import Stats from "./components/stats/stats";

import styles from "./orders-feed.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { useEffect } from "react";
import { WS_ORDER_ACTIONS, selectOrders, selectStats } from "../../services/slices/ws-orders";
import { useModifyOrders } from "../../hooks/useModifyOrders";

const OrdersFeed = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectOrders);
    const stats = useAppSelector(selectStats);

    useEffect(() => {
        dispatch({ type: WS_ORDER_ACTIONS.wsInit });

        return () => {
            dispatch({ type: WS_ORDER_ACTIONS.wsClose });
        };
    }, []);

    useModifyOrders();

    return (
        <Layout>
            <div className={styles.root}>
                <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
                <div className={styles.content}>
                    {orders ? <Orders data={orders} /> : <div style={{ width: "100%", minWidth: 604 }} />}
                    <Stats data={stats} />
                </div>
            </div>
        </Layout>
    );
};

export default OrdersFeed;
