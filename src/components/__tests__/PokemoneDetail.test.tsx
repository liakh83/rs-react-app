import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PokemonDetail } from '@components/PokemonCard';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  image: 'image_url',
  types: ['grass'],
  abilities: ['overgrow'],
  height: 0.7,
  weight: 6.9,
};

describe('PokemonDetail', () => {
  it('renders detail info', () => {
    render(
      <PokemonDetail
        pokemon={mockPokemon}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
  });
});
