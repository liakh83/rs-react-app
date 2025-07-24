import CardList from '@components/CardList/CardList';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Render loader', () => {
  it('shows loading spinner initially', () => {
    render(<CardList searchTerm="" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
