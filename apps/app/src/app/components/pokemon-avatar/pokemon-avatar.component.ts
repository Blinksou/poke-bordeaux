import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** MATERIAL */
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

/** MODELS */
import { Pokemon } from './model/pokemon';

/** SERVICES */
import { PokedexPokemon } from '../../pages/pokedex-page/pokedex.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pokemon-avatar',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatGridListModule,
    TranslateModule,
  ],
  templateUrl: './pokemon-avatar.component.html',
  styleUrls: ['./pokemon-avatar.component.scss'],
})
export class PokemonAvatarComponent {
  @Input() pokemon: PokedexPokemon | null = null;
  @Input() border!: string;
  @Input() selectedPokemon: Pokemon | null = null;
  @Input() setSelectedPokemon!: (pokemon: Pokemon) => void;
  @Input() unselectPokemon!: () => void;
  @Input() handleFavoritePokemon!: (pokemon: PokedexPokemon) => void;
}
