import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { PokemonService } from '../../../../services/pokemon.service';

@Component({
  selector: 'app-trade-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './trade-dialog.component.html',
})
export class TradeDialogComponent {
  tradeForm = this.formBuilder.group({
    pokemon: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pokemonService: PokemonService
  ) {}

  async onSubmit() {
    console.log(this.tradeForm.value);
  }
}
