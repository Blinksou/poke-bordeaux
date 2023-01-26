export interface Pokemon {
  id: number;
  name: string;
  slug: string;
  types: PokemonType[];
  image: string;
}

export interface PokemonType {
  name: string;
  image?: string;
}
