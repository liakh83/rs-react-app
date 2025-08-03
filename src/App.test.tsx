import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '@components/context';
import { store } from '@redux/store';

import App from './App';

vi.mock('@components/CardList', () => ({
  default: () => <div data-testid="mock-CardList" />,
}));

beforeEach(() => {
  localStorage.clear();
});

describe('App Component', () => {
  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('inputValue', 'Picachu');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Picachu');
  });

  it('shows empty input when no saved term exists in localStorage', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('render mocked CardList component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByTestId('mock-CardList')).toBeInTheDocument();
  });

  it('save trimmed input to localStorage on search', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, '   Bulbasaur  ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('Bulbasaur');
  });

  it('updates localStorage with new search term', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Meowth');
    await userEvent.click(button);

    expect(localStorage.getItem('inputValue')).toBe('Meowth');
    expect(localStorage.getItem('searchTerm')).toBe('Meowth');
  });

  it('overwrites old value with new search', async () => {
    localStorage.setItem('searchTerm', 'oldTerm');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'newTerm');
    await userEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('newTerm');
  });
});
