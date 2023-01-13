import { PokemonType } from "../../../../interfaces";

export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    image: string;
    // quantity: number;
}