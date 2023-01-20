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
import { combineLatest, map, Observable } from 'rxjs';

export type TradeInfoBehaviourComponentViewModel = Observable<{
  targetPokemon: Pokemon;
  asker: UserProfile;
  askerPokemon: Pokemon;
  target: UserProfile;
}>;

@Component({
  selector: 'app-trade-info-behaviour',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './trade-info-behaviour.component.html',
})
export class TradeInfoBehaviourComponent {
  @Input() activity!: BaseActivity<TradeInfoActivityPayload>;
  @Output() setPokemonImage = new EventEmitter<string>();

  viewModel$?: TradeInfoBehaviourComponentViewModel;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly ref: ChangeDetectorRef
  ) {}

  onVisible() {
    this.viewModel$ = combineLatest([
      this.userService.getUserFromFirestore(this.activity.data.askerId),
      this.userService.getUserFromFirestore(this.activity.data.userId),
      this.pokemonService.getPokemonFromId(this.activity.data.askerPokemonId),
      this.pokemonService.getPokemonFromId(this.activity.data.userPokemonId),
    ]).pipe(
      map(([asker, target, askerPokemon, targetPokemon]) => ({
        asker,
        target,
        askerPokemon,
        targetPokemon,
      }))
    );

    this.viewModel$.subscribe(({ targetPokemon }) => {
      this.setPokemonImage.emit(targetPokemon.image);
      this.ref.detectChanges();
    });
  }
}
