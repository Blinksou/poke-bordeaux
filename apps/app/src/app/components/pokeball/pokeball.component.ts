import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Pokeball } from './model/pokeball';

@Component({
  selector: 'app-pokeball',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pokeball.component.html',
})
export class PokeballComponent {
  @Input() pokeball: Pokeball | null = null;
}
