// src/components/app/app.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";

import { ForgotPassword, Login, Main, NotFound, Profile, Register, ResetPassword } from "../../pages";

import OrdersFeed from "../../pages/orders-feed/orders-feed";
import OrderDetails from "../../pages/order-details/order-details";
import OrdersList from "../../pages/orders-list/orders-list";
import Layout from "../layout/layout";

import AdvancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

import { fetchIngredients } from "../../services/slices/ingredients";

import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
    selectIsAuthenticated,
    selectCanResetPassword,
    selectAuthInitialized,
    refreshToken,
    getUser,
    setAuthInitialized
} from "../../services/slices/user";

import AppHeader from "../app-header/app-header";

type LocState = { background?: Location } | null;

dayjs.extend(AdvancedFormat);

const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const state = (location.state as LocState) || null;
    const background = state?.background;

    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const canResetPassword = useAppSelector(selectCanResetPassword);
    const authReady = useAppSelector(selectAuthInitialized);

    useEffect(() => {
        (async () => {
            // грузим список ингредиентов
            await dispatch(fetchIngredients());

            try {
                // пробуем обновить токен
                const rt = await dispatch(refreshToken());
                if (refreshToken.fulfilled.match(rt)) {
                    // если токен обновился — тянем юзера
                    await dispatch(getUser());
                }
            } finally {
                // в любом случае (успех/ошибка) считаем авторизацию инициализированной
                dispatch(setAuthInitialized());
            }
        })();
    }, [dispatch]);

    const onModalClose = (href: string) => {
        navigate(href);
    };

    return (
        <>
            <AppHeader />

            {/* ОСНОВНЫЕ СТРАНИЦЫ (фон или обычный роут) */}
            <Routes location={background || location}>
                {/* публичная главная */}
                <Route path="/" element={<Main />} />

                {/* гостевые страницы: логин, регистрация, восстановление пароля */}
                <Route
                    element={
                        <ProtectedRoute
                            isAllowed={!isAuthenticated} // если уже залогинен — редирект на /
                            isReady={authReady}
                            redirectionPath="/"
                            fallback={null}
                        />
                    }>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {/* страница сброса пароля, доступна только если canResetPassword === true */}
                <Route
                    element={
                        <ProtectedRoute
                            isAllowed={canResetPassword}
                            isReady={authReady}
                            redirectionPath="/"
                            fallback={null}
                        />
                    }>
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* приватные страницы профиля */}
                <Route
                    element={
                        <ProtectedRoute
                            isAllowed={isAuthenticated} // только авторизованные
                            isReady={authReady}
                            redirectionPath="/login"
                            fallback={null}
                        />
                    }>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/orders" element={<OrdersList />} />
                </Route>

                {/* детальная страница заказа в профиле (как отдельная страница, не модалка) */}
                <Route
                    path="/profile/orders/:number"
                    element={
                        <ProtectedRoute
                            isAllowed={isAuthenticated}
                            isReady={authReady}
                            redirectionPath="/login"
                            fallback={null}>
                            <Layout>
                                <OrderDetails />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* детальная страница заказа из фида (как отдельная страница, не модалка) */}
                <Route
                    path="/feed/:number"
                    element={
                        <Layout>
                            <OrderDetails />
                        </Layout>
                    }
                />

                {/* общий фид заказов */}
                <Route path="/feed" element={<OrdersFeed />} />

                {/* детальная страница ингредиента как обычная страница */}
                <Route path="/ingredients/:id" element={<IngredientDetails />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* МОДАЛКИ — РЕНДЕРИМ ТОЛЬКО ЕСЛИ ЕСТЬ background */}
            {background && (
                <Routes>
                    {/* модалка заказа из профиля */}
                    <Route
                        path="/profile/orders/:number"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/profile/orders")}>
                                <OrderDetails />
                            </Modal>
                        }
                    />

                    {/* модалка заказа из фида */}
                    <Route
                        path="/feed/:number"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/feed")}>
                                <OrderDetails />
                            </Modal>
                        }
                    />

                    {/* модалка ингредиента */}
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/")} id="ingredientModal">
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
