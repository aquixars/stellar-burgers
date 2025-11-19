import reducer, { initialState, openOrderPopup, closeOrderPopup, postOrderThunk } from "./order";

describe("orders reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "test" })).toEqual(initialState);
    });
    it("should handle openOrderPopup", () => {
        expect(reducer(initialState, openOrderPopup())).toEqual({
            ...initialState,
            isOrderPopupOpen: true
        });
    });
    it("should handle closeOrderPopup", () => {
        expect(reducer(initialState, closeOrderPopup())).toEqual({
            ...initialState,
            isOrderPopupOpen: false
        });
    });

    describe("should handle postOrderThunk", () => {
        it("should handle postOrderThunk.pending", () => {
            const action = { type: postOrderThunk.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                orderDetailsLoading: true
            });
        });

        it("should handle postOrderThunk.fulfilled", () => {
            const orderDetails = {
                name: "some name",
                order: {
                    number: 1
                },
                success: true
            };
            const action = {
                type: postOrderThunk.fulfilled.type,
                payload: orderDetails
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                orderDetails
            });
        });

        it("should handle postOrderThunk.rejected", () => {
            const action = { type: postOrderThunk.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                orderDetailsError: true
            });
        });
    });
});
