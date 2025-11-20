import { TIngredient } from "../components/app/app.typed";
import { TOrder } from "../services/slices/ws-orders";

export const API_URL = "https://norma.education-services.ru/api";

export const getResponseData = async <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json() as Promise<T>;
    }

    const data = await res.json();
    if (data.message === "jwt expired") {
        return Promise.reject(new Error("jwt expired"));
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

type TRegisterInput = {
    email: string;
    password: string;
    name: string;
};
export type TAuthOutput = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
};
export const register = (data: TRegisterInput) => {
    return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((res) => getResponseData<TAuthOutput>(res));
};

type TLoginInput = {
    email: string;
    password: string;
};
export const login = (data: TLoginInput) => {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((res) => getResponseData<TAuthOutput>(res));
};

export type TRefreshTokenOutput = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};
export const refreshToken = (refreshToken: string) => {
    return fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: refreshToken })
    }).then((res) => getResponseData<TRefreshTokenOutput>(res));
};

type TGetUserOutput = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
};
export const getUser = (accessToken: string) => {
    return fetch(`${API_URL}/auth/user`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    }).then((res) => getResponseData<TGetUserOutput>(res));
};

type TPatchUserOutput = TGetUserOutput;
export const patchUser = (accessToken: string, data: { name: string; email: string }) => {
    return fetch(`${API_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    }).then((res) => getResponseData<TPatchUserOutput>(res));
};

export const logout = (refreshToken: string) => {
    return fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: refreshToken })
    }).then(getResponseData);
};

export const forgotPassword = (email: string) => {
    return fetch(`${API_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    }).then(getResponseData);
};

export const resetPassword = (data: { password: string; token: string }) => {
    return fetch(`${API_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(getResponseData);
};

type TGetIngredientsOutput = { data: TIngredient[]; success: boolean };
export const getIngredients = () =>
    fetch(`${API_URL}/ingredients`).then((res) => getResponseData<TGetIngredientsOutput>(res));

export type TPostOrderOutput = {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
};
export const postOrder = (ingredients: { ingredients: string[] }, token?: string) => {
    let url = `${API_URL}/orders`;
    return fetch(url, {
        body: JSON.stringify(ingredients),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res) => getResponseData<TPostOrderOutput>(res));
};

export type TGetOrdersOutput = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};
export const fetchOrders = (token?: string) => {
    let url = `${API_URL}/orders/all`;
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res) => getResponseData<TGetOrdersOutput>(res));
};
