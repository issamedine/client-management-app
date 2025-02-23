import React, { useEffect, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientsService } from '../../../services/clientsService';
import List from './List';
import Button from '../../../common/components/Button/Button';
import styles from './ClientList.module.scss';

/**
 * ClientList Component
 * 
 * Displays a list of client records. Users can edit or delete only the records they created.
 * 
 * @component
 * @returns {JSX.Element} The rendered ClientList component.
 */
const ClientList = () => {
  const clients = useSelector((state) => state.clients.clients);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    /**
     * Fetches the list of clients from the service.
     */
    const fetchClients = async () => {
      try {
        await clientsService.getClients();
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  /**
   * Memoized deletion handler with stable reference
   * @type {Function}
   */
  const handleDelete = useCallback(async (id) => {
    try {
      await clientsService.removeClient(id);
      alert('Client record deleted successfully!');
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }, []);

  /**
   * Memoized rendering function for list items
   * @type {Function}
   */
  const renderItem = useCallback((client) => (
    <MemoizedClientRecord
      client={client}
      userId={user?.id}
      onDelete={handleDelete}
    />
  ), [user?.id, handleDelete]);

  return (
    <div className={styles['client-list-container']}>
      <h2>Client Records List</h2>
      <MemoizedList items={clients} renderItem={renderItem} />
    </div>
  );
};

/**
 * Optimized client record component
 */
const MemoizedClientRecord = memo(({ client, userId, onDelete }) => {
  const isCreator = client.created_by === userId;

  return (
    <li key={client.id} className={styles['client-record']}>
      <p><strong>Title:</strong> {client.title}</p>
      <p><strong>Text:</strong> {client.text}</p>
      {isCreator && (
        <div className={styles['client-actions']}>
          <Link to={`/edit-client/${client.id}`}>
            <Button aria-label={`Edit ${client.title}`}>Edit</Button>
          </Link>
          <Button
            onClick={() => onDelete(client.id)}
            aria-label={`Delete ${client.title}`}
          >
            Delete
          </Button>
        </div>
      )}
    </li>
  );
});

/**
 * Optimized list component
 */
const MemoizedList = memo(List);

export default memo(ClientList);