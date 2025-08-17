'use client';
import { configureStore } from '@reduxjs/toolkit';

import selectedItems from './selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selected: selectedItems,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
