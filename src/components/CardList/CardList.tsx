import { useCallback, useEffect, useState } from 'react';

import { fetchPokemonList, fetchPokemonByName } from '@api/pokemonApi';
import Loader from '@components/Loader';
import { PokemonCard } from '@components/PokemonCard';

import type { Pokemon } from '@utils/interfaces';

interface Props {
  searchTerm: string;
  page: number;
  limit: number;
  onTotalCountChange: (count: number) => void;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const CardList = ({
  searchTerm,
  page,
  limit,
  onTotalCountChange,
  onPokemonClick,
}: Props) => {
  const [pokemonItems, setPokemonItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const offset = (page - 1) * limit;

  const loadAllPokemons = useCallback(
    async (offset: number, limit: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const list = await fetchPokemonList(offset, limit);
        const detailed = await Promise.all(
          list.results.map((item: { name: string }) =>
            fetchPokemonByName(item.name)
          )
        );
        setPokemonItems(detailed);
        onTotalCountChange(list.count);
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
    },
    [onTotalCountChange]
  );

  const loadSinglePokemon = useCallback(
    async (name: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const single = await fetchPokemonByName(name);
        setPokemonItems([single]);
        onTotalCountChange(1);
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
    },
    [onTotalCountChange]
  );

  useEffect(() => {
    if (searchTerm === '') {
      loadAllPokemons(offset, limit);
    } else {
      loadSinglePokemon(searchTerm);
    }
  }, [
    searchTerm,
    page,
    limit,
    offset,
    onTotalCountChange,
    loadSinglePokemon,
    loadAllPokemons,
  ]);

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
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.id}
          onClick={() => onPokemonClick(pokemon)}
        />
      ))}
    </div>
  );
};

export default CardList;
