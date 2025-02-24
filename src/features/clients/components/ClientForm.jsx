import React, { useState, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { clientsService } from '../../../services/clientsService';
import Form from '../../../common/components/Form/Form';
import { Input } from '../../../common/components/Input/Input';
import Button from '../../../common/components/Button/Button';

/**
 * Formulaire client avec mémoïsation et gestion optimisée des soumissions
 * 
 * @component
 * @returns {JSX.Element} Formulaire client optimisé
 */
const ClientForm = memo(() => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const user = useSelector((state) => state.user.user);

    /**
     * Gestionnaire de soumission avec mémoïsation
     * @param {React.FormEvent<HTMLFormElement>} e - Événement de formulaire
     */
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!user) return alert('Vous devez être connecté pour ajouter une fiche client.');

        try {
            await clientsService.subscribeToClients({ title, text, created_by: user.id });
            alert('Fiche client ajoutée avec succès !');
            setTitle('');
            setText('');
        } catch (error) {
            alert("Erreur lors de l'ajout de la fiche client.");
        }
    }, [user, title, text]);

    return (
        <Form title="Ajouter une fiche client" onSubmit={handleSubmit}>
            <Input
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Input
                label="Text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <Button type="submit">Ajouter</Button>
        </Form>
    );
});

export default ClientForm;