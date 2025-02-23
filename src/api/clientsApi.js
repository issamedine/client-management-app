import { supabase } from './supabaseClient';

/**
 * Fetches all clients from the database.
 * @returns {Promise<Array<object>>} List of clients.
 * @throws {Error} If fetching fails.
 */
export const fetchClients = async () => {
  const { data, error } = await supabase.from('clients').select('*');
  if (error) throw error;
  return data;
};

/**
 * Adds a new client to the temporary clients table.
 * @param {object} client - The client data to insert.
 * @returns {Promise<object>} The inserted client data.
 * @throws {Error} If insertion fails.
 */
export const addClient = async (client) => {
  const { data, error } = await supabase.from('clientstemp').insert([client]);
  if (error) throw error;
  return data;
};

/**
 * Updates an existing client in the database.
 * @param {string} id - The client ID.
 * @param {object} updates - The fields to update.
 * @returns {Promise<object>} The updated client data.
 * @throws {Error} If update fails.
 */
export const updateClient = async (id, updates) => {
  console.log("id", id);
  console.log("updates", updates);
  const { data, error } = await supabase.from('clients').update(updates).eq('id', id);
  if (error) throw error;
  return data;
};

/**
 * Deletes a client from the database.
 * @param {string} id - The client ID.
 * @returns {Promise<void>} Resolves if successful.
 * @throws {Error} If deletion fails.
 */
export const deleteClient = async (id) => {
  const { error } = await supabase.from('clients').delete().eq('id', id);
  if (error) throw error;
};