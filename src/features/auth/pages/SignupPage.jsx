import React from 'react';
import Signup from '../components/SignUp';

/**
 * User registration page container component.
 * 
 * @component
 * @example
 * return (
 *   <SignupPage />
 * )
 * 
 * @description
 * This page component provides:
 * - Page layout structure for registration interface
 * - Consistent heading for the signup section
 * - Container for the Signup form component
 * 
 * @returns {JSX.Element} Registration page layout with account creation form
 * 
 * @see {@link Signup} For the registration form implementation
 * @see {@link authService} For account creation logic
 */
const SignupPage = () => (
    <div className="auth-page">
        <h1 className="page-header">Create Account</h1>
        <Signup />
    </div>
);

export default SignupPage;