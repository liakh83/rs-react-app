import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loader from '@components/Loader';

describe('Render loader', () => {
  it('shows loading spinner initially', () => {
    render(<Loader />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
