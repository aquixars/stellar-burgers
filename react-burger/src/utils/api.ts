const API_URL = "https://norma.education-services.ru/api";

export const getResponseData = async (res: Response) => {
    if (res.ok) {
        return res.json();
    }

    const data = await res.json();
    if (data.message === "jwt expired") {
        return Promise.reject(new Error("jwt expired"));
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const getIngredients = () => fetch(`${API_URL}/ingredients`).then(getResponseData);

export const postOrder = (ingredients: { ingredients: string[] }) =>
    fetch(`${API_URL}/orders`, {
        body: JSON.stringify(ingredients),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(getResponseData);

export const register = (data: { email: string; password: string; name: string }) => {
    return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(getResponseData);
};

export const login = (data: { email: string; password: string }) => {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(getResponseData);
};

export const refreshToken = (refreshToken: string) => {
    return fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: refreshToken })
    }).then(getResponseData);
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

export const getUser = (accessToken: string) => {
    return fetch(`${API_URL}/auth/user`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    }).then(getResponseData);
};

export const patchUser = (accessToken: string, data: { name: string; email: string }) => {
    return fetch(`${API_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    }).then(getResponseData);
};
