import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
} from '@angular/core';

/** MATERIAL */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

/** COMPONENTS */
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { PokemonAvatarComponent } from '../../components/pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';
import { PokemonType } from '../../components/pokemon-avatar/model/pokemon';

/** MODELS */
import { userPokemon } from '../../model/userPokemon';

/** SERVICES */
import { PokedexPokemon, PokedexService } from './pokedex.service';

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
  styleUrls: ['./pokedex-page.component.scss']
})
export class PokedexPageComponent {

  // Main properties
  pokemons!: PokedexPokemon[];

  // Filter properties
  public hideunknown = false;
  public hideknown = false;
  filteredPokemons: Pokemon[] = [];
  selectedTypes: [] = [];
  finalValue: [] = [];
  userPokemons: userPokemon[] = [];
  search: string | undefined;
  selectedPokemon: Pokemon | null = null;

  constructor(public readonly dialog: MatDialog, private readonly pokedexService: PokedexService) {
    this.pokedexService.pokedexPokemons$.subscribe((pokemons) => {
      if(!pokemons) return;
      this.pokemons = pokemons;
    })
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
