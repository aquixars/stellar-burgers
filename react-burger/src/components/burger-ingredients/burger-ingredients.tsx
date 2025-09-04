import React, { useCallback, useState } from "react";
import { CurrencyIcon, Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";
import { BurgerIngredient } from "../../models/burger-ingredient";
import { BurgerIngredientType } from "../../models/enums/burger-ingredient-types";

interface IBurgerIngredientsProps {
    ingredients: BurgerIngredient[];
    onIngredientClick: (id: string) => void;
}

const BurgerIngredients = (props: IBurgerIngredientsProps) => {
    const { ingredients, onIngredientClick } = props;

    const buns = ingredients.filter((i) => i.type === BurgerIngredientType.BUN);
    const fillings = ingredients.filter((i) => i.type === BurgerIngredientType.FILLING);
    const sauces = ingredients.filter((i) => i.type === BurgerIngredientType.SAUCE);

    const [selectedBurgerIngredientType, setSelectedBurgerIngredientType] = useState(BurgerIngredientType.BUN);

    const onTabClick = (value: string) => setSelectedBurgerIngredientType(value);

    const renderIngredient = useCallback(
        (item: BurgerIngredient) => (
            <li key={item._id}>
                <div className={styles.ingredientsListItem} onClick={() => onIngredientClick(item._id)}>
                    {/* картинка */}
                    <img className="pr-4 pl-4 mb-1" src={item.image} alt={item.name} />

                    {/* цена */}
                    <p className={styles.ingredientPrice}>
                        <span className="text text_type_digits-default mr-2">{item.price}</span>

                        <CurrencyIcon type="primary" />
                    </p>

                    {/* название */}
                    <h3 className={`text text_type_main-default ${styles.ingredientTitle}`}>{item.name}</h3>
                </div>
            </li>
        ),
        [onIngredientClick]
    );

    return (
        <section className={styles.burgerIngredientsRoot}>
            {/* заголовок */}
            <h1 className={`text text_type_main-large ${styles.title}`}>Соберите бургер</h1>

            {/* навбар с типами ингредиентов */}
            <div className={`mb-10 ${styles.navbar}`}>
                {/* булки */}
                <a className={styles.navbarTab} href={`#${BurgerIngredientType.BUN}`}>
                    <Tab
                        value={BurgerIngredientType.BUN}
                        active={selectedBurgerIngredientType === BurgerIngredientType.BUN}
                        onClick={onTabClick}>
                        Булки
                    </Tab>
                </a>

                {/* соусы */}
                <a className={styles.navbarTab} href={`#${BurgerIngredientType.SAUCE}`}>
                    <Tab
                        value={BurgerIngredientType.SAUCE}
                        active={selectedBurgerIngredientType === BurgerIngredientType.SAUCE}
                        onClick={onTabClick}>
                        Соусы
                    </Tab>
                </a>

                {/* начинки */}
                <a className={styles.navbarTab} href={`#${BurgerIngredientType.FILLING}`}>
                    <Tab
                        value={BurgerIngredientType.FILLING}
                        active={selectedBurgerIngredientType === BurgerIngredientType.FILLING}
                        onClick={onTabClick}>
                        Начинки
                    </Tab>
                </a>
            </div>

            {/* ингредиенты */}
            <div className={`custom-scroll ${styles.ingredientsContainer}`}>
                {/* булки */}
                <h2 id={BurgerIngredientType.BUN} className="text text_type_main-medium mb-6">
                    Булки
                </h2>
                <ul className={styles.ingredientsList}>{buns.map(renderIngredient)}</ul>

                {/* соусы */}
                <h2 id={BurgerIngredientType.SAUCE} className="text text_type_main-medium mb-6">
                    Соусы
                </h2>
                <ul className={styles.ingredientsList}>{sauces.map(renderIngredient)}</ul>

                {/* начинки */}
                <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                <ul id={BurgerIngredientType.FILLING} className={styles.ingredientsList}>
                    {fillings.map(renderIngredient)}
                </ul>
            </div>
        </section>
    );
};

export default BurgerIngredients;
