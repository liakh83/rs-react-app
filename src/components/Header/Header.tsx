'use client';
import Link from 'next/link';
import { type ChangeEvent } from 'react';

interface Props {
  inputValue: string;
  onSearchInput: (value: string) => void;
  onSearchClick: () => void;
}

const Header = ({ inputValue, onSearchInput, onSearchClick }: Props) => {
  const handleSearchChangeInput = (event: ChangeEvent<HTMLInputElement>) =>
    onSearchInput(event.target.value);

  return (
    <header className="flex items-center justify-center gap-4 p-4">
      <input
        value={inputValue}
        onChange={handleSearchChangeInput}
        placeholder="input name pokemon"
        type="text"
        className="border rounded px-4 py-2 focus:outline-none focus:ring-2"
      ></input>
      <button onClick={onSearchClick} aria-label="Search for Pokemon">
        search
      </button>
      <Link href="/about">About</Link>
    </header>
  );
};

export default Header;
