import Loader from '@components/Loader';
import { useAppDispatch, useAppSelector, usePokemonByName } from '@hooks/index';
import { toggleItem } from '@redux/selectedItemsSlice';

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

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(
    (state) => !!state.selectedItems.selectedItems[name]
  );

  const handleCheckboxChange = () => {
    if (pokemon) {
      dispatch(toggleItem(pokemon));
    }
  };

  if (isLoading) return <Loader />;
  if (error || !pokemon) return null;
  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="absolute top-2 right-2 z-10 w-5 h-5"
      />
      <PokemonCard pokemon={pokemon} onClick={() => onClick?.(pokemon)} />
    </div>
  );
};

export default PokemonItem;
