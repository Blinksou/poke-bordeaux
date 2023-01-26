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
  CaptureActivityPayload,
} from '../../../../../model/activity';
import { UserService } from '../../../../../services/user.service';
import { PokemonService } from '../../../../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-info-behaviour/trade-dialog/trade-dialog.component';
import { UserProfile } from '../../../../../model/user';
import { Pokemon } from '../../../../../components/pokemon-avatar/model/pokemon';
import { combineLatest, map, Observable } from 'rxjs';
import { ObserveVisibilityDirective } from '../../../../../directives/observe-visibility.directive';
import { TranslateModule } from '@ngx-translate/core';

export type CaptureBehaviourComponentViewModel = Observable<{
  pokemon: Pokemon;
  user: UserProfile;
  currentUser: UserProfile | null;
}>;

@Component({
  selector: 'app-capture-behaviour',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective, TranslateModule],
  templateUrl: './capture-behaviour.component.html',
})
export class CaptureBehaviourComponent {
  @Input() activity!: BaseActivity<CaptureActivityPayload>;
  @Output() setPokemonImage = new EventEmitter<string>();

  private user?: UserProfile;
  private pokemon?: Pokemon;

  currentUser: UserProfile | null = null;
  viewModel$?: CaptureBehaviourComponentViewModel;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  openTradeDialog() {
    this.dialog.open(TradeDialogComponent, {
      data: {
        pokemon: this.pokemon,
        user: this.user,
        askerId: this.currentUser?.id,
      },
    });
  }

  onVisible() {
    this.viewModel$ = combineLatest([
      this.userService.getUserFromFirestore(this.activity.data.userId),
      this.pokemonService.getPokemonFromId(this.activity.data.userPokemonId),
      this.userService.user$,
    ]).pipe(
      map(([user, pokemon, currentUser]) => ({
        user,
        pokemon,
        currentUser,
      }))
    );

    this.viewModel$.subscribe(({ user, pokemon, currentUser }) => {
      this.user = user;
      this.pokemon = pokemon;
      this.currentUser = currentUser;

      this.setPokemonImage.emit(pokemon.image);

      this.changeDetectorRef.detectChanges();
    });
  }
}
