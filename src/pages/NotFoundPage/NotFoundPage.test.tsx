import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders NotFoundPage', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
