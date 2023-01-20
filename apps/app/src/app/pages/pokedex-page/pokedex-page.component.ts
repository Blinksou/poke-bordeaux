import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

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

/** MODELS */
import { userPokemon } from '../../model/userPokemon';

/** SERVICES */
import { PokedexPokemon, PokedexService } from './pokedex.service';

/** INTERFACES */
import { PokemonTypeFilter } from '../../../interfaces';

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
})
export class PokedexPageComponent {
  // Main properties
  pokemons!: PokedexPokemon[];
  filteredPokemons: PokedexPokemon[] = [];

  // Filter properties
  public hideunknown = false;
  public hideknown = false;
  selectedTypes: [] = [];
  finalValue: PokemonTypeFilter[] = [];
  userPokemons: userPokemon[] = [];
  search = '';
  selectedPokemon: Pokemon | null = null;

  constructor(
    public readonly dialog: MatDialog,
    private readonly pokedexService: PokedexService
  ) {
    this.pokedexService.pokedexPokemons$.subscribe((pokemons) => {
      if (!pokemons) return;
      this.pokemons = pokemons;
      this.handleFilters(this.selectedTypes);
    });
  }

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  handleFilters(types: PokemonTypeFilter[]) {
    const formattedTypes = types.map((t) => t?.name?.toLowerCase());

    this.filteredPokemons =
      types?.length < 1
        ? this.pokemons
        : this.pokemons.filter((p) =>
            p.types
              .map((t) => t.name.toLowerCase())
              .some((t) => formattedTypes.includes(t))
          );
  }

  handleSearchFilter() {
    this.filteredPokemons = this.pokemons.filter((p) =>
      p.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPageComponent, {
      width: '400px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      // data: { types: this.selectedTypes, hideknown: this.hideknown }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.finalValue = result.data.types;
        this.hideknown = result.data.hideknown;
        this.hideunknown = result.data.hideuknown;

        this.handleFilters(this.finalValue);
      }
    });
  }

  trackPokemonId(index: number, pokemon: Pokemon) {
    return pokemon.id;
  }
}
