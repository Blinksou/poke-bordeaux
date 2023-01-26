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

/** SERVICES */
import { PokedexPokemon, PokedexService } from './pokedex.service';

/** INTERFACES */
import { PokedexFilters } from '../../../interfaces';

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
  pokedexFilters: PokedexFilters = {
    hideUnknown: false,
    hideKnownNotOwned: false,
    selectedTypes: [],
    searchNameValue: '',
  };

  // Pokemon informations
  selectedPokemon: Pokemon | null = null;

  constructor(
    public readonly dialog: MatDialog,
    private readonly pokedexService: PokedexService
  ) {
    this.pokedexService.pokedexPokemons$.subscribe((pokemons) => {
      if (!pokemons) return;
      this.pokemons = pokemons;
      this.handleFilters();
    });
  }

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  handleFilters() {
    const selectedTypes = new Set<string>(
      this.pokedexFilters.selectedTypes.map((t) => t.name.toLowerCase())
    );
    const hideUnknown = this.pokedexFilters.hideUnknown;
    const hideKnownNotOwned = this.pokedexFilters.hideKnownNotOwned;

    this.filteredPokemons = this.pokemons.filter((pokemon) => {
      if (selectedTypes.size > 0) {
        if (
          !pokemon.types.some((t) => selectedTypes.has(t.name.toLowerCase()))
        ) {
          return false;
        }
      }

      if (hideUnknown && pokemon.quantity === undefined) return false;
      if (hideKnownNotOwned && pokemon.quantity === 0) return false;

      return true;
    });
  }

  handleSearchFilter() {
    this.filteredPokemons = this.pokemons.filter((p) =>
      p.name
        .toLowerCase()
        .includes(this.pokedexFilters.searchNameValue.toLowerCase())
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterPageComponent, {
      width: '400px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: this.pokedexFilters,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pokedexFilters = {
          ...this.pokedexFilters,
          selectedTypes: result.data.types,
          hideKnownNotOwned: result.data.hideKnownNotOwned,
          hideUnknown: result.data.hideUnknown,
        };
        this.handleFilters();
      }
    });
  }

  trackPokemonId(index: number, pokemon: Pokemon) {
    return pokemon.id;
  }
}
