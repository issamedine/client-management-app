import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../common/components/Button/Button';
import { authService } from '../services/authService';
import styles from './Navbar.module.scss';  // Import the SCSS module

/**
 * Main navigation bar component handling authentication state and role-based rendering.
 * 
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 * 
 * @description
 * This component handles:
 * - Conditional rendering based on user authentication state
 * - Role-based navigation items (ADMIN access)
 * - User logout functionality
 * - Dynamic navigation links (login/signup vs profile/logout)
 * - Integration with Redux for user state management
 * - Usage of reusable Button component for consistent styling
 * 
 * @returns {JSX.Element} Navigation bar with dynamic content based on user state
 * 
 * @see {@link Button} For the logout button styling
 * @see {@link authService} For logout implementation details
 */
const Navbar = () => {
    /**
     * Current user object from Redux store
     * @type {Object}
     */
    const user = useSelector((state) => state.user.user);

    /**
     * Current user role from Redux store
     * @type {string}
     */
    const role = useSelector((state) => state.user.role);

    /**
     * Navigation hook for programmatic routing
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * Handles user logout process
     * @async
     * @function
     * @throws {Error} Logs error to console if logout fails
     */
    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftside}>
                {/* Main navigation links */}
                <Link to="/" className={styles.navLink}>Home</Link>

                {/* Admin-only link */}
                {user && role === 'ADMIN' && <Link to="/admin" className={styles.navLink}>Admin</Link>}

                <Link to="/clients" className={styles.navLink}>Clients</Link>
            </div>

            <div className={styles.authLinks}>
                {!user ? (
                    // Unauthenticated user menu
                    <>
                        <Link to="/signup" className={styles.navLink}>Create Account</Link>
                        <Link to="/login" className={styles.navLink}>Login</Link>
                    </>
                ) : (
                    // Authenticated user menu
                    <>
                        <span className={styles.roleLabel}>Role: {role}</span>
                        <Button
                            onClick={handleLogout}
                            variant="secondary"
                            aria-label="Logout button"
                            className={styles.button}  // Apply button styles
                        >
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
