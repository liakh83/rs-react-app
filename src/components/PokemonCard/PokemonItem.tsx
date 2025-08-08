import { skipToken } from '@reduxjs/toolkit/query';

import { useGetPokemonByNameQuery } from '@api/pokemonApi';
import Loader from '@components/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { toggleItem } from '@redux/selectedItemsSlice';
import getErrorMessage from '@services/errorHelper';

import PokemonCard from './PokemonCard';

import type { Pokemon } from '@utils/interfaces';

const PokemonItem = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: (pokemon: Pokemon) => void;
}) => {
  const {
    data: pokemon,
    isFetching,
    error,
    isError,
  } = useGetPokemonByNameQuery(name ?? skipToken);

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(
    (state) => !!state.selected.selectedItems[name]
  );

  const handleCheckboxChange = () => {
    if (pokemon) {
      dispatch(toggleItem(pokemon));
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  if (error && isError) {
    return <div className="text-red-500">{getErrorMessage(error)}</div>;
  }

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="absolute top-2 right-2 z-10 w-5 h-5 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 accent-white dark:accent-gray-800 rounded appearance-none checked:bg-blue-600 dark:checked:bg-blue-400 checked:after:content-['✔'] checked:after:text-white checked:after:text-xs checked:after:absolute checked:after:top-[1px] checked:after:left-[4px] checked:border-transparent focus:outline-none cursor-pointer"
      />
      {pokemon && (
        <PokemonCard pokemon={pokemon} onClick={() => onClick?.(pokemon)} />
      )}
    </div>
  );
};

export default PokemonItem;
