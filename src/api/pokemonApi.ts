export const fetchPokemonList = async () => {
  const result = await fetch('https://pokeapi.co/api/v2/pokemon');
  if (!result.ok) throw new Error(`Error ${result.status}`);
  return result.json();
};
