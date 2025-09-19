export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TIngredientWithCount = TIngredient & { count: number };

export const IngredientType = {
    BUN: "bun",
    SAUCE: "sauce",
    MAIN: "main"
};

export enum ActionType {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT
}

export interface IConstructorState {
    bun: null | TIngredientWithCount;
    mains: TIngredientWithCount[];
    price: number;
}

export type IAction = {
    type: ActionType;
    payload?: any;
};
