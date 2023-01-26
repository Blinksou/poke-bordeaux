import { Hunt } from './hunt.model';

export type UserProfile = {
  id: string;
  infos: {
    description: string;
    avatar: string;
    name: string;
  };
  options: {
    allowTrading: boolean;
    allowOthersToViewActivity: boolean;
  };
  pokemons: Array<{
    pokemonId: string;
    quantity: number;
    isFavorite: boolean;
  }>
  stats: {
    capturedPokemons: number;
    thrownPokeballs: number;
    tradingFulfilled: number;
  };
  hunt: Hunt;
  pokemons: [
    {
      pokemonId: number;
      quantity: number;
      isFavorite: boolean;
    }
  ]
};

export type UserBasicInfos = {
  id: string;
  name: string;
  avatar: string;
};
