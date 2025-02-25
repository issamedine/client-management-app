import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import Navbar from '../common/components/Navbar/Navbar';
import AppRoutes from './AppRoutes';
import './App.scss';
import { clientsService } from '../services/clientsService';
import { addNotification, addPendingClient, setPendingClients } from '../redux/slices/clientsSlice';
import { supabase } from '../api/supabaseClient';
import Notification from '../common/components/Notification/Notification';

/**
 * Root application component that wraps all providers and routing configuration.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 * 
 * @description
 * This main component performs the following tasks:
 * - Provides Redux store to the entire application via Provider component
 * - Handles data persistence with Redux Persist through PersistGate
 * - Configures application routing with React Router
 * - Displays the common navigation bar across all pages
 * - Manages rendering of main routes via AppRoutes component
 * 
 * @returns {JSX.Element} The JSX structure of the application with all providers and routing setup
 */
function App() {
  const dispatch = useDispatch();

  /**
     * Current user role from Redux store
     * @type {string}
     */
  const role = useSelector((state) => state.user.role);

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

          // Ajouter une notification pour ce nouvel élément
          const notification = {
            id: payload.new.id,
            title: payload.new.title,
            text: payload.new.text,
            created_at: payload.new.created_at,
            seen: false
          };
          dispatch(addNotification(notification));

        })
      .subscribe();

    fetchPendingClients();

    return () => supabase.removeChannel(subscription);
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {role === 'ADMIN' && <Notification />}
          <Navbar />
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;