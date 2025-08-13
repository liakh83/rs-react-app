import { useEffect } from 'react';

import { useGetPokemonListQuery } from '@api/pokemonApi';
import Loader from '@components/Loader';
import { PokemonItem } from '@components/PokemonCard';
import getErrorMessage from '@services/errorHelper';

import type { Pokemon } from 'src/types/pokemon';

interface Props {
  page: number;
  limit: number;
  onTotalCountChange: (count: number) => void;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const CardList = ({
  page,
  limit,
  onPokemonClick,
  onTotalCountChange,
}: Props) => {
  const offset = (page - 1) * limit;

  const {
    data = { totalCount: 0, pokemonNames: [] },
    isFetching,
    error,
    isError,
  } = useGetPokemonListQuery({
    offset,
    limit,
  });

  useEffect(() => {
    onTotalCountChange(data.totalCount);
  }, [data.totalCount, onTotalCountChange]);

  if (isFetching) {
    return <Loader />;
  }

  if (isError && error) {
    return <div className="text-red-500">{getErrorMessage(error)}</div>;
  }

  if (!isFetching && !error && data?.pokemonNames.length === 0) {
    return <div className="text-red-500">No results found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.pokemonNames.map((name) => (
        <PokemonItem name={name} key={name} onClick={onPokemonClick} />
      ))}
    </div>
  );
};

export default CardList;
