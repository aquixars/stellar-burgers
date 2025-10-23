import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";

import { ForgotPassword, IngredientPage, Login, Main, NotFound, Profile, Register, ResetPassword } from "../../pages";
import OrdersFeed from "../../pages/orders-feed/orders-feed";

import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchIngredients } from "../../services/slices/ingredients";
import {
    selectIsAuthenticated,
    selectCanResetPassword,
    selectAuthInitialized,
    refreshToken,
    getUser
} from "../../services/slices/user";

type LocState = { background?: Location } | null;

const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const state = (location.state as LocState) || null;
    const background = state?.background;

    const isAuth = useAppSelector(selectIsAuthenticated);
    const canReset = useAppSelector(selectCanResetPassword);

    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const canResetPassword = useAppSelector(selectCanResetPassword);
    const authReady = useAppSelector(selectAuthInitialized);

    useEffect(() => {
        (async () => {
            await dispatch(fetchIngredients());
            const rt = await dispatch(refreshToken());
            if (refreshToken.fulfilled.match(rt)) dispatch(getUser());
            // флаг authInitialized выставится в extraReducers
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(fetchIngredients()); // грузим список для деталей
            const rt = await dispatch(refreshToken());
            if (refreshToken.fulfilled.match(rt)) dispatch(getUser());
        })();
    }, [dispatch]);

    const closeModal = () => navigate(-1);

    return (
        <>
            {/* СТРАНИЦЫ */}
            <Routes location={background || location}>
                <Route path="/" element={<Main />} />

                <Route
                    element={
                        <ProtectedRoute
                            isAllowed={!isAuthenticated}
                            isReady={authReady}
                            redirectionPath="/"
                            fallback={null}
                        />
                    }>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

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

                <Route
                    element={
                        <ProtectedRoute
                            isAllowed={isAuthenticated}
                            isReady={authReady}
                            redirectionPath="/login"
                            fallback={null}
                        />
                    }>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/orders" element={<OrdersFeed />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* ПОПАПЫ — рендерим только если есть background */}
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal open onClose={closeModal}>
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
