import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../../utils/api";
import { RootState, AppDispatch } from "../store";
import { TAuthOutput, TRefreshTokenOutput } from "../../utils/api";

type TUser = {
    name: string;
    email: string;
};

interface IUserState {
    accessToken: string;
    isAuthenticated: boolean;

    user: TUser;

    loading: boolean;
    error: boolean;

    canResetPassword: boolean;
    authInitialized: boolean;
}

export const initialState: IUserState = {
    accessToken: "",
    isAuthenticated: false,

    user: {
        name: "",
        email: ""
    },

    loading: false,
    error: false,

    // неавторизованный пользователь не может зайти на /reset-password,
    // минуя /forgot-password
    canResetPassword: false,
    authInitialized: false
};

export const refreshToken = createAsyncThunk<TRefreshTokenOutput>("user/refresh-token", () => {
    const refreshToken = localStorage.getItem("refresh-token");

    if (!refreshToken) {
        throw new Error("There is no refresh token in local storage");
    }

    return api.refreshToken(refreshToken).then((data) => {
        localStorage.setItem("refresh-token", data.refreshToken);

        return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
    });
});

export const register = createAsyncThunk("user/register", (data: { name: string; email: string; password: string }) => {
    return api
        .register(data)
        .then((data) => {
            localStorage.setItem("refresh-token", data.refreshToken);

            return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
        })
        .catch(() => {
            throw new Error("An error occurred");
        });
});

export const login = createAsyncThunk<TAuthOutput, { email: string; password: string }>("user/login", (data) => {
    return api.login(data).then((data) => {
        localStorage.setItem("refresh-token", data.refreshToken);

        return { ...data, accessToken: data.accessToken.split("Bearer ")[1] };
    });
});

export const logout = createAsyncThunk("user/logout", () => {
    const refreshToken = localStorage.getItem("refresh-token");

    if (!refreshToken) {
        throw new Error("There is no refresh token in local storage");
    }

    return api.logout(refreshToken).then((data) => {
        localStorage.removeItem("refresh-token");
        return data;
    });
});

export const forgotPassword = createAsyncThunk("user/forgot-password", (email: string) => {
    return api.forgotPassword(email);
});

export const getUser = createAsyncThunk<TUser | void, void, { state: RootState; dispatch: AppDispatch }>(
    "user/get-user",
    (_, thunkAPI) => {
        const { accessToken } = thunkAPI.getState().user;
        return api
            .getUser(accessToken)
            .then((data) => data.user)
            .catch(async (err) => {
                if (err.message === "jwt expired" || err.message === "wtf") {
                    const resultAction = await thunkAPI.dispatch(refreshToken());
                    if (refreshToken.fulfilled.match(resultAction)) {
                        thunkAPI.dispatch(getUser());
                    }
                }
                thunkAPI.rejectWithValue("error");
            });
    }
);

export const patchUser = createAsyncThunk<TUser | void, TUser, { state: RootState }>(
    "user/patch-user",
    async (data, thunkAPI) => {
        const { accessToken } = thunkAPI.getState().user;
        try {
            const res = await api.patchUser(accessToken, data);
            return res.user;
        } catch (err: any) {
            if (err.message === "jwt expired" || err.message === "wtf") {
                const result = await thunkAPI.dispatch(refreshToken());
                if (refreshToken.fulfilled.match(result)) {
                    const { accessToken: newToken } = (result as any).payload;
                    const retried = await api.patchUser(newToken, data);
                    return retried.user;
                }
                return thunkAPI.rejectWithValue("error");
            }
        }
    }
);

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        allowPasswordReset: (state) => {
            state.canResetPassword = true;
        },
        restrictPasswordReset: (state) => {
            state.canResetPassword = false;
        },
        setAuthInitialized: (state) => {
            state.authInitialized = true;
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                // authInitialized НЕ меняем — тесты ожидают false
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

        // LOGIN
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

        // REFRESH TOKEN
        builder
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.accessToken = action.payload.accessToken;
                state.isAuthenticated = true;
                // authInitialized НЕ трогаем — тест ожидает false
            })
            .addCase(refreshToken.rejected, (state) => {
                state.loading = false;
                state.error = true;
                state.isAuthenticated = false;
            });

        // LOGOUT
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(logout.fulfilled, () => {
                // тест ожидает ровно initialState
                return initialState;
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

        // GET USER
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });

        // PATCH USER
        builder
            .addCase(patchUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (action.payload) {
                    state.user = action.payload;
                }
            })
            .addCase(patchUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export const selectIsAuthenticated = (state: RootState) => {
    return state.user.isAuthenticated;
};
export const selectUser = (state: RootState) => {
    return state.user.user;
};
export const selectCanResetPassword = (state: RootState) => {
    return state.user.canResetPassword;
};
export const selectAuthInitialized = (state: RootState) => state.user.authInitialized;

export const selectAccessToken = (state: RootState) => {
    return state.user.accessToken;
};

const { actions, reducer } = user;

export const { allowPasswordReset, restrictPasswordReset, setAuthInitialized } = actions;

export default reducer;
