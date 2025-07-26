import type {
  PokemonAPIResponse,
  PokemonListResponse,
} from '@utils/interfaces';

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${0}&limit=${30}`;
  const result = await fetch(URL);
  if (!result.ok) throw new Error(`Error status: ${result.status}`);
  return result.json();
};

export const fetchPokemonByName = async (name: string) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!result.ok)
    throw new Error(`Pokemon "${name}" not found . Status: ${result.status}`);
  const data: PokemonAPIResponse = await result.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((value) => value.type.name),
    abilities: data.abilities.map((value) => value.ability.name),
    height: data.height / 10,
    weight: data.weight / 10,
  };
};
