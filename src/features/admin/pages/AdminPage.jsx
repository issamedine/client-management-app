import React from 'react';
import AdminPanel from '../components/AdminPanel';

/**
 * Administration page container component.
 * 
 * @component
 * @example
 * return (
 *   <AdminPage />
 * )
 * 
 * @description
 * This page component serves as the main administration interface container.
 * It provides:
 * - Page layout structure for admin features
 * - Integration point for administrative components
 * - Consistent page heading for admin section
 * 
 * @returns {JSX.Element} Administration page layout with child components
 * 
 * @see {@link AdminPanel} For the main administration functionality implementation
 */
const AdminPage = () => (
    <div className="admin-page">
        <h1>Administration Dashboard</h1>
        <AdminPanel />
    </div>
);

export default AdminPage;