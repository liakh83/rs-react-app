import { useEffect } from 'react';

import Loader from '@components/Loader';
import { PokemonItem } from '@components/PokemonCard';
import { usePokemonList } from '@hooks/index';

import type { Pokemon } from '@utils/interfaces';

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

  const { pokemonNames, isLoading, error, totalCount } = usePokemonList(
    offset,
    limit
  );

  useEffect(() => {
    onTotalCountChange(totalCount);
  }, [totalCount, onTotalCountChange]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!isLoading && !error && pokemonNames.length === 0) {
    return <div className="text-red-500">No results found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokemonNames.map((name) => (
        <PokemonItem name={name} key={name} onClick={onPokemonClick} />
      ))}
    </div>
  );
};

export default CardList;
