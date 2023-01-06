import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { PokedexPageService } from './pokedex-page.service';
import { PokeApi } from '../../../interfaces';

@Component({
  selector: 'app-pokedex-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './pokedex-page.component.html',
  styleUrls: ['./pokedex-page.component.scss'],
})
export class PokedexPageComponent implements OnInit {
  loaded!: boolean;
  typesList: [] | undefined;
  
  constructor(private pokedexService: PokedexPageService) {}

  @Input() search: string | undefined;

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.loaded = false;
    this.pokedexService.getTypes('https://pokeapi.co/api/v2/type')
      .subscribe(
        (response: PokeApi) => {
          console.log('response', response.results)
          // listtypes.forEach(type =>
          // this.types = listtypes;
        }
      );
  }

}
