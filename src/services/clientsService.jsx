import { fetchClients, addClient, updateClient, deleteClient } from '../api/clientsApi';
import { supabase } from '../api/supabaseClient';
import { setClients, addClient as addClientAction, updateClient as updateClientAction, deleteClient as deleteClientAction } from '../redux/slices/clientsSlice';
import { store } from '../redux/store';

/**
 * ClientsService handles all operations related to client data, including fetching, creating, modifying, and deleting clients.
 */
export const clientsService = {

    /**
     * Fetches all clients and dispatches them to the Redux store.
     * 
     * @returns {Promise<void>} Resolves when clients are fetched successfully.
     */
    getClients: async () => {
        const clients = await fetchClients();
        store.dispatch(setClients(clients));
    },

    /**
     * Creates a new client and dispatches the created client to the Redux store.
     * 
     * @param {Object} client - The client object to be created.
     * @returns {Promise<void>} Resolves when the client is created successfully.
     */
    createClient: async (client) => {
        const newClient = await addClient(client);
        return newClient;
    },

    /**
     * Modifies an existing client by updating the specified fields.
     * 
     * @param {string} id - The ID of the client to be modified.
     * @param {Object} updates - The updated client data.
     * @returns {Promise<void>} Resolves when the client is updated successfully.
     */
    modifyClient: async (id, updates) => {
        const updatedClient = await updateClient(id, updates);
    },

    /**
     * Removes a client by ID and refreshes the client list.
     * 
     * @param {string} id - The ID of the client to be deleted.
     * @returns {Promise<void>} Resolves when the client is deleted and the client list is refreshed.
     */
    removeClient: async (id) => {
        await deleteClient(id);
        // store.dispatch(deleteClientAction(id));
        clientsService.getClients();
    },

    /**
     * Fetches pending clients from the "clientstemp" table in Supabase.
     * 
     * @returns {Promise<Object[]>} An array of pending client records.
     * @throws {Error} Throws an error if fetching fails.
     */
    getPendingClients: async () => {
        const { data, error } = await supabase
            .from('clientstemp')
            .select('*');

        if (error) throw new Error(error.message);
        return data;
    },

    /**
     * Validates and inserts a client into the "clients" table, then removes it from the "clientstemp" table.
     * 
     * @param {Object} input - The client data to be inserted into the "clients" table.
     * @returns {Promise<void>} Resolves when the client is validated and moved.
     * @throws {Error} Throws an error if the insertion or deletion fails.
     */
    validateClient: async (input) => {
        const { error: insertError } = await supabase
            .from('clients')
            .insert([input]);

        if (insertError) throw new Error(insertError.message);

        const { error: deleteError } = await supabase
            .from('clientstemp')
            .delete()
            .eq('id', input.id);

        if (deleteError) throw new Error(deleteError.message);
    },

    /**
     * Rejects a client by deleting it from the "clientstemp" table.
     * 
     * @param {string} clientId - The ID of the client to be rejected.
     * @returns {Promise<void>} Resolves when the client is successfully rejected.
     * @throws {Error} Throws an error if the deletion fails.
     */
    rejectClient: async (clientId) => {
        const { error } = await supabase
            .from('clientstemp')
            .delete()
            .eq('id', clientId.id);

        if (error) throw new Error(error.message);
    }
}
