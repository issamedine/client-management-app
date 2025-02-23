// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage par défaut
import userReducer from './slices/userSlice';
import clientsReducer from './slices/clientsSlice';

// Configuration de la persistance pour le slice `user`
const userPersistConfig = {
  key: 'user',
  storage,
};

// Combiner les reducers avec la persistance pour `user`
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Configurer le store Redux
export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Persisté
    clients: clientsReducer, // Non persisté
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactiver la vérification de sérialisation pour redux-persist
    }),
});

// Créer le persistor pour Redux Persist
export const persistor = persistStore(store);