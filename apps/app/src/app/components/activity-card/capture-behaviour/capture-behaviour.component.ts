import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseActivity, CaptureActivityPayload } from '../../../model/activity';
import { UserService } from '../../../services/user.service';
import { PokemonService } from '../../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-info-behaviour/trade-dialog/trade-dialog.component';
import { UserProfile } from '../../../model/user';
import { Pokemon } from '../../pokemon-avatar/model/pokemon';
import { take } from 'rxjs';
import { ObserveVisibilityDirective } from '../../../directives/observe-visibility.directive';

@Component({
  selector: 'app-capture-behaviour',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './capture-behaviour.component.html',
})
export class CaptureBehaviourComponent {
  @Input() activity!: BaseActivity<CaptureActivityPayload>;
  @Output() setPokemonImage = new EventEmitter<string>();

  user: UserProfile | undefined;
  pokemon: Pokemon | undefined;

  constructor(
    public readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  openTradeDialog() {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      this.dialog.open(TradeDialogComponent, {
        data: {
          pokemon: this.pokemon,
          user: this.user,
          askerId: user?.id,
        },
      });
    });
  }

  onVisible() {
    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;

        this.setPokemonImage.emit(pokemon.image);

        this.changeDetectorRef.detectChanges();
      });

    this.userService
      .getUserFromFirestore(this.activity.data.userId)
      .subscribe((user) => {
        this.user = user;
        this.changeDetectorRef.detectChanges();
      });
  }
}
