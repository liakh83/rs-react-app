import { Component, type ReactNode } from 'react';
import { fetchPokemonList, fetchPokemonByName } from '../api/pokemonApi';

interface Props {
  searchTerm: string;
}

interface State {
  pokemonItems: { name: string; url: string }[];
  isLoading: boolean;
  error: string | null;
}

export default class CardList extends Component<Props, State> {
  state: State = {
    pokemonItems: [],
    isLoading: true,
    error: null,
  };

  componentDidMount(): void {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.loadData();
    }
  }

  loadData = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const { searchTerm } = this.props;
      let result;
      if (searchTerm === '') {
        const data = await fetchPokemonList();
        result = data.results;
      } else {
        const data = await fetchPokemonByName(searchTerm);
        result = [{ name: data.name, url: data.species.url }];
      }
      this.setState({
        pokemonItems: result,
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
