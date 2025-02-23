// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * PrivateRoute Component
 * 
 * A route protection component that ensures the user is authenticated before accessing protected routes.
 * If the user is authenticated, it renders the child routes (Outlet).
 * If the user is not authenticated, it redirects to the login page ("/login").
 * 
 * @component
 * @returns {JSX.Element} The rendered component, either the child routes or a redirection to the login page.
 */
const PrivateRoute = () => {
    const user = useSelector((state) => state.user.user);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
