export const mockPokemonDetailData = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'image_url',
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  abilities: [{ ability: { name: 'overgrow' } }],
  height: 7,
  weight: 69,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
};

export const mockPokemonListResponse = {
  results: [{ name: 'bulbasaur' }, { name: 'charmander' }],
  count: 2,
};
