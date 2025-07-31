import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import AboutPage from '@pages/AboutPage';

describe('AboutPage', () => {
  it('renders AboutPage with content and links', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /about this app/i
    );

    expect(
      screen.getByRole('link', { name: /RS School React course/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');

    expect(screen.getByRole('link', { name: /PokéAPI/i })).toHaveAttribute(
      'href',
      'https://pokeapi.co/'
    );

    expect(
      screen.getByRole('link', { name: /Vladimir Liakh/i })
    ).toHaveAttribute('href', 'https://github.com/liakh83');

    expect(screen.getByRole('link', { name: /RS-REACT-APP/i })).toHaveAttribute(
      'href',
      'https://github.com/liakh83/rs-react-app'
    );

    const backButton = screen.getByRole('link', { name: /back to home/i });
    expect(backButton).toHaveAttribute('href', '/');
    expect(backButton).toHaveClass('bg-blue-600');
  });
});
