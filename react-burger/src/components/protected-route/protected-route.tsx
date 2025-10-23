// components/protected-route/protected-route.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
    isAllowed: boolean;
    redirectionPath: string;
    children?: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ isAllowed, redirectionPath, children }) => {
    const location = useLocation();
    if (!isAllowed) return <Navigate to={redirectionPath} state={{ from: location }} replace />;
    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
