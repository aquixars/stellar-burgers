import React, { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { ForgotPassword, Ingredient, Login, Main, NotFound, Profile, Register, ResetPassword } from "../../pages";
import OrdersFeed from "../../pages/orders-feed/orders-feed";
import ProtectedRoute from "../protected-route/protected-route";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { selectIsAuthenticated, getUser, refreshToken, selectCanResetPassword } from "../../services/slices/user";

const App = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const canResetPassword = useAppSelector(selectCanResetPassword);

    const handleLoad = useCallback(async () => {
        try {
            await dispatch(refreshToken());
            dispatch(getUser());
        } catch {}
    }, [dispatch]);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <Routes>
            <Route path="/" element={<Main />} />

            <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectionPath="/" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route element={<ProtectedRoute isAllowed={canResetPassword} redirectionPath="/" />}>
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            <Route path="/ingredients/:id" element={<Ingredient />} />

            <Route element={<ProtectedRoute isAllowed={isAuthenticated} redirectionPath="/login" />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/orders" element={<OrdersFeed />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
