import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '@components/CardList';
import Header from '@components/Header';
import Pagination from '@components/Pagination';
import { PokemonDetail } from '@components/PokemonCard';
import useLocalStorageState from '@hooks/useLocalStorageState';

import type { Pokemon } from '@utils/interfaces';

const LIMIT = 30;

const MainPage = () => {
  const [inputValue, setInputValue] = useLocalStorageState('inputValue', '');
  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', '');
  const [totalCount, setTotalCount] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage = Math.ceil(totalCount / LIMIT);

  useEffect(() => {
    setSelectedPokemon(null);
  }, [currentPage, searchTerm]);

  const handleSearchInput = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);
    setSearchParams({ page: '1' });
  };

  const handleChangePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setSearchParams({ page: currentPage.toString(), details: pokemon.name });
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
    setSearchParams({ page: currentPage.toString() });
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
        onSearchInput={handleSearchInput}
        onSearchClick={handleSearch}
      />
      <div className="flex">
        <div className="flex-1 card">
          <CardList
            searchTerm={searchTerm}
            page={currentPage}
            limit={LIMIT}
            onTotalCountChange={setTotalCount}
            onPokemonClick={handlePokemonClick}
          />
          {!searchTerm && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={handleChangePage}
            />
          )}
          <button
            className="mt-4"
            onClick={() => {
              handleError();
            }}
          >
            Error Button
          </button>
        </div>
        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
