import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { PokemonAvatarComponent } from '../../components/pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';
import { PokemonTypeFilter } from '../../../interfaces';
import PokemonList from '../../../assets/pokemon/pokemons-list.json';

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
export class PokedexPageComponent implements OnInit {
  constructor(public readonly dialog: MatDialog) {}

  filteredPokemons: Pokemon[] = [];

  @Input() search: string | undefined;
  @Input() pokemons!: Pokemon[];
  @Input() types: PokemonTypeFilter[] = [
    {
      name: 'normal',
      checked: true,
    },
  ];

  selectedPokemon: Pokemon | null = null;

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  ngOnInit() {
    this.pokemons = Object.values(PokemonList) as unknown as Pokemon[];

    this.comparePokemons(this.pokemons, this.types);
  }

  comparePokemons(allPokemons: Pokemon[], selectedTypes: PokemonTypeFilter[]) {
    for (const pokemon of allPokemons) {
      console.log('pokemon.types', pokemon.types);
      console.log('selectedTypes[0]', selectedTypes[0]);
      if (pokemon.types.includes(selectedTypes[0])) {
        console.log('true');
      } else {
        console.log('false');
      }
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(FilterPageComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
