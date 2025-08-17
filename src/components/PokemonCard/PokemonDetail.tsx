'use client';
import { useSearchParams } from 'react-router-dom';

import PokemonCard from './PokemonCard';

const PokemonDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemonName = searchParams.get('details');

  if (!pokemonName) return null;

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('details');
    setSearchParams(newParams);
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
