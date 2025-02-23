import React, { useEffect, useState, useCallback, memo } from 'react';
import ClientCard from './ClientCard';
import { clientsService } from '../../../services/clientsService';
import Button from '../../../common/components/Button/Button';

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
  /**
   * State containing pending client submissions
   * @type {Array<Object>}
   * @property {string} id - Client ID
   * @property {string} title - Client title
   * @property {string} text - Client description
   * @property {string} created_by - Creator ID
   */
  const [pendingClients, setPendingClients] = useState([]);

  /**
   * Fetches pending clients from API on component mount
   * @async
   * @function
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clients = await clientsService.getPendingClients();
        setPendingClients(clients);
      } catch (error) {
        console.error('Error fetching pending clients:', error);
      }
    };
    fetchData();
  }, []);

  /**
   * Memoized validation handler with stable reference
   * @type {Function}
   */
  const handleValidation = useCallback(
    async (input, isValid) => {
      try {
        const operation = isValid ? clientsService.validateClient : clientsService.rejectClient;
        await operation(typeof input === 'object' ? input : { id: input });
        setPendingClients(prev => prev.filter(client => client.id !== (input.id || input)));
      } catch (error) {
        console.error(`Error ${isValid ? 'validating' : 'rejecting'} client:`, error);
      }
    },
    []
  );

  return (
    <div className="admin-panel">
      <h2>Pending Client Validations</h2>
      <div className="client-list">
        {pendingClients.map(client => (
          <MemoizedClientCard
            key={client.id}
            client={client}
            onValidate={() => handleValidation(client, true)}
            onReject={() => handleValidation(client.id, false)}
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