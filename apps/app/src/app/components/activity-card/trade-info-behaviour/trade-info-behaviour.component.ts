import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseActivity,
  TradeInfoActivityPayload,
} from '../../../model/activity';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../model/user';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-avatar/model/pokemon';
import { ObserveVisibilityDirective } from '../../../directives/observe-visibility.directive';

@Component({
  selector: 'app-trade-info-behaviour',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './trade-info-behaviour.component.html',
})
export class TradeInfoBehaviourComponent {
  @Input() activity!: BaseActivity<TradeInfoActivityPayload>;
  @Output() setPokemonImage = new EventEmitter<string>();

  asker: UserProfile | null = null;
  target: UserProfile | null = null;

  askerPokemon: Pokemon | null = null;
  targetPokemon: Pokemon | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly ref: ChangeDetectorRef
  ) {}

  onVisible() {
    this.userService
      .getUserFromFirestore(this.activity.data.askerId)
      .subscribe((user) => {
        this.asker = user;
        this.ref.detectChanges();
      });

    this.userService
      .getUserFromFirestore(this.activity.data.userId)
      .subscribe((user) => {
        this.target = user;
        this.ref.detectChanges();
      });

    this.pokemonService
      .getPokemonFromId(this.activity.data.askerPokemonId)
      .subscribe((pokemon) => {
        this.askerPokemon = pokemon;

        this.ref.detectChanges();
      });

    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => {
        this.targetPokemon = pokemon;

        this.setPokemonImage.emit(pokemon.image);

        this.ref.detectChanges();
      });
  }
}
