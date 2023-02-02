import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/** FORMS */
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/** INTERFACES */
import { PokedexFilters, PokemonTypeFilter } from '../../../interfaces';

/** DATA */
import jsonTypes from '../../../assets/pokemon/types.json';

/** MATERIAL */
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent {
  typesList: PokemonTypeFilter[] = [];
  selectedTypes: PokemonTypeFilter[] = [];
  hideUnknown = false;
  hideKnownNotOwned = false;

  constructor(
    private dialogRef: MatDialogRef<FilterPageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: PokedexFilters,
    private translate: TranslateService
  ) {
    this.selectedTypes = data.selectedTypes;
    this.hideUnknown = data.hideUnknown;
    this.hideKnownNotOwned = data.hideKnownNotOwned;

    this.typesList = jsonTypes.map((t) => ({
      ...t,
      checked: this.selectedTypes.filter((st) => st.id == `${t.id}`).length > 0,
      id: `${t.id}`,
      name:
        translate.currentLang === 'en' && t.englishName
          ? t.englishName
          : t.name,
    }));
  }

  applyFilters({ value: formData }: FormGroup) {
    this.dialogRef.close({
      event: 'close',
      data: {
        types: this.selectedTypes,
        hideUnknown: formData.hideUnknown,
        hideKnownNotOwned: formData.hideKnownNotOwned,
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleFiltersTypes(type: PokemonTypeFilter) {
    const typeIndex = this.typesList.findIndex((t) => t.id === type.id);
    this.typesList[typeIndex] = { ...type, checked: !type.checked };

    if (this.typesList[typeIndex].checked) {
      this.selectedTypes.push(this.typesList[typeIndex]);
    } else {
      this.selectedTypes = this.selectedTypes.filter((st) => st.id !== type.id);
    }
  }
}
