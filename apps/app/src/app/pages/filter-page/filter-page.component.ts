import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeFilter } from '../../../interfaces';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import jsonTypes from '../../../assets/pokemon/types.json';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent {
  typesList: PokemonTypeFilter[] | undefined = jsonTypes.map((t) => ({
    ...t,
    id: `${t.id}`,
    checked: false,
  }));
  selectedTypes: PokemonTypeFilter[] = [];
  hideUnknown = false;
  hideKnownNotOwned = false;

  constructor(
    public dialogRef: MatDialogRef<FilterPageComponent>,
  ) {}

  applyFilters({value: formData}: FormGroup) {
    this.dialogRef.close({
      event: 'close',
      data: {
        types: this.selectedTypes,
        hideknown: formData.hideknown,
        hideunknown: formData.hideunknown,
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getCheckedFilters(type: PokemonTypeFilter) {
    const index = this.selectedTypes.findIndex((x) => x == type);

    if (type.checked) this.selectedTypes.push(type);
    else this.selectedTypes.splice(index, 1);
  }
}
