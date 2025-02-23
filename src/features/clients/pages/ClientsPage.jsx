import React from 'react';
import ClientList from '../components/ClientList';

/**
 * ClientsPage Component
 * 
 * Displays the list of client records.
 * 
 * @component
 * @returns {JSX.Element} The rendered ClientsPage component.
 */
const ClientsPage = () => (
    <div>
        <h1>Clients</h1>
        <ClientList />
    </div>
);

export default ClientsPage;
