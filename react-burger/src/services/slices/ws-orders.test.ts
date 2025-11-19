import reducer, { initialState, updateOrders, WS_ORDER_ACTIONS } from "./ws-orders";

const MOCK_ORDERS = [
    {
        _id: "61f2f3e36d7cd8001b2d2a6e",
        ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733c9",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733cf"
        ],
        status: "done",
        name: "Space бессмертный флюоресцентный антарианский бургер",
        createdAt: "2022-01-27T19:34:59.013Z",
        updatedAt: "2022-01-27T19:34:59.251Z",
        number: 8853
    },
    {
        _id: "61f2df7d6d7cd8001b2d2a5a",
        ingredients: [
            "60d3b41abdacab0026a733c7",
            "60d3b41abdacab0026a733cd",
            "60d3b41abdacab0026a733c8",
            "60d3b41abdacab0026a733ce"
        ],
        status: "done",
        name: "Традиционный-галактический space флюоресцентный люминесцентный бургер",
        createdAt: "2022-01-27T18:07:57.927Z",
        updatedAt: "2022-01-27T18:07:58.243Z",
        number: 8852
    },
    {
        _id: "61f2de196d7cd8001b2d2a55",
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733c7"],
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2022-01-27T18:02:01.389Z",
        updatedAt: "2022-01-27T18:02:01.595Z",
        number: 8851
    }
];

describe("wsOrders reducer", () => {
    it("should handle updateOrders", () => {
        const action = { type: updateOrders.type, payload: MOCK_ORDERS };
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            orders: MOCK_ORDERS
        });
    });
    it("should handle wsOrder/onMessage", () => {
        const newState = {
            orders: MOCK_ORDERS,
            total: 10000,
            totalToday: 100
        };
        const action = {
            type: WS_ORDER_ACTIONS.onMessage,
            payload: newState
        };
        expect(reducer(initialState, action)).toEqual(newState);
    });
    it("should handle wsOrder/onClose", () => {
        const prevState = { orders: MOCK_ORDERS, total: 10000, totalToday: 100 };
        const action = { type: WS_ORDER_ACTIONS.onClose };
        expect(reducer(prevState, action)).toEqual(initialState);
    });
});
