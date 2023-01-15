import { Hunt } from '../pages/hunt-page/model/hunt.model';

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

export type UserBasicInfos = {
  id: string;
  name: string;
  avatar: string;
};
