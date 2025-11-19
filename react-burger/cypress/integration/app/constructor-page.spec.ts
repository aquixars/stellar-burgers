import { API_URL } from "../../../src/utils/api";

const SELECTORS = {
    ingredientCard: "[class^=burger-ingredients_burgerIngredient__]",
    constructorRoot: "[class^=burger-constructor_root__]",
    ingredientModal: "#ingredientModal",
    ingredientModalCloseButton: "#ingredientModal button",
    modalCloseButton: "[class^=modal_closeButton]"
};

describe("Constructor page works correctly", () => {
    beforeEach(() => {
        cy.intercept("POST", `${API_URL}/orders`).as("postOrder");
        cy.intercept("POST", `${API_URL}/auth/login`).as("login");
        cy.intercept("GET", `${API_URL}/auth/user`).as("getUserInfo");
        cy.intercept("GET", `${API_URL}/ingredients`).as("getIngredients");
        cy.intercept("POST", `${API_URL}/auth/token`).as("refreshToken");

        cy.visit("/login");
        cy.get("[name^=email]").type("akilum@yandex.ru");
        cy.get("[name^=password]").type("1122");
        cy.contains("button", "Войти").click();
        cy.wait("@login");
    });

    it("should open ingredients popup", () => {
        cy.visit("/");

        // Ждём, пока загрузятся ингредиенты
        cy.wait("@getIngredients");

        // Кликаем по первому ингредиенту
        cy.get(SELECTORS.ingredientCard).first().click();

        // Проверяем, что модалка открылась
        cy.get(SELECTORS.ingredientModal).should("be.visible");

        // Закрываем модалку
        cy.get(SELECTORS.ingredientModalCloseButton).click();
        cy.get(SELECTORS.ingredientModal).should("not.exist");
    });

    it("constructor should work", () => {
        cy.visit("/");
        cy.wait("@refreshToken");

        cy.get(SELECTORS.ingredientCard).contains("Мясо").first().as("main");

        cy.get(SELECTORS.ingredientCard).contains("булка").first().as("bun");

        cy.get(SELECTORS.constructorRoot).as("constructor");
        cy.contains("button", "Оформить заказ").as("submit");

        cy.get("@bun").trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@main").trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@submit").click().wait("@postOrder");
        cy.get(SELECTORS.modalCloseButton).click();
    });
});

export {};
