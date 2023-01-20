import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseActivity, TradeAskActivityPayload } from '../../../model/activity';
import { UserProfile } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { PokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-avatar/model/pokemon';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-trade-ask-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-ask-behaviour.component.html',
})
export class TradeAskBehaviourComponent implements OnInit {
  @Input() activity!: BaseActivity<TradeAskActivityPayload>;
  @Output() setPokemonImage = new EventEmitter<string>();

  asker: UserProfile | null = null;
  askerPokemon: Pokemon | null = null;
  targetPokemon: Pokemon | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly activityService: ActivityService,
    private readonly ref: ChangeDetectorRef
  ) {}

  async accept() {
    await this.activityService.acceptTrade(this.activity);
  }

  async decline() {
    await this.activityService.declineTrade(this.activity);
  }

  ngOnInit(): void {
    this.userService
      .getUserFromFirestore(this.activity.data.askerId)
      .subscribe((user) => {
        this.asker = user;
        this.ref.detectChanges();
      });

    console.log(
      this.activity.data.askerPokemonId,
      this.activity.data.userPokemonId
    );

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
