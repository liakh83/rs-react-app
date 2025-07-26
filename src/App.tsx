import { useState } from 'react';

import CardList from '@components/CardList';
import Header from '@components/Header';
import { useLocalStorageState } from '@hooks/index';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useLocalStorageState('inputValue', '');
  const [searchTerm, setSearchTerm] = useLocalStorageState('searchTerm', '');
  const [shouldThrow, setShouldThrow] = useState(false);

  const handleSearchInput = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    setSearchTerm(trimmedValue);
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
      <div className="card">
        <CardList searchTerm={searchTerm} />
        <button
          onClick={() => {
            handleError();
          }}
        >
          Error Button
        </button>
      </div>
    </>
  );
};

export default App;
