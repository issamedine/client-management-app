import React from 'react';

/**
 * MainLayout Component
 * 
 * A layout component for the main sections of the application.
 * It wraps the children components passed to it, providing a base structure for the main content.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the layout.
 * @returns {JSX.Element} The rendered MainLayout component.
 */
const MainLayout = ({ children }) => (
    <main>{children}</main>
);

export default MainLayout;
