export type UserProfile = {
  username: string;
  bio: string;
  doesAllowTrading: boolean;
  doesAllowViewActivity: boolean;
  stats: {
    thrownPokeballs: number;
    capturedPokemons: number;
    tradingFulfilled: number;
  };
};
