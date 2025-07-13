export const fetchPokemonList = async () => {
  const result = await fetch('https://pokeapi.co/api/v2/pokemon');
  if (!result.ok) throw new Error(`Error status: ${result.status}`);
  return result.json();
};

export const fetchPokemonByName = async (name: string) => {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`
  );
  if (!result.ok)
    throw new Error(`Pokemon "${name}" not faund . Status: ${result.status}`);
  return result.json();
};
