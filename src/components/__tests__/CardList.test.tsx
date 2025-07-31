import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as api from '@api/pokemonApi';
import CardList from '@components/CardList';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  image: 'image_url',
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  height: 0.7,
  weight: 6.9,
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('CardList component', () => {
  describe('CardList behavior', () => {
    it('calls fetchPokemonByName with correct searchTerm', async () => {
      const spy = vi
        .spyOn(api, 'fetchPokemonByName')
        .mockResolvedValue(mockPokemon);

      render(
        <CardList
          searchTerm="pikachu"
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith('pikachu');
      });
    });

    it('handles missing results in fetchPokemonList', async () => {
      vi.spyOn(api, 'fetchPokemonList').mockResolvedValue({
        results: [],
        count: 0,
        next: null,
        previous: null,
      });

      render(
        <CardList
          searchTerm=""
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/no results found/i)).toBeInTheDocument();
      });
    });

    it('shows error message when API call fails', async () => {
      vi.spyOn(api, 'fetchPokemonByName').mockRejectedValue(
        new Error('Failed to fetch')
      );

      render(
        <CardList
          searchTerm="unknown"
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
        expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
      });
    });

    it('shows error if fetchPokemonByName fails after searchTerm update', async () => {
      const { rerender } = render(
        <CardList
          searchTerm="pikachu"
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      vi.spyOn(api, 'fetchPokemonByName').mockRejectedValue(
        new Error('Updated term failed')
      );

      rerender(
        <CardList
          searchTerm="charmander"
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
        expect(screen.getByText(/updated term failed/i)).toBeInTheDocument();
      });
    });

    it('shows "No results found" if pokemonItems is empty', async () => {
      vi.spyOn(api, 'fetchPokemonList').mockResolvedValue({
        results: [],
        count: 0,
        next: null,
        previous: null,
      });

      render(
        <CardList
          searchTerm=""
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        expect(screen.getByText(/no results found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Card rendering', () => {
    it('renders list of pokemon when data is provided', async () => {
      vi.spyOn(api, 'fetchPokemonList').mockResolvedValue({
        results: [{ name: 'bulbasaur', url: '' }],
        count: 1,
        next: null,
        previous: null,
      });
      vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);

      render(
        <CardList
          searchTerm=""
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/grass, poison/i)).toBeInTheDocument();
      });
    });

    it('renders single pokemon when searchTerm is provided', async () => {
      vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);

      render(
        <CardList
          searchTerm="bulbasaur"
          page={1}
          limit={20}
          onTotalCountChange={vi.fn()}
          onPokemonClick={vi.fn()}
        />
      );

      expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });
});
