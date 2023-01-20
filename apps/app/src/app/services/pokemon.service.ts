import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/** DATA */
import pokemons from '../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../components/pokemon-avatar/model/pokemon';

/** RXJS */
import { map } from 'rxjs';

const pokemonsArray = Object.values(pokemons);

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  getPokemonFromId(id: string) {
    return this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(map((response) => response as Pokemon));
  }

  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * pokemonsArray.length);
    const randomPokemon = pokemonsArray[randomIndex];

    return randomPokemon as Pokemon;
  }
}
