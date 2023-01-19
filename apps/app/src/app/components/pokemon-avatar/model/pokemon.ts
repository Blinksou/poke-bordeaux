import { PokemonType } from '../../../../interfaces';

export interface Pokemon {
  id: number;
  name: string;
  slug: string;
  types: PokemonType[];
  image: string;
  sprite: string;
}
