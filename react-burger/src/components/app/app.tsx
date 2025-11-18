// src/components/app/app.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";

import {
    ForgotPassword,
    IngredientPage, // если не используется — можно убрать
    Login,
    Main,
    NotFound,
    Profile,
    Register,
    ResetPassword
} from "../../pages";

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
    getUser
} from "../../services/slices/user";

import AppHeader from "../app-header/app-header";

type LocState = { background?: Location } | null;

const App = () => {
    dayjs.extend(AdvancedFormat);

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
            // обновляем токен и, если всё ок, подтягиваем юзера
            const rt = await dispatch(refreshToken());
            if (refreshToken.fulfilled.match(rt)) {
                dispatch(getUser());
            }
        })();
    }, [dispatch]);

    const onModalClose = (href: string) => {
        navigate(href);
    };

    return (
        <>
            <AppHeader />

            {/* СТРАНИЦЫ (фон + обычные) */}
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
                    path="/profile/orders/:id"
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

                {/* общий фид заказов */}
                <Route path="/feed" element={<OrdersFeed />} />

                {/* детальная страница заказа из фида (как отдельная страница, не модалка) */}
                <Route
                    path="/feed/:id"
                    element={
                        <Layout>
                            <OrderDetails />
                        </Layout>
                    }
                />

                {/* детальная страница ингредиента как обычная страница */}
                <Route path="/ingredients/:id" element={<IngredientDetails />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />

                {/* отдельные роуты под модалку для заказов, когда есть background */}
                {background && (
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/profile/orders")}>
                                <OrderDetails style={{ marginTop: 0, minWidth: 640 }} />
                            </Modal>
                        }
                    />
                )}

                {background && (
                    <Route
                        path="/feed/:id"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/feed")}>
                                <OrderDetails style={{ marginTop: 0, minWidth: 640 }} />
                            </Modal>
                        }
                    />
                )}
            </Routes>

            {/* ПОПАПЫ — отдельный <Routes> только для ингредиента, если есть background */}
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal open={true} onClose={() => onModalClose("/")}>
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
