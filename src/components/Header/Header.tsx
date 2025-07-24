interface Props {
  inputValue: string;
  onSearchInput: (value: string) => void;
  onSearchClick: () => void;
}

const Header = ({ inputValue, onSearchInput, onSearchClick }: Props) => {
  return (
    <header className="flex items-center justify-center gap-4 p-4">
      <input
        value={inputValue}
        onChange={(e) => onSearchInput(e.target.value)}
        placeholder="input name pokemon"
        type="text"
        className="border rounded px-4 py-2 focus:outline-none focus:ring-2"
      ></input>
      <button onClick={onSearchClick} aria-label="Search for Pokemon">
        search
      </button>
    </header>
  );
};

export default Header;
