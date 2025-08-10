import { configureStore } from '@reduxjs/toolkit';

import { pokemonApi } from '@api/pokemonApi';

import selectedItems from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selected: selectedItems,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
