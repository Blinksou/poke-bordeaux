export interface Pokeball {
  captureChanceInPercentage: number;
  count: number;
  label: string;
  name: 'pokeball' | 'superball' | 'hyperball' | 'masterball';
  nextGenerationInMs: number;
}

export type PokeballsState = Pokeball[];
