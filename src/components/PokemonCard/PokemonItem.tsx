import Loader from '@components/Loader';
import { usePokemonByName } from '@hooks/index';

import PokemonCard from './PokemonCard';

import type { Pokemon } from '@utils/interfaces';

const PokemonItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: (pokemon: Pokemon) => void;
}) => {
  const { pokemon, isLoading, error } = usePokemonByName(name);

  if (isLoading) return <Loader />;
  if (error || !pokemon) return null;
  return (
    <>
      <PokemonCard pokemon={pokemon} onClick={() => onClick?.(pokemon)} />
    </>
  );
};

export default PokemonItem;
