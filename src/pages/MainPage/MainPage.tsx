import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { pokemonApi } from '@api/pokemonApi';
import CardList from '@components/CardList';
import FlyoutElement from '@components/FlyoutElement';
import Header from '@components/Header';
import Pagination from '@components/Pagination';
import { PokemonItem } from '@components/PokemonCard';
import { useAppDispatch, useLocalStorageState } from '@hooks/index';
import { useAppSelector } from '@hooks/index';
import { LIMIT_ITEMS } from '@utils/constants';

import type { Pokemon } from '@utils/interfaces';

const MainPage = () => {
  const [inputValue, setInputValue] = useLocalStorageState('inputValue', '');
  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', '');
  const [totalCount, setTotalCount] = useState(0);
  const [shouldThrow, setShouldThrow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const currentPage = Number(searchParams.get('page')) || 1;
  const detailsPokemonName = searchParams.get('details');
  const searchPokemonName = searchParams.get('search');
  const totalPage = Math.ceil(totalCount / LIMIT_ITEMS);
  const limit = LIMIT_ITEMS;
  const offset = (currentPage - 1) * limit;

  const selectPokemonList = pokemonApi.endpoints.getPokemonList.select({
    offset,
    limit,
  });
  const selectPokemonResult = useAppSelector(selectPokemonList);

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

  const handleChangeSearchInputValue = (value: string) => {
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

  const handleResetAllCache = () => {
    dispatch(pokemonApi.util.resetApiState());
  };

  const handleRefetch = () => {
    if (searchPokemonName) {
      dispatch(
        pokemonApi.endpoints.getPokemonByName.initiate(searchPokemonName, {
          forceRefetch: true,
        })
      );

      if (detailsPokemonName) {
        dispatch(
          pokemonApi.endpoints.getPokemonByName.initiate(detailsPokemonName, {
            forceRefetch: true,
          })
        );
      }
      return;
    }

    dispatch(
      pokemonApi.endpoints.getPokemonList.initiate(
        { offset, limit },
        { forceRefetch: true }
      )
    );

    const pokemonNames = selectPokemonResult.data?.pokemonNames;
    pokemonNames?.forEach((pokemonName) => {
      dispatch(
        pokemonApi.endpoints.getPokemonByName.initiate(pokemonName, {
          forceRefetch: true,
        })
      );
    });

    if (detailsPokemonName) {
      dispatch(
        pokemonApi.endpoints.getPokemonByName.initiate(detailsPokemonName, {
          forceRefetch: true,
        })
      );
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
      <div className=" p-4 ">
        <button className="mx-2" onClick={handleRefetch}>
          Refresh
        </button>
        <button
          className="mx-2 bg-red-600 text-white hover: bg-red-700 transition"
          onClick={handleResetAllCache}
        >
          Reset all cache
        </button>
      </div>
      <div className="flex">
        <div className="flex-1" onClick={handleCloseDetail}>
          {!searchTerm && (
            <>
              <CardList
                page={currentPage}
                limit={LIMIT_ITEMS}
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
