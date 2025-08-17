'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CardList from '@components/CardList';
import FlyoutElement from '@components/FlyoutElement/FlyoutElement';
import Header from '@components/Header';
import Pagination from '@components/Pagination';
import { PokemonItem } from '@components/PokemonCard';
import PokemonDetail from '@components/PokemonCard/PokemonDetail';
import useLocalStorageState from '@hooks/useLocalStorageState';
import { LIMIT_ITEMS } from '@utils/constants';

import type { Pokemon } from 'src/types/pokemon';

interface Props {
  totalCount: number;
  pokemonData: Pokemon[];
  selectedPokemon?: Pokemon | null;
}

const MainComponent = ({ pokemonData, totalCount, selectedPokemon }: Props) => {
  const [inputValue, setInputValue] = useLocalStorageState('inputValue', '');
  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', '');
  const [shouldThrow, setShouldThrow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams?.get('page')) || 1;
  const searchPokemonName = searchParams?.get('search') || '';
  const totalPage = Math.ceil(totalCount / LIMIT_ITEMS);

  useEffect(() => {
    const hasSearch = searchParams?.get('search');
    const hasPage = searchParams?.get('page');
    const hasLocalSearch = searchTerm;

    const newParams = new URLSearchParams(searchParams?.toString());

    if (!hasPage && !hasSearch && !hasLocalSearch) {
      newParams.set('page', '1');
    }
  }, [searchTerm, searchParams]);

  const handleChangeSearchInputValue = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);

    const newParams = new URLSearchParams(searchParams?.toString());

    if (trimmedValue) {
      newParams.set('search', trimmedValue);
      newParams.delete('page');
    } else {
      newParams.delete('search');
      newParams.set('page', '1');
    }
    router.push(`/?${newParams.toString()}`);
  };

  const handleChangePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('page', newPage.toString());
    router.push(`/?page=${newPage.toString()}`);
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('details', pokemon.name);
    router.push(`/?${newParams.toString()}`);
  };

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams?.toString());
    if (newParams.has('details')) {
      newParams.delete('details');
      router.push(`/?${newParams.toString()}`);
    }
  };

  const handleError = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Artificial error for testing the ErrorBoundary!');
  }

  return (
    <>
      <Header
        inputValue={inputValue}
        onSearchInput={handleChangeSearchInputValue}
        onSearchClick={handleSearch}
      />
      <div className="flex">
        <div className="flex-1" onClick={handleCloseDetail}>
          {!searchPokemonName && (
            <>
              <CardList
                pokemonData={pokemonData}
                onPokemonClick={handlePokemonClick}
              />
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onChangePage={handleChangePage}
              />
            </>
          )}
          {searchPokemonName && (
            <PokemonItem
              pokemon={pokemonData[0]}
              onClick={handlePokemonClick}
            />
          )}
          {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
          <button className="mt-4" onClick={handleError}>
            Error Button
          </button>
          <FlyoutElement />
        </div>
      </div>
    </>
  );
};

export default MainComponent;
