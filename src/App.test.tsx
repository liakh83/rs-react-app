import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';

vi.mock('@components/CardList', () => ({
  default: () => <div data-testid="mock-CardList" />,
}));

beforeEach(() => {
  localStorage.clear();
});

describe('App Component', () => {
  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('inputValue', 'Picachu');

    render(<App />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Picachu');
  });

  it('shows empty input when no saved term exists in localStorage', () => {
    render(<App />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('render mocked CardList component', () => {
    render(<App />);
    expect(screen.getByTestId('mock-CardList')).toBeInTheDocument();
  });

  it('save trimed input to localStorage on search', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, '   Bulbasaur  ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Bulbasaur');
  });

  it('updates localStoradge with new search term', async () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Meowth');
    await userEvent.click(button);

    expect(localStorage.getItem('inputValue')).toBe('Meowth');
    expect(localStorage.getItem('searchTerm')).toBe('Meowth');
  });

  it('loads existing value from localStorage on init', async () => {
    localStorage.setItem('inputValue', 'Charmander');

    render(<App />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('Charmander');
  });

  it('overwrites old value with new search', async () => {
    localStorage.setItem('searchTerm', 'oldTerm');

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'newTerm');
    await userEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('newTerm');
  });

  it('renders fallback UI on error', async () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const errorButton = screen.getByRole('button', { name: /Error Button/i });
    await userEvent.click(errorButton);

    expect(
      await screen.findByText(
        /Artificial error for testing the ErrorBoundary!/i
      )
    ).toBeInTheDocument();
  });
});
