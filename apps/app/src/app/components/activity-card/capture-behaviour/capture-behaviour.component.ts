import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseActivity, CaptureActivityPayload } from '../../../model/activity';
import { UserService } from '../../../services/user.service';
import { PokemonService } from '../../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-info-behaviour/trade-dialog/trade-dialog.component';
import { UserProfile } from '../../../model/user';
import { Pokemon } from '../../../model/pokemon';

@Component({
  selector: 'app-capture-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capture-behaviour.component.html',
})
export class CaptureBehaviourComponent implements OnInit {
  @Input() activity!: BaseActivity<CaptureActivityPayload>;

  user: UserProfile | undefined;
  pokemon: Pokemon | undefined;

  constructor(
    public readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.changeDetectorRef.detectChanges();
      });

    this.userService
      .getUserFromFirestore(this.activity.data.userId)
      .subscribe((user) => {
        this.user = user;
        this.changeDetectorRef.detectChanges();
      });
  }

  openTradeDialog() {
    this.dialog.open(TradeDialogComponent);
  }
}
