import React from 'react';

/**
 * AuthLayout Component
 * 
 * A layout component specifically for authentication-related pages.
 * It wraps the children components passed to it, such as login or signup forms.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the layout.
 * @returns {JSX.Element} The rendered AuthLayout component.
 */
const AuthLayout = ({ children }) => (
    <main>{children}</main>
);

export default AuthLayout;
