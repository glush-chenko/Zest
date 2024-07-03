import React from 'react';
import { Navigate } from 'react-router-dom';
import {isUserLoggedIn} from "../../utils/auth";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isLoggedIn = isUserLoggedIn();

    return isLoggedIn ? (
        <>
            {children}
        </>
    ) : (
        <Navigate to="/login" replace />
    );
};