import { BurgerIngredient } from "../../models/burger-ingredient";
import styles from "./ingredient-details.module.css";

interface IIngredientDetailsProps {
    ingredient: BurgerIngredient;
}

const IngredientDetails = (props: IIngredientDetailsProps) => {
    const { ingredient } = props;

    const renderNutritionListItem = (name: string, value: string, extraStyles?: string) => {
        return (
            <li className={`${styles.nutritionFactListItem} ${extraStyles}`}>
                <p className={`text text_type_main-default text_color_inactive ${styles.nutritionText}`}>{name}</p>
                <p className={`text text_type_digits-default text_color_inactive ${styles.nutritionText}`}>{value}</p>
            </li>
        );
    };

    return (
        <>
            {/* заголовок */}
            <h1 className="text text_type_main-large pt-3 pb-3">Детали ингредиента</h1>

            {/* картинка */}
            <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />

            {/* название */}
            <h2 className={`text text_type_main-medium pt-2 pb-8 ${styles.title}`}>{ingredient.name}</h2>

            {/* кбжу */}
            <ul className={styles.nutritionFactsList}>
                {/* калории */}
                {renderNutritionListItem(
                    "Калории, ккал",
                    ingredient.calories.toString(),
                    styles.nutritionFactListItemExtraWidth
                )}

                {/* белки */}
                {renderNutritionListItem("Белки, г", ingredient.proteins.toString())}

                {/* жиры */}
                {renderNutritionListItem("Жиры, г", ingredient.fat.toString())}

                {/* углеводы */}
                {renderNutritionListItem("Углеводы, г", ingredient.carbohydrates.toString())}
            </ul>
        </>
    );
};

export default IngredientDetails;
