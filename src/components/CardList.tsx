import { Component, type ReactNode } from 'react';
import { fetchPokemonList, fetchPokemonByName } from '../api/pokemonApi';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
}

interface Props {
  searchTerm: string;
}

interface State {
  pokemonItems: Pokemon[];
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
    if (this.props.searchTerm === '') {
      this.loadAllPokemons();
    } else {
      this.loadSinglePokemon(this.props.searchTerm);
    }
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      if (this.props.searchTerm === '') {
        this.loadAllPokemons();
      } else {
        this.loadSinglePokemon(this.props.searchTerm);
      }
    }
  }

  async loadAllPokemons() {
    this.setState({ isLoading: true, error: null });
    try {
      const list = await fetchPokemonList();
      const detailed = await Promise.all(
        list.results.map((item: { name: string }) =>
          fetchPokemonByName(item.name)
        )
      );
      this.setState({ pokemonItems: detailed, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ isLoading: false, error: error.message || 'Error' });
      } else {
        this.setState({ isLoading: false, error: 'Unknown error' });
      }
    }
  }

  async loadSinglePokemon(name: string) {
    this.setState({ isLoading: true, error: null });
    try {
      const single = await fetchPokemonByName(name);
      this.setState({ pokemonItems: [single], isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ isLoading: false, error: error.message || 'Error' });
      } else {
        this.setState({ isLoading: false, error: 'Unknown error' });
      }
    }
  }

  render(): ReactNode {
    const { pokemonItems, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-10 gap-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div>Loading... </div>
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    if (!isLoading && !error && pokemonItems.length === 0) {
      return <div className="text-red-500">No results found</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pokemonItems.map((pokemon) => (
          <div
            key={pokemon.id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold capitalize mb-2">
              {pokemon.name}
            </h2>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto mb-2"
            />
            <p>
              <strong>Types:</strong> {pokemon.types.join(', ')}
            </p>
            <p>
              <strong>Abilities:</strong> {pokemon.abilities.join(', ')}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.height} m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight} kg
            </p>
          </div>
        ))}
      </div>
    );
  }
}
