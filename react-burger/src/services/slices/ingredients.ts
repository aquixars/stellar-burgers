import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientType, TIngredient } from "../../components/app/app.typed";
import { getIngredients } from "../../utils/api";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

type TIdWithQty = { id: string; qty: number };

interface IIngredientsState {
    // ingredients
    ingredients: TIngredient[];
    ingredientsLoading: boolean;
    ingredientsError: boolean;
    activeIngredientId: string;
    isDetailsPopupOpen: boolean;

    // constructor
    constructor: {
        bun: null | TIdWithQty;
        mains: (TIdWithQty & { uniqueId: string })[]; // Добавляем поле uniqueId
        price: number;
    };
    dragging: string;
}

const initialConstructorState = {
    bun: null,
    mains: [],
    price: 0
};

const initialState: IIngredientsState = {
    // ingredients
    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: false,
    activeIngredientId: "",
    isDetailsPopupOpen: false,

    // constructor
    constructor: initialConstructorState,
    dragging: ""
};

const countPrice = (state: IIngredientsState) => {
    const ingredientsToCount = [...state.constructor.mains];
    if (state.constructor.bun) {
        ingredientsToCount.push(state.constructor.bun as any);
    }

    return ingredientsToCount.reduce((acc, item) => {
        const ingredient = state.ingredients.find((i) => i._id === item.id);
        if (!ingredient) return acc;
        return acc + ingredient.price * item.qty;
    }, 0);
};

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", getIngredients);

export const ingredients = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        // взаимодействие с попапом ингредиента
        openDetailsPopup: (state) => {
            state.isDetailsPopupOpen = true;
        },
        setActiveIngredient: (state, action: PayloadAction<string>) => {
            state.activeIngredientId = action.payload;
        },
        resetActiveIngredient: (state) => {
            state.activeIngredientId = "";
        },
        closeDetailsPopup: (state) => {
            state.isDetailsPopupOpen = false;
        },

        // взаимодействие с конструктором
        addIngredient: {
            reducer: (state, action: PayloadAction<{ id: string; uniqueId?: string }>) => {
                const ingredient = state.ingredients.find((i) => i._id === action.payload.id);
                if (!ingredient) return;

                if (ingredient.type === IngredientType.BUN) {
                    state.constructor.bun = { id: action.payload.id, qty: 2 };
                } else {
                    const uniqueId = action.payload.uniqueId || uuidv4();
                    state.constructor.mains.push({
                        id: action.payload.id,
                        qty: 1,
                        uniqueId
                    });
                }
                state.constructor.price = countPrice(state);
            },
            prepare: (id: string) => {
                return { payload: { id, uniqueId: uuidv4() } };
            }
        },
        deleteIngredient: (state, action: PayloadAction<string>) => {
            state.constructor.mains = state.constructor.mains.filter((item) => item.uniqueId !== action.payload);
            state.constructor.price = countPrice(state);
        },
        setDragging: (state, action: PayloadAction<string>) => {
            state.dragging = action.payload;
        },
        swapIngredients: (state, action: PayloadAction<string>) => {
            const dragIndex = [...state.constructor.mains].findIndex((ing) => ing.uniqueId === state.dragging);
            const hoverIndex = state.constructor.mains.findIndex((item) => item.uniqueId === action.payload);

            if (dragIndex > -1 && hoverIndex > -1) {
                const temp = state.constructor.mains[dragIndex];
                state.constructor.mains[dragIndex] = state.constructor.mains[hoverIndex];
                state.constructor.mains[hoverIndex] = temp;
            }
        },
        clearConstructor: (state) => {
            state.constructor = initialConstructorState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.ingredientsLoading = true;
        });
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload.data;
            state.ingredientsLoading = false;
            state.ingredientsError = false;
        });
        builder.addCase(fetchIngredients.rejected, (state) => {
            state.ingredientsError = true;
        });
    }
});

export const selectIngredients = (state: RootState) => {
    return state.ingredients.ingredients;
};
export const selectActiveIngredient = (state: RootState) => {
    return state.ingredients.ingredients.find((i) => i._id === state.ingredients.activeIngredientId);
};
export const selectBun = (state: RootState) => {
    const bun = state.ingredients.ingredients.find((i) => i._id === state.ingredients.constructor.bun?.id);
    if (!bun) return null;

    return { ...bun, count: 2 };
};
export const selectMains = (state: RootState) => {
    return state.ingredients.constructor.mains.map((main) => {
        const foundIngredient = state.ingredients.ingredients.find((ingredient) => ingredient._id === main.id)!;
        return {
            ...foundIngredient,
            count: main.qty,
            uniqueId: main.uniqueId
        };
    });
};
export const selectPrice = (state: RootState) => {
    return state.ingredients.constructor.price;
};
export const selectIngredientQty = (id: string) => (state: RootState) => {
    const ingredient = state.ingredients.ingredients.find((i) => i._id === id);
    if (!ingredient) return 0;

    if (ingredient.type === IngredientType.BUN) {
        const bun = state.ingredients.constructor.bun;
        return bun && bun.id === id ? 2 : 0;
    }

    const main = state.ingredients.constructor.mains.filter((i) => i.id === id);
    return main ? main.length : 0;
};
export const selectIngredientsLoading = (state: RootState) => {
    return state.ingredients.ingredientsLoading;
};
export const selectIngredientById = (id: string) => (state: RootState) => {
    return state.ingredients.ingredients.find((ing) => ing._id === id);
};

const { actions, reducer } = ingredients;

export const {
    closeDetailsPopup,
    openDetailsPopup,
    resetActiveIngredient,
    addIngredient,
    deleteIngredient,
    setDragging,
    swapIngredients,
    setActiveIngredient,
    clearConstructor
} = actions;

export default reducer;
