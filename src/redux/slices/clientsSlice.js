import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  pendingClients: [],
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
      state.pendingClients = action.payload;
    },
    addPendingClient: (state, action) => {
      state.pendingClients.unshift(action.payload);
    },
    removePendingClient: (state, action) => {
      state.pendingClients = state.pendingClients.filter(
        client => client.id !== action.payload
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
  removePendingClient
} = clientsSlice.actions;
export default clientsSlice.reducer;