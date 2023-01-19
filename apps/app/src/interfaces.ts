export interface PokeApi {
    count:    number;
    next:     null;
    previous: null;
    results:  PokemonType[];
}

export interface PokemonType {
    name: string;
    checked: boolean;
    // url:  string;
}