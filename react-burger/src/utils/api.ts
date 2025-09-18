const API_URL = "https://norma.nomoreparties.space/api";

export const getResponseData = (res: Response) => {
    if (res.ok) {
        return res.json();
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
