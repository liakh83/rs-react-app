import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import FlyoutElement from '@components/FlyoutElement';
import { clearItems } from '@redux/selectedItemsSlice';

const mockStore = configureStore([]);

describe('FlyoutElement', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      selected: {
        selectedItems: {
          charmander: {
            name: 'charmander',
            id: 4,
            height: 0.6,
            weight: 8.5,
            types: ['fire'],
            abilities: ['blaze', 'solar-power'],
          },
        },
      },
    });

    store.dispatch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders selected count', () => {
    render(
      <Provider store={store}>
        <FlyoutElement />
      </Provider>
    );
    expect(screen.getByText(/Selected: 1/i)).toBeInTheDocument();
  });

  it('does not render if no items selected', () => {
    const emptyStore = mockStore({
      selected: {
        selectedItems: {},
      },
    });
    render(
      <Provider store={emptyStore}>
        <FlyoutElement />
      </Provider>
    );
    expect(screen.queryByText(/Selected:/i)).toBeNull();
  });

  it('dispatches clearItems on Unselect all click', async () => {
    render(
      <Provider store={store}>
        <FlyoutElement />
      </Provider>
    );
    const button = screen.getByText(/Unselect all/i);
    await userEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith(clearItems());
  });
});
