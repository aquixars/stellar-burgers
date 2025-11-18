import { createReducer, PayloadAction, createAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const WS_ORDER_ACTIONS = {
    wsInit: "wsOrder/init",
    wsInitWithCustomUrl: "wsOrder/wsInitWithCustomUrl",
    wsSendMessage: "wsOrder/sendMessage",
    wsClose: "wsOrder/close",
    onOpen: "wsOrder/onOpen",
    onClose: "wsOrder/onClose",
    onError: "wsOrder/onError",
    onMessage: "wsOrder/onMessage"
};

export type TModifiedIngredient = {
    id: string;
    img: string;
    name: string;
    price: number;
    qty: number;
};

export type TOrder = {
    _id: string;
    status: "pending" | "done";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string[];

    price?: number;
    modifiedIngredients?: TModifiedIngredient[];
};

interface IWsOrdersState {
    orders: TOrder[] | undefined;
    total: number | undefined;
    totalToday: number | undefined;
}

const initialState: IWsOrdersState = {
    orders: undefined,
    total: undefined,
    totalToday: undefined
};

export const updateOrders = createAction<TOrder[]>("updateOrders");

const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateOrders, (state, action: PayloadAction<TOrder[]>) => {
            state.orders = action.payload;
        })
        .addCase(WS_ORDER_ACTIONS.onMessage, (state, action: PayloadAction<IWsOrdersState>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
        .addCase(WS_ORDER_ACTIONS.onClose, () => initialState);
});

export const selectOrders = (state: RootState) => {
    return state.wsOrders.orders;
};
export const selectOrderById = (id: string) => (state: RootState) => {
    return state.wsOrders.orders?.find((o) => o._id === id);
};
export const selectStats = (state: RootState) => {
    const { total, totalToday } = state.wsOrders;
    return { total, totalToday };
};

export default counterReducer;
