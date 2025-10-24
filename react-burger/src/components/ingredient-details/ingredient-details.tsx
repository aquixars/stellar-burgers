import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { selectIngredients } from "../../services/slices/ingredients";

const IngredientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const items = useAppSelector(selectIngredients);
    const ing = useMemo(() => items.find((i) => i._id === id), [items, id]);

    if (!items.length) {
        return <p className="text text_type_main-default p-10">Загрузка...</p>;
    }

    if (!ing) {
        return <p className="text text_type_main-default p-10">Ингредиент не найден</p>;
    }

    return (
        <div className="p-10" style={{ textAlign: "center" }}>
            <h3 style={{ textAlign: "center" }} className={"text text_type_main-large pt-3 pb-3"}>
                Детали ингредиента
            </h3>
            <img src={ing.image_large} alt={ing.name} />
            <h3 className="text text_type_main-medium mt-4">{ing.name}</h3>

            <ul className="mt-8" style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <li>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default">{ing.calories}</p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default">{ing.proteins}</p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default">{ing.fat}</p>
                </li>
                <li>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ing.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};

export default IngredientDetails;
