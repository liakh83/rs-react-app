import { useEffect, useState } from 'react';

import { fetchPokemonList } from '@api/pokemonApi';

const usePokemonList = (offset: number, limit: number) => {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAllPokemons = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!cancelled) {
          const list = await fetchPokemonList(offset, limit);
          setPokemonNames(list.results.map((pokemon) => pokemon.name));
          setTotalCount(list.count);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          if (error instanceof Error) {
            setError(error.message || 'Error');
          } else {
            setError('Unknown error');
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };
    loadAllPokemons();

    return () => {
      cancelled = true;
    };
  }, [offset, limit]);
  return { pokemonNames, isLoading, error, totalCount };
};

export default usePokemonList;
