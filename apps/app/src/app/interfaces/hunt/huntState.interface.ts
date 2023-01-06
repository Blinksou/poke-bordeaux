import { IncrementableCounter } from './incrementableCounter.interface';
import { PokeballsState } from './pokeballsState.interface';

export interface HuntState {
  energyState: IncrementableCounter;
  pokeballsState: PokeballsState;
}
