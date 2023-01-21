import { Injectable } from '@angular/core';
import { filter, map, of } from 'rxjs';

/** DATA */
import pokemons from '../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../components/pokemon-avatar/model/pokemon';
import { UserService } from './user.service';
import { NavigationEnd, Router } from '@angular/router';

/** RXJS */

const pokemonsList: { [key: string]: Pokemon } = pokemons;
const pokemonsArray = Object.values(pokemons);

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  userCoords: { lat: number; lng: number } | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.url !== '/hunt' || !navigator.geolocation) return;

        navigator.geolocation.watchPosition(
          (position) => {
            this.userCoords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          (error) => {
            console.log(`Error: ${error.message}`);
          }
        );
      });
  }

  getPokemonFromId(id: number | string) {
    return of(pokemonsList[id]);
  }

  getRandomPokemon(): Pokemon {
    let index: number;

    if (this.userCoords) {
      let latStr = this.userCoords.lat.toString();
      let lngStr = this.userCoords.lng.toString();

      while (latStr.length < 5) {
        latStr = `0${latStr}`;
      }
      while (lngStr.length < 5) {
        lngStr = `0${lngStr}`;
      }

      index =
        (Number(latStr.slice(-5)) + Number(lngStr.slice(-5))) %
        pokemonsArray.length;
    } else {
      index = Math.floor(Math.random() * pokemonsArray.length);
    }

    return pokemonsArray[index] as Pokemon;
  }

  getPokemonsFromUser() {
    return this.userService.user$.pipe(
      map((user) => {
        if (!user) return null;

        return user.pokemons;
      }),
      map((pokemons) => {
        if (!pokemons) return [];

        return pokemons.map(
          (pokemon) => pokemonsList[pokemon.pokemonId] as Pokemon
        );
      })
    );
  }
}
