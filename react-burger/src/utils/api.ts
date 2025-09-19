const API_URL = "https://norma.nomoreparties.space/api";

export const getResponseData = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

function request(url: string, options: any) {
    return fetch(url, options).then(getResponseData);
}

export const postOrder = (ingredients: { ingredients: string[] }) =>
    request(`${API_URL}/orders`, {
        body: JSON.stringify(ingredients),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

export const getIngredients = () => request(`${API_URL}/ingredients`, {});
