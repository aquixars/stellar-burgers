import styles from "../../../modal/modal.module.css";
import cn from "classnames";

interface INutritionFacts {
    calories: number;
    carbohydrates: number;
    fat: number;
    proteins: number;
}

const NutritionFacts = (props: INutritionFacts) => {
    return (
        <ul className={styles.nutritionFacts}>
            <li className={cn(styles.nutritionFact, styles.nutritionFact_size_l)}>
                <p className={cn("text text_type_main-default text_color_inactive", styles.nutritionText)}>
                    Калории, ккал
                </p>
                <p className={cn("text text_type_digits-default text_color_inactive", styles.nutritionText)}>
                    {props.calories}
                </p>
            </li>
            <li className={styles.nutritionFact}>
                <p className={cn("text text_type_main-default text_color_inactive", styles.nutritionText)}>Белки, г</p>
                <p className={cn("text text_type_digits-default text_color_inactive", styles.nutritionText)}>
                    {props.proteins}
                </p>
            </li>
            <li className={styles.nutritionFact}>
                <p className={cn("text text_type_main-default text_color_inactive", styles.nutritionText)}>Жиры, г</p>
                <p className={cn("text text_type_digits-default text_color_inactive", styles.nutritionText)}>
                    {props.fat}
                </p>
            </li>
            <li className={styles.nutritionFact}>
                <p className={cn("text text_type_main-default text_color_inactive", styles.nutritionText)}>
                    Углеводы, г
                </p>
                <p className={cn("text text_type_digits-default text_color_inactive", styles.nutritionText)}>
                    {props.carbohydrates}
                </p>
            </li>
        </ul>
    );
};

export default NutritionFacts;
