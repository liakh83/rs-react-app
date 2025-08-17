'use client';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { toggleItem } from '@redux/selectedItemsSlice';

import PokemonCard from './PokemonCard';

import type { Pokemon } from 'src/types/pokemon';

interface Props {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const PokemonItem = ({ pokemon, onClick }: Props) => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(
    (state) => !!state.selected.selectedItems[pokemon.name]
  );

  const handleCheckboxChange = () => {
    if (pokemon) {
      dispatch(toggleItem(pokemon));
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
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
