import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import PokemonItem from '@components/PokemonCard/PokemonItem';
import { mockPokemonDetailData } from '@utils/mockData';

const mockUseGetPokemonByNameQuery = vi.fn();
vi.mock('@api/pokemonApi', () => ({
  useGetPokemonByNameQuery: (...args: unknown[]) =>
    mockUseGetPokemonByNameQuery(...args),
  skipToken: 'skipToken',
}));

const mockStore = configureStore([]);
let store: ReturnType<typeof mockStore>;

beforeEach(() => {
  store = mockStore({
    selected: {
      selectedItems: {},
    },
  });
  store.dispatch = vi.fn();
  vi.restoreAllMocks();
});

describe('PokemonItem', () => {
  it('renders a Loader when fetching data', () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      error: undefined,
      isError: false,
    });
    render(
      <Provider store={store}>
        <PokemonItem name="bulbasaur" />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders an error message on API failure', () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: { status: 404, data: 'Not Found' },
      isError: true,
    });
    render(
      <Provider store={store}>
        <PokemonItem name="bulbasaur" />
      </Provider>
    );

    expect(screen.getByText(/"Not Found"/i)).toBeInTheDocument();
  });

  it('renders PokemonCard and handles click when data is available', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: mockPokemonDetailData,
      isFetching: false,
      error: undefined,
      isError: false,
    });

    const mockOnClick = vi.fn();
    render(
      <Provider store={store}>
        <PokemonItem name="bulbasaur" onClick={mockOnClick} />
      </Provider>
    );

    await waitFor(() => {
      const pokemonCard = screen.getByText(/bulbasaur/i).closest('div');
      expect(pokemonCard).toBeInTheDocument();

      userEvent.click(pokemonCard as Element);

      expect(mockOnClick).toHaveBeenCalledWith(mockPokemonDetailData);
    });
  });

  it('sets checkbox to checked if pokemon is selected in redux store', async () => {
    store = mockStore({
      selected: {
        selectedItems: { bulbasaur: mockPokemonDetailData },
      },
    });
    store.dispatch = vi.fn();

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: mockPokemonDetailData,
      isFetching: false,
      error: undefined,
      isError: false,
    });

    render(
      <Provider store={store}>
        <PokemonItem name="bulbasaur" />
      </Provider>
    );

    await waitFor(() => {
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });
});
