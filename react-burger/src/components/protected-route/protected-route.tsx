// src/components/protected-route/protected-route.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export type ProtectedRouteProps = {
    isAllowed: boolean; // есть ли доступ
    isReady: boolean; // инициализирован ли стейт авторизации
    redirectionPath: string; // куда редиректить, если доступа нет
    fallback?: React.ReactNode; // что показывать, пока не готово
    children?: React.ReactNode;
};

const ProtectedRoute = ({ isAllowed, isReady, fallback = null, children, redirectionPath }: ProtectedRouteProps) => {
    const location = useLocation();

    if (!isReady) {
        return (
            <>
                {fallback ?? (
                    <p className="text text_type_main-default text_color_inactive mt-20 ml-20">
                        Осуществляется вход, ожидайте...
                    </p>
                )}
            </>
        );
    }

    // если доступа нет — отправляем на redirectionPath
    if (!isAllowed) {
        return <Navigate to={redirectionPath} state={{ from: location }} replace />;
    }

    // доступ есть — рендерим детей / вложенные маршруты
    return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
