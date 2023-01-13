import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPageService } from './filter-page.service';
import { PokeApi, PokemonType } from '../../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatGridListModule, 
    MatButtonModule, MatSlideToggleModule, FormsModule, 
    ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent implements OnInit {
  loaded!: boolean;
  typesList: PokemonType[] | undefined;

  checked = false;
  selectedTypes: PokemonType[] = [];

  formGroup = this._formBuilder.group({
    hideknown: '',
    hideunknown: ['', Validators.requiredTrue],
  });
  
  constructor(
    private filterService: FilterPageService,
    private _formBuilder: FormBuilder
  ) {}

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

  getCheckedFilters(type: PokemonType) {

    const index = this.selectedTypes.findIndex(x => x == type);

    if(!type.checked) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type)
    }

    console.log(this.selectedTypes)
  }

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
