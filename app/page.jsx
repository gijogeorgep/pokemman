import { getPokemon, getPokemonList } from "@/lib/pokemon";
import PokemonExplorer from "@/components/PokemonExplorer";

export const revalidate = 3600;

export default async function HomePage() {
  const summaries = await getPokemonList(48, 0);
  const pokemon = await Promise.all(
    summaries.map((item) => getPokemon(item.name).catch(() => null))
  );

  return <PokemonExplorer pokemon={pokemon.filter(Boolean)} />;
}
