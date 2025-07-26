import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import Header from './Header';

describe('Search component tests', () => {
  it('renders search input and search button', () => {
    render(
      <Header inputValue="" onSearchInput={() => {}} onSearchClick={() => {}} />
    );

    expect(
      screen.getByPlaceholderText(/input name pokemon/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearchInput when taping in input', async () => {
    const mockOnSearchInput = vi.fn();

    render(
      <Header
        inputValue=""
        onSearchInput={mockOnSearchInput}
        onSearchClick={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/input name pokemon/i);
    await userEvent.type(input, 'pikachu');

    expect(mockOnSearchInput).toBeCalledTimes(7);
  });

  it('calls onSearchClick when button is clicked', async () => {
    const mockOnSearchClick = vi.fn();

    render(
      <Header
        inputValue=""
        onSearchInput={() => {}}
        onSearchClick={mockOnSearchClick}
      />
    );

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    expect(mockOnSearchClick).toHaveBeenCalled();
  });
});
