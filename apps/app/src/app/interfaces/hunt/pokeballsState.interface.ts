export interface Pokeball {
  captureChanceInPercentage: number;
  count: number;
  label: string;
  name: string;
  nextGenerationInMs: number;
}

export type PokeballsState = Pokeball[];
