import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPageService } from './filter-page.service';
import { PokeApi, Type } from '../../../interfaces';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatGridListModule, MatButtonModule],
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent implements OnInit {
  loaded!: boolean;
  typesList: Type[] | undefined;
  
  constructor(private filterService: FilterPageService) {}

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.loaded = false;
    this.filterService.getTypes('https://pokeapi.co/api/v2/type')
      .subscribe(
        (response: PokeApi) => {
          this.typesList = response.results;
          this.loaded = true;
        }
      );
  }
}
