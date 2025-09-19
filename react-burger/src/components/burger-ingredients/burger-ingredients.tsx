import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import Ingredient from "./components/ingredient/ingredient";
import { IngredientType, TIngredient } from "../app/app.typed";
import { useAppSelector } from "../../services/hooks";
import { selectIngredients } from "../../services/slices/ingredients";
import { sortIngredientsByType } from "./burger-ingredients.utils";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
    const ingredients = useAppSelector(selectIngredients);

    const [current, setCurrent] = useState(IngredientType.BUN);
    const { buns, mains, sauces } = sortIngredientsByType(ingredients);

    const onTabClick = (value: string) => setCurrent(value);

    const renderIngredient = (item: TIngredient) => (
        <li className={styles.ingredientsItem} key={item._id}>
            <Ingredient {...item} />
        </li>
    );

    const [headersScroll, setHeadersScroll] = useState([0, 0, 0]);
    const [offsetTop, setOffsetTop] = useState(0);

    const tabsRef = useRef<HTMLDivElement>(null);
    const headersRef = useRef<any>(null);

    useEffect(() => {
        setOffsetTop(Number(tabsRef.current?.getBoundingClientRect().y));
        const headerElements = document.querySelectorAll(".ing-type-header");
        headersRef.current = Array.from(headerElements);

        setHeadersScroll(
            headersRef.current.map((elem: HTMLHeadingElement) => elem.getBoundingClientRect().y - offsetTop)
        );
    }, [offsetTop]);

    useEffect(() => {
        if (headersScroll[2] < 0) {
            setCurrent(IngredientType.MAIN);
        } else if (headersScroll[1] < 0) {
            setCurrent(IngredientType.SAUCE);
        } else if (headersScroll[0] <= 0) {
            setCurrent(IngredientType.BUN);
        }
    }, [headersScroll]);

    const handleScroll = () => {
        setHeadersScroll(
            headersRef.current.map((elem: HTMLHeadingElement) => elem.getBoundingClientRect().y - offsetTop)
        );
    };

    return (
        <section className={styles.root}>
            <h1 className={cn(styles.title, "text text_type_main-large")}>Соберите бургер</h1>
            <div className={cn(styles.displayFlex, "mb-10")}>
                <a className={styles.tabLink} href={`#${IngredientType.BUN}`}>
                    <Tab value={IngredientType.BUN} active={current === IngredientType.BUN} onClick={onTabClick}>
                        Булки
                    </Tab>
                </a>
                <a className={styles.tabLink} href={`#${IngredientType.SAUCE}`}>
                    <Tab value={IngredientType.SAUCE} active={current === IngredientType.SAUCE} onClick={onTabClick}>
                        Соусы
                    </Tab>
                </a>
                <a className={styles.tabLink} href={`#${IngredientType.MAIN}`}>
                    <Tab value={IngredientType.MAIN} active={current === IngredientType.MAIN} onClick={onTabClick}>
                        Начинки
                    </Tab>
                </a>
            </div>
            <div className={cn(styles.ingredientsContainer, "custom-scroll")} onScroll={handleScroll} ref={tabsRef}>
                <h2 id={IngredientType.BUN} className="ing-type-header text text_type_main-medium mb-6">
                    Булки
                </h2>
                <ul className={styles.ingredientsList}>{buns.map(renderIngredient)}</ul>
                <h2 id={IngredientType.SAUCE} className="ing-type-header text text_type_main-medium mb-6">
                    Соусы
                </h2>
                <ul className={styles.ingredientsList}>{sauces.map(renderIngredient)}</ul>
                <h2 id={IngredientType.MAIN} className="ing-type-header text text_type_main-medium mb-6">
                    Начинки
                </h2>
                <ul className={styles.ingredientsList}>{mains.map(renderIngredient)}</ul>
            </div>
        </section>
    );
};

export default BurgerIngredients;
