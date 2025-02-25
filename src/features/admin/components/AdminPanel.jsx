import React, { useEffect, useState, useCallback, memo } from 'react';
import ClientCard from './ClientCard';
import { clientsService } from '../../../services/clientsService';
import Button from '../../../common/components/Button/Button';
import { supabase } from '../../../api/supabaseClient';
import styles from './AdminPanel.module.scss';
import { removePendingClient, setPendingClients } from '../../../redux/slices/clientsSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Admin panel component for managing pending client validations.
 * 
 * @component
 * @example
 * return (
 *   <AdminPanel />
 * )
 * 
 * @description
 * This component handles:
 * - Displaying pending client submissions
 * - Validating or rejecting client entries
 * - Managing client validation state
 * - Communicating with client service API
 * 
 * @returns {JSX.Element} Administration interface for client management
 * 
 * @see {@link clientsService} For client validation API interactions
 * @see {@link Button} For consistent button styling
 * @see {@link ClientCard} For client presentation component
 */
const AdminPanel = () => {
  const dispatch = useDispatch()
  const pendingClients = useSelector((state) => state.clients.pendingClients);
console.log("issam pendingClients", pendingClients)
  /**
   * State containing pending client submissions
   * @type {Array<Object>}
   * @property {string} id - Client ID
   * @property {string} title - Client title
   * @property {string} text - Client description
   * @property {string} created_by - Creator ID
   */
 

  /**
   * Memoized validation handler with stable reference
   * @type {Function}
   */
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

  return (
    <div className={styles.adminPanel}>
      <div className={styles.clientList}>
        {pendingClients.length === 0 && <div>No files clients</div>}
        {pendingClients.map(client => (
          <MemoizedClientCard
            key={client.id}
            client={client}
            onValidate={() => handleValidation(client, true)}
            onReject={() => handleValidation(client, false)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Optimized client card component with memoization
 */
const MemoizedClientCard = memo(ClientCard);

export default memo(AdminPanel);