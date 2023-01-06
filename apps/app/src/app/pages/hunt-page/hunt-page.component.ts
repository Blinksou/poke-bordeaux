import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, PokeballListComponent],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {}
