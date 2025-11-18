import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientWithCount } from "../../../app/app.typed";
import styles from "../../burger-constructor.module.css";
import {
    deleteIngredient,
    openDetailsPopup,
    setDragging,
    swapIngredients
} from "../../../../services/slices/ingredients";
import { useAppDispatch } from "../../../../services/hooks";
import { useOnIngredientClick } from "./ingredient.utils";
import cn from "classnames";
import { useDrag, useDrop } from "react-dnd";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface IIngredient extends TIngredientWithCount {
    bun?: boolean;
    position?: "top" | "bottom";
    uniqueId?: string;
}

const Ingredient = (props: IIngredient) => {
    const dispatch = useAppDispatch();

    const location = useLocation();
    const onDeleteClick = () => dispatch(deleteIngredient(props.uniqueId ?? ""));

    const [{ opacity, isDragging }, ref] = useDrag({
        type: "order",
        item: { id: props._id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            isDragging: monitor.isDragging()
        })
    });

    const [{ isHover, target }, dropTarget] = useDrop({
        accept: "order",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
            target: monitor.getItem()
        }),
        drop() {
            dispatch(setDragging(""));
        }
    });

    useEffect(() => {
        if (isDragging) {
            dispatch(setDragging(props.uniqueId ?? ""));
        }
    }, [isDragging]);

    useEffect(() => {
        if (isHover && (target as any).id !== props._id) {
            dispatch(swapIngredients(props.uniqueId ?? ""));
        }
    }, [isHover, target]);

    if (props.bun && props.position) {
        const position = props.position === "top" ? " (верх)" : " (низ)";

        return (
            <div className={cn(styles.ingredientContainer, styles.ingredientContainer_outter)}>
                <ConstructorElement
                    type={props.position}
                    isLocked={true}
                    text={props.name + position}
                    price={props.price}
                    thumbnail={props.image}
                />
            </div>
        );
    }

    return (
        <li ref={dropTarget as any} className={cn(styles.listItem, "pr-4 pl-4 mb-1")}>
            <div className={styles.item} ref={ref as any}>
                <button className={styles.button}>
                    <DragIcon type="primary" />
                </button>
                <div className={styles.ingredientContainer} style={{ opacity }}>
                    <ConstructorElement
                        text={props.count < 2 ? props.name : `${props.name} x${props.count}`}
                        price={props.price}
                        thumbnail={props.image}
                        handleClose={onDeleteClick}
                    />
                </div>
            </div>
        </li>
    );
};

export default Ingredient;
