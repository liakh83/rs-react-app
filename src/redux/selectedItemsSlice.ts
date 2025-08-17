'use client';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Pokemon } from 'src/types/pokemon';

interface SelectedItemsState {
  selectedItems: Record<string, Pokemon>;
}

const initialState: SelectedItemsState = {
  selectedItems: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Pokemon>) => {
      const name = action.payload.name;
      if (state.selectedItems[name]) {
        state.selectedItems = Object.fromEntries(
          Object.entries(state.selectedItems).filter(([key]) => key !== name)
        );
      } else {
        state.selectedItems[name] = action.payload;
      }
    },
    clearItems: (state) => {
      state.selectedItems = {};
    },
  },
});

export const { toggleItem, clearItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
