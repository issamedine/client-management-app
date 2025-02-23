import { signIn, signOut, signUp } from '../api/authApi';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { store } from '../redux/store';

/**
 * AuthService is a service that handles authentication actions such as login, registration, and logout.
 */
export const authService = {

    /**
     * Logs in the user with provided email and password.
     * Dispatches the user data and role to the Redux store upon successful login.
     * 
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} Resolves when the login is successful.
     */
    login: async (email, password) => {
        const data = await signIn(email, password);
        store.dispatch(setUser({ user: data.user, role: data.role }));
    },

    /**
     * Registers a new user with the provided email, password, and role.
     * Dispatches the user data and role to the Redux store upon successful registration.
     * 
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {string} role - The user's role (e.g., admin, user).
     * @returns {Promise<void>} Resolves when the registration is successful.
     */
    register: async (email, password, role) => {
        const data = await signUp(email, password, role);
        store.dispatch(setUser({ user: data.user, role }));
    },

    /**
     * Logs out the user and clears user data from the Redux store.
     * 
     * @returns {Promise<void>} Resolves when the user has been logged out.
     */
    logout: async () => {
        await signOut();
        store.dispatch(clearUser());
    }
}
