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

    if (!isReady)
        return (
            <>
                {fallback ?? (
                    <p className="text text_type_main-default text_color_inactive mt-20 ml-20">
                        Осуществляется вход, ожидайте...
                    </p>
                )}
            </>
        );

    if (!isAllowed) {
        return <Navigate to={redirectionPath} state={{ from: location }} replace />;
    }

    return <>{children ?? <Outlet />}</>;
};

export default ProtectedRoute;
