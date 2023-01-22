export interface PokedexFilters {
  hideKnownNotOwned: boolean;
  hideUnknown: boolean;
  selectedTypes: PokemonTypeFilter[];
  searchNameValue: string;
}

export interface PokemonTypeFilter {
  name: string;
  image?: string;
  checked: boolean;
  englishName?: string;
  id?: string;
}
