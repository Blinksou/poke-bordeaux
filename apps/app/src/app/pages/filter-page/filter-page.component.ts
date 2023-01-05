import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPageService } from './filter-page.service';
import { PokeApi, Type } from '../../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatGridListModule, 
    MatButtonModule, MatSlideToggleModule, FormsModule, 
    ReactiveFormsModule],
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
})
export class FilterPageComponent implements OnInit {
  loaded!: boolean;
  typesList: Type[] | undefined;
  isChecked = true;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
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

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
}
