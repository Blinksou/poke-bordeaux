import { Injectable } from '@angular/core';

/** DATA */
import pokemons from '../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../components/pokemon-avatar/model/pokemon';
import { of } from 'rxjs';

/** RXJS */

const pokemonsArray = Object.values(pokemons);

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemonFromId(id: number | string) {
    return of(pokemonsArray[Number(id)] as Pokemon);
  }

  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * pokemonsArray.length);
    const randomPokemon = pokemonsArray[randomIndex];

    return randomPokemon as Pokemon;
  }
}
