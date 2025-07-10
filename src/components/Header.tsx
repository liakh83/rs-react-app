import { Component, type ReactNode } from 'react';

export default class Header extends Component {
  render(): ReactNode {
    return (
      <header className="flex item-center gap-4 p-4">
        <input
          placeholder="input name pokemon"
          type="text"
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2"
        ></input>
        <button>search</button>
      </header>
    );
  }
}
