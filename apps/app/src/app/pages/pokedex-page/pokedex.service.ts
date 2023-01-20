import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';

type Pokedex = Array<{
    pokemon: Pokemon;
    userQuantity?: number;
}>

@Injectable({
    providedIn: 'root',
})
export class PokedexService {
    pokedex$: Observable<Pokedex | null> = of(null);
}


/*

1 - filter sur les pokemons 
*/