import { Injectable } from '@angular/core';

/** DATA */
import pokemons from '../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../components/pokemon-avatar/model/pokemon';
import { map, of } from 'rxjs';
import { UserService } from './user.service';

/** RXJS */

const pokemonsList: { [key: string]: Pokemon } = pokemons;
const pokemonsArray = Object.values(pokemons);

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly userService: UserService) {}

  getPokemonFromId(id: number | string) {
    return of(pokemonsList[id]);
  }

  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * pokemonsArray.length);
    const randomPokemon = pokemonsArray[randomIndex];

    return randomPokemon as Pokemon;
  }

  getPokemonsFromUser() {
    return this.userService.user$.pipe(
      map((user) => {
        if (!user) return null;

        return user.pokemons;
      }),
      map((pokemons) => {
        if (!pokemons) return null;

        return pokemons.map(
          (pokemon) => pokemonsArray[Number(pokemon.pokemonId)] as Pokemon
        );
      })
    );
  }
}
