import { Injectable } from '@angular/core';

/** DATA */
import PokemonList from '../../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';

/** SERVICES */
import { UserService } from '../../services/user.service';

/** RXJS */
import { map, Observable, of, take } from 'rxjs';
import { doc } from '@firebase/firestore';
import { Firestore, updateDoc } from '@angular/fire/firestore';

export type PokedexPokemon = Pokemon & {
  quantity?: number;
  isFavorite?: boolean;
};
type OwnedAndUnownedUserPokemons = {
  owned: PokedexPokemon[];
  unowned: PokedexPokemon[];
};

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  pokedexPokemons$: Observable<PokedexPokemon[] | null> = of(null);

  constructor(
    private readonly firestore: Firestore,
    readonly userService: UserService
  ) {
    const pokemonsList = Object.values(PokemonList) as unknown as Pokemon[];

    this.pokedexPokemons$ = this.userService.user$.pipe(
      map((user) => {
        if (!user) return null;

        const userPokemons = user.pokemons?.length ? user.pokemons : [];
        const userPokemonsMap = new Map(
          userPokemons.map((p) => [+p.pokemonId, p])
        );

        const temp = pokemonsList.reduce(
          (acc, p) => {
            if (userPokemonsMap.has(p.id)) {
              acc.owned.push({
                ...p,
                quantity: userPokemonsMap.get(p.id)?.quantity,
                isFavorite: user.favorites.includes(p.id),
              });
            } else {
              acc.unowned.push({
                ...p,
                isFavorite: user.favorites.includes(p.id),
              });
            }

            return acc;
          },
          { owned: [], unowned: [] } as OwnedAndUnownedUserPokemons
        );

        return [...temp.owned, ...temp.unowned];
      })
    );
  }

  handleFavoritePokemon(pokemon: PokedexPokemon) {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      const index = user.favorites.findIndex(
        (pokemonId) => pokemonId === pokemon.id
      );

      if (index >= 0) {
        user.favorites.splice(index, 1);
      } else {
        user.favorites.push(pokemon.id);
      }

      const userDocument = doc(this.firestore, `users/${user.id}`);
      updateDoc(userDocument, {
        favorites: user.favorites,
      });
    });
  }
}
