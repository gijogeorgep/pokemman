import axios from "axios";

export const API = "https://pokeapi.co/api/v2";

const client = axios.create({
  baseURL: API,
  timeout: 10000,
});

export function artwork(pokemon) {
  return (
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
  );
}

export function titleCase(value) {
  if (!value) return "";
  return value
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export async function getPokemonList(limit = 48, offset = 0) {
  try {
    const res = await client.get("/pokemon", { params: { limit, offset } });
    return res.data.results;
  } catch {
    throw new Error("Could not load Pokemon list");
  }
}

export async function getPokemon(idOrName) {
  try {
    const name = encodeURIComponent(String(idOrName).toLowerCase().trim());
    const res = await client.get(`/pokemon/${name}`);
    return res.data;
  } catch {
    throw new Error(`Pokemon "${idOrName}" not found`);
  }
}
