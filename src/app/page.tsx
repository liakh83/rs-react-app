import { redirect } from 'next/navigation';

import MainComponent from '@components/MainComponent/MainComponent';
import { LIMIT_ITEMS } from '@utils/constants';

import type { Pokemon } from 'src/types/pokemon';
import type {
  PokemonAPIResponse,
  PokemonListResponse,
} from 'src/types/pokemonApi.types';

const mapPokemonDetail = (detail: PokemonAPIResponse): Pokemon => {
  return {
    id: detail.id,
    name: detail.name,
    image: detail.sprites.other['official-artwork'].front_default,
    types: detail.types.map((type) => type.type.name),
    abilities: detail.abilities.map((ability) => ability.ability.name),
    height: detail.height,
    weight: detail.weight,
  };
};

const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!result.ok) {
    throw new Error(`Error fetch pokemon: ${name}, status ${result.status}`);
  }

  const detail: PokemonAPIResponse = await result.json();
  return mapPokemonDetail(detail);
};

const getPokemonList = async (
  page: number
): Promise<{ pokemonData: Pokemon[]; totalCount: number }> => {
  const offset = (page - 1) * LIMIT_ITEMS;
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT_ITEMS}`
  );

  const data: PokemonListResponse = await result.json();
  const totalCount = data.count;

  const pokemonByName: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: { name: string }) => {
      const pokemonData = await getPokemonByName(pokemon.name);
      return pokemonData;
    })
  );
  return { pokemonData: pokemonByName, totalCount };
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchName = typeof params.search === 'string' ? params.search : '';

  let pokemonData: Pokemon[] = [];
  let totalCount = 0;

  if (params.search && params.page) {
    redirect(`/?search=${searchName}`);
  }

  if (!params.page && !params.search) {
    redirect('/?page=1');
  }

  if (searchName) {
    const pokemon = await getPokemonByName(searchName);
    pokemonData = pokemon ? [pokemon] : [];
  } else {
    const data = await getPokemonList(currentPage);
    pokemonData = data.pokemonData;
    totalCount = data.totalCount;
  }

  return <MainComponent pokemonData={pokemonData} totalCount={totalCount} />;
};

export default Page;
