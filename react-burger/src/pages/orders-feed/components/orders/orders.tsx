import styles from "./orders.module.css";
import FeedCard from "../../../../components/feed-card/feed-card";
import cn from "classnames";
import { TOrder } from "../../../../services/slices/ws-orders";

interface IOrdersProps {
    data: TOrder[];
}

const Orders = ({ data }: IOrdersProps) => {
    return (
        <div className={styles.orders}>
            <ul className={cn(styles.list, "custom-scroll")}>
                {data.map((o) => (
                    <FeedCard key={o._id} data={o} />
                ))}
            </ul>
        </div>
    );
};

export default Orders;
