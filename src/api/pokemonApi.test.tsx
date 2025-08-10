import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { pokemonApi } from './pokemonApi';

const mockStore = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('Pokemon API RTK Query', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getPokemonList returns data on success', async () => {
    const mockResponse = { results: [{ name: 'bulbasaur' }], count: 1 };

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const { result } = renderHook(
      () => pokemonApi.useGetPokemonListQuery({ offset: 0 }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      pokemonNames: ['bulbasaur'],
      totalCount: 1,
    });
  });

  it('getPokemonByName returns mapped pokemon on success', async () => {
    const apiResponse = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'image_url' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      height: 7,
      weight: 69,
    };

    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(apiResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const { result } = renderHook(
      () => pokemonApi.useGetPokemonByNameQuery('bulbasaur'),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      id: 1,
      name: 'bulbasaur',
      image: 'image_url',
      types: ['grass'],
      abilities: ['overgrow'],
      height: 0.7,
      weight: 6.9,
    });
  });

  it('getPokemonByName throws error on failure', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(null, {
        status: 404,
        statusText: 'Not Found',
      })
    );

    const { result } = renderHook(
      () => pokemonApi.useGetPokemonByNameQuery('unknown'),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual({
      status: 404,
      data: null,
    });
  });
});
