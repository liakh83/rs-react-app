import { Component, type ReactNode } from 'react';
import Header from './components/Header';
import CardList from './components/CardList';
import './App.css';

interface State {
  inputValue: string;
  searchTerm: string;
}

export default class App extends Component<object, State> {
  state: State = {
    inputValue: localStorage.getItem('inputValue') || '',
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  handleSearchInput = (value: string) => {
    this.setState({ inputValue: value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.setState({ searchTerm: trimmed });
  };

  render(): ReactNode {
    const { inputValue, searchTerm } = this.state;
    return (
      <>
        <Header
          inputValue={inputValue}
          onSearchInput={this.handleSearchInput}
          onSearchClick={this.handleSearch}
        />
        <div className="card">
          <CardList searchTerm={searchTerm} />
          <button onClick={() => {}}>Error Button</button>
        </div>
      </>
    );
  }
}
