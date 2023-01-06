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
};
