import React, { useEffect } from 'react';
import AdminPanel from '../components/AdminPanel';
import styles from './AdminPage.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
const AdminPage = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
  }, [role, navigate]);

  if (role !== 'ADMIN') return null;

  return <div className={styles.adminContainer}>
    <aside className={styles.sidebar}>
      <div className={styles.title_admin}>Admin Dashboard</div>
      <ul>
        <li>Clients</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </aside>
    <main className={styles.content}>
      <h1>Administration Dashboard</h1>
      <AdminPanel />
    </main>
  </div>
};

export default AdminPage;
