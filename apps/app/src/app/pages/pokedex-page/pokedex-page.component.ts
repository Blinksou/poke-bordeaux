import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterPageComponent } from '../filter-page/filter-page.component';
import { PokemonAvatarComponent } from '../../components/pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';


@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, PokemonAvatarComponent, MatGridListModule],
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss'],
})
export class PokedexPageComponent {

  constructor(public dialog: MatDialog) {}

  @Input() search: string | undefined;
  @Input() pokemons: Pokemon[] | null = [
    {
      name: 'Pikachu',
      type: 'Electric',
      image: '',
      quantity: 1
    },
    {
      name: 'Bulbizarre',
      type: 'Terre',
      image: '',
      quantity: 3
    }
  ] 

  selectedPokemon: Pokemon | null = null;

  setSelectedPokemon(p: Pokemon) {
    this.selectedPokemon = p;
  }

  unselectPokemon() {
    this.selectedPokemon = null;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterPageComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
