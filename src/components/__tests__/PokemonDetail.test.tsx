import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import PokemonDetail from '@components/PokemonCard/PokemonDetail';
import { mockPokemonDetailData } from '@utils/mockData';
import { setupTestStore, createTestWrapper } from '@utils/test-utils';

import type { JSX } from 'react';

let store;
let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

beforeEach(() => {
  store = setupTestStore();
  wrapper = createTestWrapper(store);
  vi.restoreAllMocks();
});

describe('PokemonDetail', () => {
  it('renders detail info', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockPokemonDetailData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const initialUrl = '/details?details=bulbasaur';

    render(
      <MemoryRouter initialEntries={[initialUrl]}>
        <Routes>
          <Route path="/details" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>,
      { wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/grass/i)).toBeInTheDocument();
      expect(screen.getByText(/height/i)).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
});
