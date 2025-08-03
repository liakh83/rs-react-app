import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { PokemonDetail } from '@components/PokemonCard';

vi.mock('@hooks/usePokemonByName', () => ({
  default: () => ({
    pokemon: {
      id: 1,
      name: 'bulbasaur',
      image: 'image_url',
      types: ['grass'],
      abilities: ['overgrow'],
      height: 0.7,
      weight: 6.9,
    },
    isLoading: false,
    error: null,
  }),
}));

describe('PokemonDetail', () => {
  it('renders detail info', () => {
    render(
      <>
        <MemoryRouter initialEntries={['/detail/bulbasaur']}>
          <Routes>
            <Route path="/detail/:name" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </>
    );
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
  });
});
