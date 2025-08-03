import { render, screen } from '@testing-library/react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import ErrorPage from '@components/ErrorComponents/ErrorPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

describe('ErrorPage', () => {
  it('renders status and statusText when error is RouteErrorResponse', () => {
    const mockedError = { status: 404, statusText: 'Not Found' };

    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedError
    );
    (
      isRouteErrorResponse as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(true);

    render(<ErrorPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders unexpected error when error is instance of Error', () => {
    const mockedError = new Error('Something broke');

    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedError
    );
    (
      isRouteErrorResponse as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(false);

    render(<ErrorPage />);

    expect(
      screen.getByText('Unexpected Application Error')
    ).toBeInTheDocument();
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('renders fallback when error is not Error instance or route error', () => {
    const mockedError = { message: 'Unknown error', some: 'extra' };

    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockedError
    );
    (
      isRouteErrorResponse as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(false);

    render(<ErrorPage />);

    expect(
      screen.getByText('Unexpected Application Error')
    ).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
