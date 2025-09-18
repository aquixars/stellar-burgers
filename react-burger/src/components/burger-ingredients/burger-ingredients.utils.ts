import { IngredientType, TIngredient } from "../app/app.typed";

export const sortIngredientsByType = (data: TIngredient[]) => {
    const buns = data.filter((i) => i.type === IngredientType.BUN);
    const mains = data.filter((i) => i.type === IngredientType.MAIN);
    const sauces = data.filter((i) => i.type === IngredientType.SAUCE);
    return { buns, mains, sauces };
};
