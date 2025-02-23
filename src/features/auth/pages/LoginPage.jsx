import React from 'react';
import Login from '../components/Login';

/**
 * Login page container component.
 * 
 * @component
 * @example
 * return (
 *   <LoginPage />
 * )
 * 
 * @description
 * This page component provides:
 * - Page layout structure for the login interface
 * - Consistent heading for the login section
 * - Container for the Login form component
 * 
 * @returns {JSX.Element} Login page layout with authentication form
 * 
 * @see {@link Login} For the login form implementation
 * @see {@link authService} For authentication logic
 */
const LoginPage = () => (
    <div className="auth-page">
        <h1 className="page-header">User Login</h1>
        <Login />
    </div>
);

export default LoginPage;