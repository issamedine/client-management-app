import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import Navbar from '../components/Navbar';
import AppRoutes from './AppRoutes';
import './App.scss';

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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;