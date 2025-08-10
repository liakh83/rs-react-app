import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

import { pokemonApi } from '@api/pokemonApi';

const mockSelectedReducer = (state = { selectedItems: {} }) => state;

export const setupTestStore = () => {
  const store = configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      selected: mockSelectedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export const createTestWrapper = (store: ReturnType<typeof setupTestStore>) => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  TestWrapper.displayName = 'TestWrapper';
  return TestWrapper;
};
