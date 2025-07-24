import { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonByName } from '@api/pokemonApi';
import Loader from '@components/Loader';
import type { Pokemon } from '@utils/interfaces';
import PokemonCard from '@components/PokemonCard';

interface Props {
  searchTerm: string;
}

const CardList = ({ searchTerm }: Props) => {
  const [pokemonItems, setPokemonItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm === '') {
      loadAllPokemons();
    } else {
      loadSinglePokemon(searchTerm);
    }
  }, [searchTerm]);

  const loadAllPokemons = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await fetchPokemonList();
      const detailed = await Promise.all(
        list.results.map((item: { name: string }) =>
          fetchPokemonByName(item.name)
        )
      );
      setPokemonItems(detailed);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setError(error.message || 'Error');
      } else {
        setIsLoading(false);
        setError('Unknown error');
      }
    }
  };

  const loadSinglePokemon = async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const single = await fetchPokemonByName(name);
      setPokemonItems([single]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        setError(error.message || 'Error');
      } else {
        setIsLoading(false);
        setError('Unknown error');
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!isLoading && !error && pokemonItems.length === 0) {
    return <div className="text-red-500">No results found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokemonItems.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} onClick={() => {}} />
      ))}
    </div>
  );
};

export default CardList;
