import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { BurgerIngredient } from "../../models/burger-ingredient";

const countPrice = (bun: BurgerIngredient, fillingsAndSauces: BurgerIngredient[]) => {
    return fillingsAndSauces
        .map((ing) => ing.price)
        .reduce((ing, acc) => {
            acc = acc + ing;
            return acc;
        }, bun.price);
};

interface IBurgerConstructorProps {
    bun: BurgerIngredient;
    fillingsAndSauces: BurgerIngredient[];
    onIngredientClick: (id: string) => void;
    handlePlaceOrderClick: () => void;
}

const BurgerConstructor = (props: IBurgerConstructorProps) => (
    <section className={`ml-10 ${styles.burgerConstructorRoot}`}>
        {/* верхняя булка */}
        <div
            className={`${styles.ingredientContainer} ${styles.scrollbarPaddingRight}`}
            onClick={() => props.onIngredientClick(props.bun._id)}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={`${props.bun.name} (верх)`}
                price={props.bun.price}
                thumbnail={props.bun.image}
            />
        </div>

        {/* начинки и соусы внутри списка со скроллом */}
        <ul className={`custom-scroll ${styles.fillingsAndSaucesList}`}>
            {props.fillingsAndSauces.map((item, idx) => (
                <li className={styles.fillingsAndSaucesListItem} key={idx}>
                    <button className={styles.dragButton}>
                        <DragIcon type="primary" />
                    </button>

                    <div className={styles.ingredientContainer} onClick={() => props.onIngredientClick(item._id)}>
                        <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                    </div>
                </li>
            ))}
        </ul>

        {/* нижняя булка */}
        <div
            className={`${styles.ingredientContainer} ${styles.scrollbarPaddingRight}`}
            onClick={() => props.onIngredientClick(props.bun._id)}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${props.bun.name} (низ)`}
                price={props.bun.price}
                thumbnail={props.bun.image}
            />
        </div>

        <div className={`mt-10 ${styles.orderInfoContainer}`}>
            {/* сумма заказа */}
            <p className={`mr-10 ${styles.totalPrice}`}>
                <span className="text text_type_digits-medium mr-2">
                    {countPrice(props.bun, props.fillingsAndSauces)}
                </span>

                <CurrencyIcon type="primary" />
            </p>

            {/* кнопка оформления заказа */}
            <Button type="primary" size="large" htmlType="button" onClick={props.handlePlaceOrderClick}>
                Оформить заказ
            </Button>
        </div>
    </section>
);

export default BurgerConstructor;
