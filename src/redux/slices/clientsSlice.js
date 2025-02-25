import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  pendingClients: [],
  notifications: [],
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },
    setPendingClients: (state, action) => {
      if (!action.payload || (Array.isArray(action.payload) && action.payload.length === 0)) return;

      if (Array.isArray(action.payload)) {
        state.pendingClients = [...state.pendingClients, ...action.payload]; // Ajouter tous les éléments du tableau
      } else {
        state.pendingClients = [...state.pendingClients, action.payload]; // Ajouter un seul élément
      }
    },

    addPendingClient: (state, action) => {
      state.pendingClients.unshift(action.payload);
    },
    removePendingClient: (state, action) => {
      state.pendingClients = state.pendingClients.filter(
        client => client.id !== action.payload
      );
    },

    // Ajouter une notification
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },

    // Supprimer une notification
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const {
  setClients,
  addClient,
  updateClient,
  deleteClient,
  setPendingClients,
  addPendingClient,
  removePendingClient,
  addNotification,
  removeNotification,
} = clientsSlice.actions;
export default clientsSlice.reducer;