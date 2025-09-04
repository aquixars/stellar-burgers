export const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export const getResponseData = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
};
