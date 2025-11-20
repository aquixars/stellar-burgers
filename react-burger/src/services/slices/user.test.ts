import reducer, {
    initialState,
    allowPasswordReset,
    restrictPasswordReset,
    register,
    login,
    refreshToken,
    logout,
    getUser,
    patchUser
} from "./user";

describe("user reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "test" })).toEqual(initialState);
    });
    it("should handle allowPasswordReset", () => {
        expect(reducer(initialState, allowPasswordReset())).toEqual({
            ...initialState,
            canResetPassword: true
        });
    });
    it("should handle restrictPasswordReset", () => {
        expect(reducer(initialState, restrictPasswordReset())).toEqual({
            ...initialState,
            canResetPassword: false
        });
    });

    describe("should handle register thunk", () => {
        it("should handle register.pending", () => {
            const action = { type: register.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle register.fulfilled", () => {
            const mock = {
                accessToken: "some-token",
                user: { name: "some-name", email: "some-email" }
            };
            const action = {
                type: register.fulfilled.type,
                payload: mock
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                accessToken: mock.accessToken,
                user: mock.user,
                isAuthenticated: true
            });
        });
        it("should handle register.rejected", () => {
            const action = { type: register.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });

    describe("should handle login thunk", () => {
        it("should handle login.pending", () => {
            const action = { type: login.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle login.fulfilled", () => {
            const mock = {
                accessToken: "some-token",
                user: { name: "some-name", email: "some-email" }
            };
            const action = {
                type: login.fulfilled.type,
                payload: mock
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                accessToken: mock.accessToken,
                user: mock.user,
                isAuthenticated: true
            });
        });
        it("should handle login.rejected", () => {
            const action = { type: login.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });

    describe("should handle refreshToken thunk", () => {
        it("should handle refreshToken.pending", () => {
            const action = { type: refreshToken.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle refreshToken.fulfilled", () => {
            const mock = {
                accessToken: "some-token"
            };
            const action = {
                type: refreshToken.fulfilled.type,
                payload: mock
            };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                accessToken: mock.accessToken,
                isAuthenticated: true
            });
        });
        it("should handle refreshToken.rejected", () => {
            const action = { type: refreshToken.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });

    describe("should handle logout thunk", () => {
        it("should handle logout.pending", () => {
            const action = { type: logout.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle logout.fulfilled", () => {
            const prevState = {
                ...initialState,
                isAuthenticated: true,
                accessToken: "some-token",
                user: { name: "some-name", email: "some-email" }
            };
            const action = {
                type: logout.fulfilled.type
            };
            expect(reducer(prevState, action)).toEqual(initialState);
        });
        it("should handle logout.rejected", () => {
            const action = { type: logout.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });

    describe("should handle getUser thunk", () => {
        it("should handle getUser.pending", () => {
            const action = { type: getUser.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle getUser.fulfilled", () => {
            const user = { name: "some-name", email: "some-email" };
            const action = {
                type: getUser.fulfilled.type,
                payload: user
            };
            expect(reducer(initialState, action)).toEqual({ ...initialState, user });
        });
        it("should handle getUser.rejected", () => {
            const action = { type: getUser.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });

    describe("should handle patchUser thunk", () => {
        it("should handle patchUser.pending", () => {
            const action = { type: patchUser.pending.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });
        it("should handle patchUser.fulfilled", () => {
            const user = { name: "some-name", email: "some-email" };
            const action = {
                type: patchUser.fulfilled.type,
                payload: user
            };
            expect(reducer(initialState, action)).toEqual({ ...initialState, user });
        });
        it("should handle patchUser.rejected", () => {
            const action = { type: patchUser.rejected.type };
            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                error: true
            });
        });
    });
});
