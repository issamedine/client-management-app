import React from 'react';
import EditClientForm from '../components/EditClientForm';

/**
 * EditClientPage Component
 * 
 * Displays a form to edit an existing client record.
 * 
 * @component
 * @returns {JSX.Element} The rendered EditClientPage component.
 */
const EditClientPage = () => (
    <div>
        <h1>Edit Client</h1>
        <EditClientForm />
    </div>
);

export default EditClientPage;
