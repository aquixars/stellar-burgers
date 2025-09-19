import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";

export const store = configureStore({
    reducer: { ingredients: ingredientsReducer, order: orderReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
