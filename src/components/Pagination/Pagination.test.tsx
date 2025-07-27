import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('calls onChangePage with currentPage - 1 when clicking "Previous"', async () => {
    const onChangePage = vi.fn();
    render(
      <Pagination currentPage={2} totalPage={5} onChangePage={onChangePage} />
    );

    await userEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('calls onChangePage with currentPage + 1 when clicking "Next"', async () => {
    const onChangePage = vi.fn();
    render(
      <Pagination currentPage={2} totalPage={5} onChangePage={onChangePage} />
    );

    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onChangePage).toHaveBeenCalledWith(3);
  });

  it('disables "Previous" button on first page', () => {
    const onChangePage = vi.fn();
    render(
      <Pagination currentPage={1} totalPage={5} onChangePage={onChangePage} />
    );

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables "Next" button on last page', () => {
    const onChangePage = vi.fn();
    render(
      <Pagination currentPage={5} totalPage={5} onChangePage={onChangePage} />
    );

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('renders current and total page', () => {
    render(
      <Pagination currentPage={3} totalPage={5} onChangePage={() => {}} />
    );

    expect(screen.getByText('3/5')).toBeInTheDocument();
  });
});
