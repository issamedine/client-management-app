import React, { memo } from 'react';
import ClientForm from '../../clients/components/ClientForm';

/**
 * Page d'accueil avec mémoïsation
 * 
 * @component
 * @returns {JSX.Element} Page d'accueil optimisée
 */
const HomePage = memo(() => (
    <div>
        <h1>Accueil</h1>
        <ClientForm />
    </div>
));

export default HomePage;