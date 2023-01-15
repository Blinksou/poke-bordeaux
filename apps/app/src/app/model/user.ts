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
  stats: {
    capturedPokemons: number;
    thrownPokeballs: number;
    tradingFulfilled: number;
  };
  hunt: Hunt;
};
