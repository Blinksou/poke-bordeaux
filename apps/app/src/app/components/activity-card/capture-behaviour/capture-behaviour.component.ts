import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseActivity, CaptureActivityPayload } from '../../../model/activity';
import { UserService } from '../../../services/user.service';
import { PokemonService } from '../../../services/pokemon.service';
import { UserProfile } from '../../../model/user';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-info-behaviour/trade-dialog/trade-dialog.component';
import { Pokemon } from '../../../model/pokemon';

@Component({
  selector: 'app-capture-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capture-behaviour.component.html',
})
export class CaptureBehaviourComponent implements OnInit {
  @Input() activity!: BaseActivity<CaptureActivityPayload>;

  user!: UserProfile;
  pokemon: Pokemon | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserFromFirestore(this.activity.data.userId)
      .subscribe((user) => (this.user = user));

    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => (this.pokemon = pokemon));
  }

  openTradeDialog() {
    this.dialog.open(TradeDialogComponent);
  }
}
