import { IncrementableCounter } from './incrementableCounter.interface';

export interface PokeballsState {
  pokeball: IncrementableCounter;
  superBall: IncrementableCounter;
  hyperBall: IncrementableCounter;
  masterBall: IncrementableCounter;
}
