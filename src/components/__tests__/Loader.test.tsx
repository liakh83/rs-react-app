import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CardList from '@components/CardList';

describe('Render loader', () => {
  it('shows loading spinner initially', () => {
    render(
      <CardList
        page={1}
        limit={30}
        onTotalCountChange={vi.fn()}
        onPokemonClick={vi.fn()}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
