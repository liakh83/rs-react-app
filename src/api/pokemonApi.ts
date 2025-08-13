import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LIMIT_ITEMS } from '@utils/constants';

import type {
  PokemonAPIResponse,
  PokemonListResponse,
  resultPokemonList,
} from './pokemonApi.types';
import type { Pokemon } from 'src/types/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      resultPokemonList,
      { offset: number; limit?: number }
    >({
      query: ({ offset, limit = LIMIT_ITEMS }) =>
        `pokemon?offset=${offset}&limit=${limit}`,
      transformResponse: (
        response: PokemonListResponse
      ): resultPokemonList => ({
        pokemonNames: response.results.map((pokemon) => pokemon.name),
        totalCount: response.count,
      }),
    }),

    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: PokemonAPIResponse): Pokemon => ({
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        types: response.types.map((value) => value.type.name),
        abilities: response.abilities.map((value) => value.ability.name),
        height: response.height / 10,
        weight: response.weight / 10,
      }),
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
