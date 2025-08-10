import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import CardList from '@components/CardList';
import { mockPokemonListResponse } from '@utils/mockData';
import { setupTestStore, createTestWrapper } from '@utils/test-utils';

import type { JSX } from 'react';

let store;
let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

beforeEach(() => {
  store = setupTestStore();
  wrapper = createTestWrapper(store);
  vi.restoreAllMocks();
});

describe('CardList component', () => {
  it('handles missing results in fetchPokemonList', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ results: [], count: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const onTotalCountChange = vi.fn();
    const onPokemonClick = vi.fn();

    render(
      <CardList
        page={1}
        limit={20}
        onTotalCountChange={onTotalCountChange}
        onPokemonClick={onPokemonClick}
      />,
      { wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(onTotalCountChange).toHaveBeenCalledWith(0);
  });

  it('shows a list of pokemon when data is available', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockPokemonListResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const onTotalCountChange = vi.fn();
    const onPokemonClick = vi.fn();

    render(
      <CardList
        page={1}
        limit={20}
        onTotalCountChange={onTotalCountChange}
        onPokemonClick={onPokemonClick}
      />,
      { wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      expect(screen.queryByText(/no results found/i)).not.toBeInTheDocument();
    });

    expect(onTotalCountChange).toHaveBeenCalledWith(2);
  });
  it('shows an error message on API failure', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response('Not Found', {
        status: 404,
        statusText: 'Not Found',
      })
    );

    const onTotalCountChange = vi.fn();
    const onPokemonClick = vi.fn();

    render(
      <CardList
        page={1}
        limit={20}
        onTotalCountChange={onTotalCountChange}
        onPokemonClick={onPokemonClick}
      />,
      { wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });

    expect(onTotalCountChange).toHaveBeenCalledWith(0);
  });
});
