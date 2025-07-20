import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPokemonList, fetchPokemonByName } from './pokemonApi';

describe('Pokemon API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchPokemonList returns data on success', async () => {
    const mockResponse = { results: [{ name: 'bulbasaur' }] };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      )
    );

    const data = await fetchPokemonList();
    expect(data).toEqual(mockResponse);
  });

  it('fetchPokemonList throws error on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 500 }))
    );

    await expect(fetchPokemonList()).rejects.toThrow('Error status: 500');
  });

  it('fetchPokemonByName returns mapped pokemon on success', async () => {
    const apiResponse = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'image_url' },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
      height: 7,
      weight: 69,
    };
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(apiResponse),
        })
      )
    );

    const pokemon = await fetchPokemonByName('bulbasaur');
    expect(pokemon).toEqual({
      id: 1,
      name: 'bulbasaur',
      image: 'image_url',
      types: ['grass'],
      abilities: ['overgrow'],
      height: 0.7,
      weight: 6.9,
    });
  });

  it('fetchPokemonByName throws error on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 404 }))
    );

    await expect(fetchPokemonByName('unknown')).rejects.toThrow(
      'Pokemon "unknown" not found . Status: 404'
    );
  });
});
