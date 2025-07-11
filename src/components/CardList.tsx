import { Component, type ReactNode } from 'react';
import { fetchPokemonList } from '../api/pokemonApi';

interface State {
  pokemonItems: { name: string; url: string }[];
  isLoading: boolean;
  error: string | null;
}

export default class CardList extends Component<object, State> {
  state: State = {
    pokemonItems: [],
    isLoading: true,
    error: null,
  };

  componentDidMount = async () => {
    try {
      const data = await fetchPokemonList();
      this.setState({
        pokemonItems: data.results,
        isLoading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ isLoading: false, error: error.message || 'Error' });
      } else {
        this.setState({ isLoading: false, error: 'Unknown error' });
      }
    }
  };

  render(): ReactNode {
    const { pokemonItems, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading... </div>;
    }
    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    return (
      <ul className="gap-2">
        {pokemonItems.map((pokemon) => (
          <li key={pokemon.name} className="flex gap-2">
            <p>{pokemon.name}</p>
            <p>{pokemon.url}</p>
          </li>
        ))}
      </ul>
    );
  }
}
