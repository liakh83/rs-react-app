'use client';

import { PokemonItem } from '@components/PokemonCard';

import type { Pokemon } from 'src/types/pokemon';

interface Props {
  pokemonData: Pokemon[];
  onPokemonClick: (pokemon: Pokemon) => void;
}

const CardList = ({ pokemonData, onPokemonClick }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokemonData.map((pokemon) => (
        <PokemonItem
          pokemon={pokemon}
          key={pokemon.name}
          onClick={onPokemonClick}
        />
      ))}
    </div>
  );
};

export default CardList;
