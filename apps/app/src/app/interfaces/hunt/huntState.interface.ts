import { EnergyState } from './energyState.interface';
import { PokeballsState } from './pokeballsState.interface';

export interface HuntState {
  energyState: EnergyState;
  pokeballsState: PokeballsState;
}
