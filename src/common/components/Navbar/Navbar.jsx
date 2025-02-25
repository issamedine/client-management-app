import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { authService } from '../../../services/authService';
import styles from './Navbar.module.scss';  // Import the SCSS module
import { setPendingClients, addPendingClient, removePendingClient } from '../../../redux/slices/clientsSlice';
import { supabase } from '../../../api/supabaseClient';
import { clientsService } from '../../../services/clientsService';
import { formatDistanceToNow } from 'date-fns';
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
    const dispatch = useDispatch();
    /**
     * Current user object from Redux store
     * @type {Object}
     */
    const user = useSelector((state) => state.user.user);
    const pendingClients = useSelector((state) => state.clients.pendingClients);

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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleValidation = useCallback(
        async (input, isValid) => {
            try {
                const operation = isValid ? clientsService.validateClient : clientsService.rejectClient;
                await operation(typeof input === 'object' ? input : { id: input });
                dispatch(removePendingClient(input.id));
            } catch (error) {
                console.error(`Error ${isValid ? 'validating' : 'rejecting'} client:`, error);
            }
        },
        []
    );

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchPendingClients = async () => {
            try {
                const clients = await clientsService.getPendingClients();
                dispatch(setPendingClients(clients));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        const subscription = supabase
            .channel('realtime-pending')
            .on('postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'clientstemp'
                },
                (payload) => {
                    dispatch(addPendingClient(payload.new));
                })
            .subscribe();

        fetchPendingClients();

        return () => supabase.removeChannel(subscription);
    }, [dispatch]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.leftside}>
                <Link to="/" className={styles.navLink}>Home</Link>
                {user && role === 'ADMIN' && <Link to="/admin" className={styles.navLink}>Admin</Link>}
                <Link to="/clients" className={styles.navLink}>Clients</Link>
            </div>

            <div className={styles.authLinks}>
                {user ? (
                    <>
                        {/* Notification Icon and Dropdown */}
                        {role === 'ADMIN' && <div className={styles.notificationWrapper} ref={dropdownRef}>
                            <button
                                className={styles.notificationIcon}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-label="Notifications"
                                aria-expanded={isDropdownOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                {pendingClients.length > 0 && (
                                    <span className={styles.notificationBadge}>{pendingClients.length}</span>
                                )}
                            </button>

                            {/* Dropdown Content */}
                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div className={styles.dropdownHeader}>
                                        <h4>Notifications</h4>
                                        <span className={styles.notificationCount}>{pendingClients.length} new</span>
                                    </div>
                                    <div className={styles.dropdownContent}>
                                        {pendingClients.map((notification) => (
                                            <div key={notification.id} className={styles.notificationItem}>
                                                <div className={styles.notificationContent}>
                                                    <p className={styles.notificationText}>{notification.text}</p>
                                                    <small className={styles.notificationDate}>
                                                        {formatDistanceToNow(new Date(notification.created_at), {
                                                            addSuffix: true
                                                        })}
                                                    </small>
                                                </div>
                                                <div className={styles.notificationActions}>
                                                    <button
                                                        onClick={() => handleValidation(notification, true)}
                                                        className={styles.acceptButton}
                                                        aria-label="Valider la notification"
                                                    >
                                                        Valider
                                                    </button>
                                                    <button
                                                        onClick={() => handleValidation(notification, false)}
                                                        className={styles.rejectButton}
                                                        aria-label="Rejeter la notification"
                                                    >
                                                        Rejeter
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {pendingClients.length === 0 && (
                                            <p className={styles.emptyState}>No new notifications</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>}

                        <span className={styles.roleLabel}>Role: {role}</span>
                        <Button
                            onClick={handleLogout}
                            variant="secondary"
                            className={styles.button}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className={styles.navLink}>Create Account</Link>
                        <Link to="/login" className={styles.navLink}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
