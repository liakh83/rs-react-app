import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import * as api from '@api/pokemonApi';
import CardList from '@components/CardList';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('CardList component', () => {
  describe('CardList behavior', () => {
    it('handles missing results in fetchPokemonList', async () => {
      vi.spyOn(api, 'fetchPokemonList').mockResolvedValue({
        results: [],
        count: 0,
        next: null,
        previous: null,
      });

      render(
        <CardList
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

    it('shows "No results found" if pokemonItems is empty', async () => {
      vi.spyOn(api, 'fetchPokemonList').mockResolvedValue({
        results: [],
        count: 0,
        next: null,
        previous: null,
      });

      render(
        <CardList
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
});
