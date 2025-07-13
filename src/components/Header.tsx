import { Component, type ReactNode } from 'react';

interface Props {
  inputValue: string;
  onSearchInput: (value: string) => void;
  onSearchClick: () => void;
}

export default class Header extends Component<Props> {
  render(): ReactNode {
    const { inputValue, onSearchInput, onSearchClick } = this.props;
    return (
      <header className="flex item-center gap-4 p-4">
        <input
          value={inputValue}
          onChange={(e) => onSearchInput(e.target.value)}
          placeholder="input name pokemon"
          type="text"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2"
        ></input>
        <button onClick={onSearchClick}>search</button>
      </header>
    );
  }
}
