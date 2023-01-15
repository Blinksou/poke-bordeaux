import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/** INTERFACES */
import { Pokeball } from '../../interfaces/hunt/pokeballsState.interface';

@Component({
  selector: 'app-pokeball',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pokeball.component.html',
})
export class PokeballComponent {
  @Input() pokeball: Pokeball | null = null;
  @Input() isSelected = false;
}
