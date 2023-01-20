import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { PokemonAvatarComponent } from '../../components/pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';
import { PokemonType } from '../../components/pokemon-avatar/model/pokemon';
import PokemonList from '../../../assets/pokemon/pokemons-list.json';
import { UserProfile } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { userPokemon } from '../../model/userPokemon';

const pokemonsList = Object.values(PokemonList) as unknown as Pokemon[];

export type PokedexPokemon = Pokemon & {quantity?: number};

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    PokemonAvatarComponent,
    MatGridListModule,
  ],
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexPageComponent {
  // user$: Observable<UserProfile | null>;

  public hideunknown = false;
  public hideknown = false;
  filteredPokemons: Pokemon[] = [];
  selectedTypes: [] = [];
  finalValue: [] = [];
  userPokemons: userPokemon[] = [];
  @Input() search: string | undefined;
  pokemons!: PokedexPokemon[];

  selectedPokemon: Pokemon | null = null;

  constructor(public readonly dialog: MatDialog, private readonly userService: UserService) {
    this.userService.user$.subscribe((user) => {
      if (!user) return;

      console.log(user.pokemons);
      const userPokemonsId = user.pokemons.map(p => p.pokemonId);
      const userPokemonsOwned = pokemonsList.filter(p => userPokemonsId.includes(p.id)).map(p => {
        const index = user.pokemons.findIndex(up => up.pokemonId == p.id)
        
        return {
          ...p,
          quantity: user.pokemons[index].quantity
        }
      });
      const userPokemonsUnowned = pokemonsList.filter(p => !userPokemonsId.includes(p.id));
    
      this.pokemons = [
        ...userPokemonsOwned,
        ...userPokemonsUnowned
      ];

      console.log('this.pokemons', this.pokemons)
    });
  }

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  // test(pokemon: Pokemon) {
  //   if (userPokemons.some(p => p.pokemonId === pokemon.id)) {
  //     console.log('owned')
  //     console.log('this.border', this.border)
  //   } else {
  //   }
  // }

  // checkUserPokemon(userPokemons: userPokemon[]) {
  //   if(userPokemons) {
  //     for (const pok of this.pokemons) {
  //       if (userPokemons.some(p => p.pokemonId === pok.id)) {
  //         console.log('owned')
  //         this.border = "owned"
  //         console.log('this.border', this.border)
  //       } else {
  //         this.border = "notowned"
  //       }
  //     }
  //   }
  // }

  comparePokemons(allPokemons: Pokemon[], selectedTypes: PokemonType[]) {
    for (const pokemon of allPokemons) {
      for(const type of pokemon.types) {
        if (selectedTypes.some(t => t.name === type.name)) {
          this.filteredPokemons.push(pokemon);
        }
      }
    }
    return this.filteredPokemons
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPageComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      // data: { types: this.selectedTypes, hideknown: this.hideknown }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      if (result) {
        this.finalValue = result.data.types;
        this.hideknown = result.data.hideknown;
        this.hideunknown = result.data.hideuknown;
        this.pokemons = this.comparePokemons(this.pokemons, this.finalValue);
        console.log('this.pokemons', this.pokemons)
      }
    });
  }

  trackPokemonId(index: number, pokemon: Pokemon) {
    return pokemon.id;
  }
}
