import { skipToken } from '@reduxjs/toolkit/query';
import { useSearchParams } from 'react-router-dom';

import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import Loader from '@components/Loader';
import getErrorMessage from '@services/errorHelper';

import PokemonCard from './PokemonCard';

const PokemonDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemonName = searchParams.get('details');

  const {
    data: pokemon,
    isFetching,
    error,
    isError,
  } = useGetPokemonByNameQuery(pokemonName ?? skipToken);

  if (!pokemonName) return null;

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('details');
    setSearchParams(newParams);
  };

  if (isFetching) {
    return <Loader />;
  }

  if (isError && error) {
    return <div className="text-red-500">{getErrorMessage(error)}</div>;
  }

  return (
    <div className="p-4w-full border-l max-w-md">
      {pokemon && <PokemonCard pokemon={pokemon} />}
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
