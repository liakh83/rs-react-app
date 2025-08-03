import { useTheme } from './theme-context';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="hidden"
        />
        <div className="w-10 h-5 bg-gray-300 rounded-full relative">
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${
              theme === 'dark' ? 'translate-x-5 bg-gray-800' : 'bg-white'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
