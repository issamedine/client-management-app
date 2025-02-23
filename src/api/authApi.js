import { supabase } from './supabaseClient';

/**
 * Authenticates a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The authenticated user data with role.
 * @throws {Error} If authentication or profile retrieval fails.
 */
export const signIn = async (email, password) => {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError) throw authError;

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profileError) throw profileError;

  return {
    ...authData,
    role: profileData.role || 'USER'
  };
};

/**
 * Registers a new user and assigns a role.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} role - The user's role.
 * @returns {Promise<object>} The registered user data.
 * @throws {Error} If sign-up or profile insertion fails.
 */
export const signUp = async (email, password, role) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  await supabase.from('profiles').insert([{ id: data.user.id, role }]);
  return data;
};

/**
 * Signs out the current user.
 * @returns {Promise<void>} Resolves if successful.
 * @throws {Error} If sign-out fails.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};