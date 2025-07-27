import { useNavigate } from 'react-router-dom';

interface Props {
  inputValue: string;
  onSearchInput: (value: string) => void;
  onSearchClick: () => void;
}

const Header = ({ inputValue, onSearchInput, onSearchClick }: Props) => {
  const navigate = useNavigate();

  const handleGoToAbout = () => {
    navigate('/about');
  };

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
      <button onClick={handleGoToAbout}>About</button>
    </header>
  );
};

export default Header;
