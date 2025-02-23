import React, { useState, useCallback, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { clientsService } from '../../../services/clientsService';
import Form from '../../../common/components/Form/Form';
import { Input } from '../../../common/components/Input/Input';
import Button from '../../../common/components/Button/Button';

/**
 * Formulaire d'édition de fiche client avec contrôle d'accès
 * 
 * @component
 * @returns {JSX.Element} Formulaire d'édition sécurisé
 */
const EditClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const client = useSelector((state) =>
    state.clients.clients.find((c) => c.id === Number(id))
  );

  // État local optimisé avec vérification de l'existence du client
  const [formData, setFormData] = useState({
    title: client?.title || '',
    text: client?.text || ''
  });

  /**
   * Redirection si client non trouvé
   */
  useEffect(() => {
    if (!client) {
      navigate('/clients', { replace: true });
    }
  }, [client, navigate]);

  const isCreator = client?.created_by === user?.id;

  /**
   * Gestionnaire de soumission mémoïsé
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!isCreator) {
      alert('Vous ne pouvez pas modifier cette fiche client.');
      return;
    }

    try {
      await clientsService.modifyClient(client.id, formData);
      alert('Fiche client mise à jour avec succès !');
      navigate('/clients');
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }, [isCreator, client?.id, formData, navigate]);

  /**
   * Gestionnaire de champ générique
   */
  const handleChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  return (
    <MemoizedForm
      title="Modifier la fiche client"
      onSubmit={handleSubmit}
      error={!isCreator ? 'Accès non autorisé' : null}
    >
      <Input
        label="Title"
        type="text"
        value={formData.title}
        onChange={handleChange('title')}
        required
        disabled={!isCreator}
        aria-label="Modifier le titre"
      />
      <Input
        label="Text"
        type="text"
        value={formData.text}
        onChange={handleChange('text')}
        required
        disabled={!isCreator}
        aria-label="Modifier le contenu"
      />
      {isCreator && <Button type="submit">Mettre à jour</Button>}
    </MemoizedForm>
  );
};

/**
 * Version mémoïsée du formulaire
 */
const MemoizedForm = memo(Form);

export default memo(EditClientForm);