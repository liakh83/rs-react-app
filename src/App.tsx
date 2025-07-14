import { Component, type ReactNode } from 'react';
import Header from './components/Header';
import CardList from './components/CardList';
import './App.css';

interface State {
  inputValue: string;
  searchTerm: string;
  shouldThrow: boolean;
}

export default class App extends Component<object, State> {
  state: State = {
    inputValue: localStorage.getItem('inputValue') || '',
    searchTerm: localStorage.getItem('searchTerm') || '',
    shouldThrow: false,
  };

  handleSearchInput = (value: string) => {
    this.setState({ inputValue: value });
    localStorage.setItem('inputValue', value);
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.setState({ searchTerm: trimmed });
  };

  handleError = () => {
    this.setState({ shouldThrow: true });
  };

  render(): ReactNode {
    const { inputValue, searchTerm, shouldThrow } = this.state;

    if (shouldThrow) {
      throw new Error('Artificial error for testing the ErrorBoundary!');
    }

    return (
      <>
        <Header
          inputValue={inputValue}
          onSearchInput={this.handleSearchInput}
          onSearchClick={this.handleSearch}
        />
        <div className="card">
          <CardList searchTerm={searchTerm} />
          <button
            onClick={() => {
              this.handleError();
            }}
          >
            Error Button
          </button>
        </div>
      </>
    );
  }
}
