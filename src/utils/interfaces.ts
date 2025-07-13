export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  height: number;
  weight: number;
}
