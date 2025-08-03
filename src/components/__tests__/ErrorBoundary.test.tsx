import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@components/ErrorComponents';

import type { JSX } from 'react';

function ProblemChild(): JSX.Element {
  throw new Error('Error thrown from problem child');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI on error', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const fallbackHeading = await screen.findByText(
      /Artificial error for testing the ErrorBoundary!/i
    );

    expect(fallbackHeading).toBeInTheDocument();
    errorSpy.mockRestore();
  });
});
