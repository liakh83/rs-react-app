import { useSearchParams } from 'react-router-dom';

import Loader from '@components/Loader';
import usePokemonByName from '@hooks/usePokemonByName';

import PokemonCard from './PokemonCard';

const PokemonDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const namePokemon = searchParams.get('details');

  const { pokemon, isLoading, error } = usePokemonByName(namePokemon || '');

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('details');
    setSearchParams(newParams);
  };

  if (isLoading) return <Loader />;
  if (error || !pokemon) return null;

  return (
    <div className="p-4w-full border-l max-w-md">
      <PokemonCard pokemon={pokemon} />
      <button
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleCloseDetail}
      >
        Close
      </button>
    </div>
  );
};

export default PokemonDetail;
