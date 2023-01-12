import { Hunt } from "../pages/hunt-page/model/hunt.model";

export type UserProfile = {
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
