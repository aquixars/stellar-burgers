import styles from "../../burger-ingredients.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { TIngredient } from "../../../app/app.typed";
import { selectIngredientQty } from "../../../../services/slices/ingredients";
import { useAppSelector } from "../../../../services/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

interface IIngredient extends TIngredient {}

const Ingredient = (props: IIngredient) => {
    const location = useLocation();
    const ingredientCount = useAppSelector(selectIngredientQty(props._id));

    const [, ref] = useDrag({
        type: "ingredient-from-menu",
        item: { id: props._id }
    });

    return (
        <Link
            key={props._id}
            className={styles.link}
            to={{ pathname: `/ingredients/${props._id}` }}
            state={{ background: location }}>
            <div className={styles.burgerIngredient} ref={ref as any}>
                {ingredientCount > 0 && <Counter count={ingredientCount} size="default" />}
                <img className="pr-4 pl-4 mb-1" src={props.image} alt={props.name} />
                <p className={styles.ingredientCost}>
                    <span className="text text_type_digits-default mr-2">{props.price}</span>{" "}
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className={cn(styles.ingredientTitle, "text text_type_main-default")}>{props.name}</h3>
            </div>
        </Link>
    );
};

export default Ingredient;
