import { Injectable } from '@angular/core';

/** DATA */
import PokemonList from '../../../assets/pokemon/pokemons-list.json';

/** MODEL */
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';

/** SERVICES */
import { UserService } from '../../services/user.service';

/** RXJS */
import { map, Observable, of } from 'rxjs';

export type PokedexPokemon = Pokemon & {quantity?: number};
type OwnedAndUnownedUserPokemons = {
  owned: PokedexPokemon[],
  unowned: PokedexPokemon[]
}

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  pokedexPokemons$: Observable<PokedexPokemon[] | null> = of(null);

	// this.huntState$ = this.userService.user$.pipe(
	// 	map((userProfile) => {
	// 		if (!userProfile) return null;
			
	// 		const hunt = userProfile.hunt;
	// 		const energiesState = this.determineEnergiesState(hunt.energiesDate);
	// 		const pokeballsState: PokeballsState = this.determinePokeballsState(hunt.pokeballs);

	// 		return {
	// 			energiesState,
	// 			pokeballsState,
	// 		};
	// 	})
	// )

	constructor(
		readonly userService: UserService
	) {
		const pokemonsList = Object.values(PokemonList) as unknown as Pokemon[];

		this.pokedexPokemons$ = this.userService.user$.pipe(
			map((user) => {
      	if (!user) return null;

      	const userPokemonsMap = new Map(user.pokemons.map(p => [+p.pokemonId, p]));
      
				const temp = pokemonsList.reduce((acc, p) => {
						if (userPokemonsMap.has(p.id)) {
							acc.owned.push({...p, quantity: userPokemonsMap.get(p.id)?.quantity});
						} else {
							acc.unowned.push(p);
						}

						return acc;
					}, {owned: [], unowned: []} as OwnedAndUnownedUserPokemons);
				
				return [...temp.owned, ...temp.unowned];
    }));
	}
}