'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import PokemonCard from './PokemonCard';

import type { Pokemon } from 'src/types/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail = ({ pokemon }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pokemonName = searchParams.get('details');

  if (!pokemonName) {
    return null;
  }

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="p-4 w-full max-w-md">
      {pokemon && <PokemonCard pokemon={pokemon} />}
      <button
        className="mb-4 mt-2  px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleCloseDetail}
      >
        Close
      </button>
    </div>
  );
};

export default PokemonDetail;
