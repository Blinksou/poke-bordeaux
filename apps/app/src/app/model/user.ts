import { Hunt } from './hunt.model';

export type UserProfile = {
  id: string;
  infos: {
    description: string;
    avatar: string;
    name: string;
    nickname?: string;
  };
  options: {
    allowTrading: boolean;
    allowOthersToViewActivity: boolean;
  };
  pokemons: Array<{
    pokemonId: number;
    quantity: number;
    isFavorite: boolean;
  }>;
  stats: {
    capturedPokemons: number;
    thrownPokeballs: number;
    tradingFulfilled: number;
  };
  hunt: Hunt;
};

export type UserBasicInfos = {
  id: string;
  name: string;
  avatar: string;
};
