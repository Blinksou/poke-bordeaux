import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseActivity,
  TradeInfoActivityPayload,
} from '../../../model/activity';
import { UserService } from '../../../services/user.service';
import { UserProfile } from '../../../model/user';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-avatar/model/pokemon';

@Component({
  selector: 'app-trade-info-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-info-behaviour.component.html',
})
export class TradeInfoBehaviourComponent implements OnInit {
  @Input() activity!: BaseActivity<TradeInfoActivityPayload>;

  asker: UserProfile | null = null;
  target: UserProfile | null = null;

  askerPokemon: Pokemon | null = null;
  targetPokemon: Pokemon | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserFromFirestore(this.activity.data.askerId)
      .subscribe((user) => (this.asker = user));

    this.userService
      .getUserFromFirestore(this.activity.data.userId)
      .subscribe((user) => (this.target = user));

    this.pokemonService
      .getPokemonFromId(this.activity.data.askerPokemonId)
      .subscribe((pokemon) => (this.askerPokemon = pokemon));

    this.pokemonService
      .getPokemonFromId(this.activity.data.userPokemonId)
      .subscribe((pokemon) => (this.targetPokemon = pokemon));
  }
}
