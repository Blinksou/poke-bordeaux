export interface PokeApi {
    count:    number;
    next:     null;
    previous: null;
    results:  Type[];
}

export interface Type {
    name: string;
    url:  string;
}