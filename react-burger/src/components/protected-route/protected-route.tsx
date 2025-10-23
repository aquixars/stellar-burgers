// components/protected-route/protected-route.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
    isAllowed: boolean;
    isReady: boolean;
    redirectionPath: string;
    fallback?: React.ReactNode;
    children?: React.ReactNode;
};

const ProtectedRoute = ({ isAllowed, isReady, redirectionPath, fallback = null, children }: Props) => {
    const location = useLocation();

    if (!isReady) return <>{fallback}</>; // ждём завершения автологина

    if (!isAllowed) {
        return <Navigate to={redirectionPath} state={{ from: location }} replace />;
    }

    return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
