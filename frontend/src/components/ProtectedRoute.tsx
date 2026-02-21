import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
    roles?: string[];
}

export const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {

    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(role!)) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};
