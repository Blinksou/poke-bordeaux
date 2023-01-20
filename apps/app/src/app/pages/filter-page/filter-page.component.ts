import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeFilter } from '../../../interfaces';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
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
  loaded!: boolean;
  typesList: PokemonTypeFilter[] | undefined = jsonTypes.map((t) => ({
    ...t,
    id: `${t.id}`,
    checked: false,
  }));

  checked = false;
  selectedTypes: PokemonTypeFilter[] = [];
  testTypes: PokemonTypeFilter[] = [];

  formGroup = this._formBuilder.group({
    hideknown: false,
    hideunknown: [false, Validators.requiredTrue],
  });

  constructor(
    public dialogRef: MatDialogRef<FilterPageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder
  ) {
    data = this.selectedTypes;
  }

  applyFilters(formGroup: FormGroup) {
    let formData = Object.assign({});
    formData = Object.assign(formData, formGroup.value);
    this.dialogRef.close({
      event: 'close',
      data: {
        types: this.selectedTypes,
        hideknown: formData.hideknown,
        hideunknown: formData.hideunknown,
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCheckedFilters(type: PokemonTypeFilter) {
    const index = this.selectedTypes.findIndex((x) => x == type);

    if (!type.checked) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }

    console.log(this.selectedTypes);
    return this.selectedTypes;
  }
}
