import React, { memo } from 'react';
import styles from './Form.module.scss';

/**
 * Wrapper de formulaire avec gestion d'erreur
 * 
 * @component
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre du formulaire
 * @param {Function} props.onSubmit - Gestionnaire de soumission
 * @param {string} [props.error] - Message d'erreur
 * @param {React.ReactNode} props.children - Contenu du formulaire
 * @returns {JSX.Element} Composant de formulaire structuré
 */
const Form = memo(({ title, onSubmit, error, children }) => (
    <form onSubmit={onSubmit} className={styles.form}>
        <h2 data-testid="form-title">{title}</h2>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <div className={styles.fields}>
            {children}
        </div>
    </form>
));

export default Form;