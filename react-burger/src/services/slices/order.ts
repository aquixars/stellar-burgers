import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../utils/api";
import { RootState } from "../store";

type TOrderDetails = {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
};

interface IOrderState {
    orderDetails: TOrderDetails;
    orderDetailsLoading: boolean;
    orderDetailsError: boolean;
    isOrderPopupOpen: boolean;
}

const initialState: IOrderState = {
    orderDetails: {
        name: "",
        order: {
            number: -1
        },
        success: false
    },
    orderDetailsLoading: false,
    orderDetailsError: false,
    isOrderPopupOpen: false
};

export const fetchOrder = createAsyncThunk("order/postOrder", (ingredients: string[]) => {
    return postOrder({ ingredients });
});
export const order = createSlice({
    name: "order",
    initialState,
    reducers: {
        openOrderPopup: (state) => {
            state.isOrderPopupOpen = true;
        },
        closeOrderPopup: (state) => {
            state.isOrderPopupOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state) => {
            state.orderDetailsLoading = true;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.orderDetails = action.payload;
            state.orderDetailsLoading = false;
            state.orderDetailsError = false;
        });
        builder.addCase(fetchOrder.rejected, (state) => {
            state.orderDetailsError = true;
        });
    }
});

export const selectOrderDetails = (state: RootState) => {
    return state.order.orderDetails;
};
export const selectOrderLoading = (state: RootState) => {
    return state.order.orderDetailsLoading;
};
export const selectIsOrderPopupOpen = (state: RootState) => {
    return state.order.isOrderPopupOpen;
};

const { actions, reducer } = order;

export const { openOrderPopup, closeOrderPopup } = actions;

export default reducer;
