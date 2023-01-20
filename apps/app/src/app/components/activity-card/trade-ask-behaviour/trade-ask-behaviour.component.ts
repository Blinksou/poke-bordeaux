import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseActivity, TradeAskActivityPayload } from '../../../model/activity';
import { UserProfile } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-avatar/model/pokemon';

@Component({
  selector: 'app-trade-ask-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-ask-behaviour.component.html',
})
export class TradeAskBehaviourComponent implements OnInit {
  @Input() activity!: BaseActivity<TradeAskActivityPayload>;

  asker: UserProfile | null = null;
  askerPokemon: Pokemon | null = null;
  targetPokemon: Pokemon | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) {}

  accept() {
    console.log('Accept');
  }

  decline() {
    console.log('Decline');
  }

  ngOnInit(): void {
    this.userService
      .getUserFromFirestore(this.activity.data.askerId)
      .subscribe((user) => (this.asker = user));

    this.pokemonService
      .getPokemonFromId(this.activity.data.askerPokemonId)
      .subscribe((pokemon) => (this.askerPokemon = pokemon));

    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => (this.targetPokemon = pokemon));
  }
}
