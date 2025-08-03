import { useEffect, useState } from 'react';

import { fetchPokemonByName } from '@api/pokemonApi';

import type { Pokemon } from '@utils/interfaces';

const usePokemonByName = (name: string) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSinglePokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!cancelled) {
          const single = await fetchPokemonByName(name);
          setPokemon(single);
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
    loadSinglePokemon();
    return () => {
      cancelled = true;
    };
  }, [name]);
  return { pokemon, isLoading, error };
};

export default usePokemonByName;
