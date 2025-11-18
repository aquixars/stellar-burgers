import cn from "classnames";
import styles from "./stats.module.css";
import { useMemo } from "react";
import { useAppSelector } from "../../../../services/hooks";
import { selectOrders } from "../../../../services/slices/ws-orders";
import { OrderReadyStatus } from "../../../order-details/order-details";

interface IStatsProps {
    data: {
        total: number | undefined;
        totalToday: number | undefined;
    };
}

const Stats = ({ data }: IStatsProps) => {
    const orders = useAppSelector(selectOrders);
    const pendingOrders = useMemo(
        () => orders?.filter((o) => o.status === OrderReadyStatus.PENDING).map((o) => o.number),
        [orders]
    );
    const doneOrders = useMemo(
        () => orders?.filter((o) => o.status === OrderReadyStatus.DONE).map((o) => o.number),
        [orders]
    );
    return (
        <div className={styles.stats}>
            <div className={styles.ordersStatuses}>
                <div className={styles.ordersStatus}>
                    <p className="text text_type_main-medium mb-6">Готовы:</p>
                    <ul className={styles.idsList}>
                        {doneOrders?.slice(0, 10).map((o) => (
                            <li
                                key={o}
                                className={cn(
                                    styles.orderId,
                                    styles.orderId_highlight,
                                    "text text_type_digits-default"
                                )}>
                                {o}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.ordersStatus}>
                    <p className="text text_type_main-medium mb-6">В работе:</p>
                    <ul className={styles.idsList}>
                        {pendingOrders?.slice(0, 10).map((o) => (
                            <li key={o} className={cn(styles.orderId, "text text_type_digits-default")}>
                                {o}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.globalStats}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <span className={cn(styles.stat, "text text_type_digits-large")}>
                    {data.total === undefined ? "–" : data.total}
                </span>
            </div>
            <div className={styles.globalStats}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <span className={cn(styles.stat, "text text_type_digits-large")}>
                    {data.totalToday === undefined ? "–" : data.totalToday}
                </span>
            </div>
        </div>
    );
};

export default Stats;
