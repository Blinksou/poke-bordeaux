import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PokemonService } from '../../../../services/pokemon.service';
import { PokemonAvatarComponent } from '../../../pokemon-avatar/pokemon-avatar.component';
import { Pokemon } from '../../../pokemon-avatar/model/pokemon';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { UserProfile } from '../../../../model/user';
import { ActivityService } from '../../../../services/activity.service';

export interface TradeDialogComponentData {
  user: UserProfile;
  pokemon: Pokemon;
  askerId: string;
}

@Component({
  selector: 'app-trade-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    PokemonAvatarComponent,
    MatSelectModule,
  ],
  templateUrl: './trade-dialog.component.html',
})
export class TradeDialogComponent {
  tradeForm = this.formBuilder.group({
    pokemon: new FormControl<string>('', [Validators.required]),
  });

  pokemonsFromUser: Observable<Pokemon[] | null>;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly pokemonService: PokemonService,
    public readonly ref: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: TradeDialogComponentData,
    private readonly activityService: ActivityService
  ) {
    this.pokemonsFromUser = this.pokemonService.getPokemonsFromUser();

    this.pokemonsFromUser.subscribe(() => this.ref.markForCheck());
  }

  async onSubmit() {
    await this.activityService.addTradeAskActivity({
      data: {
        userPokemonId: this.data.pokemon.id,
        userId: this.data.user.id,
        askerId: this.data.askerId,
        askerPokemonId: this.tradeForm.value.pokemon as string,
        status: 'pending',
      },
    });
  }
}
