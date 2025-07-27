import PokemonCard from './PokemonCard';

import type { Pokemon } from '@utils/interfaces';

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetail = ({ pokemon, onClose }: Props) => {
  return (
    <div className="p-4 border-l w-full max-w-md">
      <button
        onClick={onClose}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Close
      </button>
      <PokemonCard pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetail;
