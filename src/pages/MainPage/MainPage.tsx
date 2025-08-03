import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import CardList from '@components/CardList';
import FlyoutElement from '@components/FlyoutElement';
import Header from '@components/Header';
import Pagination from '@components/Pagination';
import { PokemonItem } from '@components/PokemonCard';
import { useLocalStorageState } from '@hooks/index';

import type { Pokemon } from '@utils/interfaces';

const LIMIT = 12;

const MainPage = () => {
  const [inputValue, setInputValue] = useLocalStorageState('inputValue', '');
  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', '');
  const [totalCount, setTotalCount] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPage = Math.ceil(totalCount / LIMIT);

  useEffect(() => {
    const hasSearch = searchParams.get('search');
    const hasPage = searchParams.get('page');
    const hasLocalSearch = searchTerm;

    const newParams = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (!hasSearch && hasLocalSearch) {
      newParams.set('search', hasLocalSearch);
      shouldUpdate = true;
    }

    if (!hasPage && !hasSearch && !hasLocalSearch) {
      newParams.set('page', '1');
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(newParams);
    }
  }, [searchTerm, setSearchParams, searchParams]);

  const handleSearchInput = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);

    const newParams = new URLSearchParams(searchParams);

    if (trimmedValue) {
      newParams.set('search', trimmedValue);
      newParams.delete('page');
    } else {
      newParams.delete('search');
      newParams.set('page', '1');
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleChangePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', pokemon.name);
    setSearchParams(newParams);
  };

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.has('details')) {
      newParams.delete('details');
      setSearchParams(newParams);
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
        onSearchInput={handleSearchInput}
        onSearchClick={handleSearch}
      />
      <div className="flex">
        <div className="flex-1 card" onClick={handleCloseDetail}>
          {!searchTerm && (
            <>
              <CardList
                page={currentPage}
                limit={LIMIT}
                onTotalCountChange={setTotalCount}
                onPokemonClick={handlePokemonClick}
              />
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                onChangePage={handleChangePage}
              />
            </>
          )}
          {searchTerm && (
            <PokemonItem name={searchTerm} onClick={handlePokemonClick} />
          )}
          <button
            className="mt-4"
            onClick={() => {
              handleError();
            }}
          >
            Error Button
          </button>
          <FlyoutElement />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
