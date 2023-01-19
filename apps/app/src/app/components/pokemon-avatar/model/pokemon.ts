export interface Pokemon {
  id: number;
  name: string;
  slug: string;
  types: PokemonType[];
  image: string;
  sprite: string;
}

interface PokemonType {
  name: string;
  image?: string;
}
