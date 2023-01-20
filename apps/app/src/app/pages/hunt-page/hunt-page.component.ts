import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/** COMPONENTS */
import { EnergyStateComponent } from './components/energies-state/energies-state.component';
import { PokeballListComponent } from './components/pokeball-list/pokeball-list.component';

/** INTERFACES */
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';
import { PokeballsState, Pokeball } from '../../interfaces/hunt/pokeballsState.interface';
import { Pokemon } from '../../components/pokemon-avatar/model/pokemon';

/** CONSTANTS */
import { HuntStep } from '../../enums/hunt/HuntStep.enum';

/** SERVICES */
import { HuntService } from './hunt.service';
import { IntervalService } from '../../services/interval.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [
    CommonModule,
    EnergyStateComponent,
    PokeballListComponent,
    MatButtonModule,
  ],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  energiesState!: IncrementableCounter;
  pokeballsState!: PokeballsState;
  step: HuntStep = HuntStep.HUNT;
  selectedBall: Pokeball | null = null;
  pokemonToCapture: Pokemon | null = null;
  pokemonWasCaptured: boolean | null = null;

  constructor(
    private readonly huntService: HuntService,
    private readonly intervalService: IntervalService,
    private readonly pokemonService: PokemonService
  ) {
    this.huntService.huntState$.subscribe((huntState) => {
      if (huntState === null) return;

      this.energiesState = huntState.energiesState;
      this.pokeballsState = huntState.pokeballsState;

      if (this.selectedBall !== null) {
        this.selectedBall = this.pokeballsState.find((p) => p.name === this.selectedBall?.name) as Pokeball;
      }
    });

    this.intervalService.interval$.subscribe(() => {
      if (this.energiesState) {
        this.energiesState = this.huntService.handleEnergiesIncrementation(this.energiesState);
      };

      if (this.pokeballsState) {
        this.pokeballsState = this.huntService.handlePokeballsIncrementation(this.pokeballsState);
      }
    });
  }

  goToBallSelection() {
    this.huntService.decrementEnergiesState(this.energiesState);
    this.setStep(HuntStep.BALL_SELECTION);
    this.pokemonToCapture = this.pokemonService.getRandomPokemon();
  }

  giveUp() {
    this.selectedBall = null;
    this.setStep(HuntStep.HUNT);
  }

  selectBall(pokeball: Pokeball) {
    this.selectedBall = pokeball;
  }

  capture() {
    if (!this.selectedBall || !this.pokemonToCapture) return;

    if (this.selectedBall.count < 1) {
      alert(`You need to have at least 1 ${this.selectedBall.label} to use it !`);
      return;
    }

    const pokemonIsCaptured = this.huntService.capturePokemon({...this.selectedBall}, this.pokemonToCapture);
    this.selectedBall.count = this.selectedBall.count - 1;

    if(pokemonIsCaptured) {
      this.pokemonWasCaptured = true;
      this.step = HuntStep.RESULT;
      this.selectedBall = null;
    } else {
      this.step = HuntStep.POKEMON_RESISTED;
    }
  }

  private setStep(step: HuntStep) {
    this.step = step;
  }
}
