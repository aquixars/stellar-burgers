import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "./components/ingredient-image/ingredient-image";
import styles from "./feed-card.module.css";
import { TOrder } from "../../services/slices/ws-orders";
import dayjs from "dayjs";

interface IFeedCardProps {
    data: TOrder;
}

export const formatDate = (utc: string): string => {
    const date = dayjs(utc);
    const isToday = dayjs().startOf("day").isSame(date, "day");
    if (isToday) return "Сегодня, " + date.format("kk:mm");
    const isYesterday = dayjs().subtract(1, "day").isSame(date, "day");
    if (isYesterday) return "Вчера, " + date.format("kk:mm");
    return date.format("DD:MM, kk:mm");
};

const FeedCard = ({ data }: IFeedCardProps) => {
    const location = useLocation();

    return (
        <li className={styles.cardContainer}>
            <Link to={`/feed/${data.number}`} state={{ background: location }} className={styles.card}>
                <p className={cn(styles.header, "text text_type_digits-default")}>
                    #{data.number}{" "}
                    <time className="text text_type_main-default text_color_inactive">
                        {formatDate(data.createdAt)} i-GMT+3
                    </time>
                </p>
                <h2 className={cn(styles.title, "text text_type_main-medium")}>{data.name}</h2>
                <div className={styles.priceInfo}>
                    {data.modifiedIngredients && (
                        <ul className={styles.ingredientsList}>
                            {data.modifiedIngredients
                                .slice(0, 5)
                                .reverse()
                                .map((ing, i) => (
                                    <IngredientImage key={`${ing.id}-${data._id}-${i}`} src={ing.img} />
                                ))}
                        </ul>
                    )}
                    <p className={cn(styles.priceContainer)}>
                        <span className={cn(styles.price, "text text_type_digits-default")}>
                            {data.price ? data.price : "–"}
                        </span>
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default FeedCard;
