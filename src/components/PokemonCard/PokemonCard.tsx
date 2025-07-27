import type { Pokemon } from '@utils/interfaces';

export interface Props {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const PokemonCard = ({ pokemon, onClick }: Props) => {
  return (
    <div
      key={pokemon.id}
      onClick={() => onClick?.(pokemon)}
      className="border rounded shadow p-4 bg-white hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto mb-2"
      />
      <p>
        <strong>Types:</strong> {pokemon.types.join(', ')}
      </p>
      <p>
        <strong>Abilities:</strong> {pokemon.abilities.join(', ')}
      </p>
      <p>
        <strong>Height:</strong> {pokemon.height} m
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight} kg
      </p>
    </div>
  );
};

export default PokemonCard;
