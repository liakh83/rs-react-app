import { describe, it, expect } from 'vitest';

import {
  toggleItem,
  clearItems,
  default as reducer,
} from '@redux/selectedItemsSlice';

import type { Pokemon } from '@utils/interfaces';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  abilities: ['overgrow'],
  height: 7,
  weight: 69,
  image: 'https://example.com/bulbasaur.png',
};

describe('selectedItemsSlice', () => {
  it('should add a pokemon if it is not in the list', () => {
    const initialState = { selectedItems: {} };
    const action = toggleItem(mockPokemon);
    const state = reducer(initialState, action);

    expect(Object.keys(state.selectedItems)).toHaveLength(1);
    expect(state.selectedItems[mockPokemon.name]).toEqual(mockPokemon);
  });

  it('should remove a pokemon if it is already in the list', () => {
    const initialState = {
      selectedItems: { [mockPokemon.name]: mockPokemon },
    };
    const action = toggleItem(mockPokemon);
    const state = reducer(initialState, action);

    expect(Object.keys(state.selectedItems)).toHaveLength(0);
    expect(state.selectedItems[mockPokemon.name]).toBeUndefined();
  });

  it('should clear all items from the list', () => {
    const initialState = {
      selectedItems: {
        [mockPokemon.name]: mockPokemon,
      },
    };
    const action = clearItems();
    const state = reducer(initialState, action);

    expect(Object.keys(state.selectedItems)).toHaveLength(0);
    expect(state.selectedItems).toEqual({});
  });
});
