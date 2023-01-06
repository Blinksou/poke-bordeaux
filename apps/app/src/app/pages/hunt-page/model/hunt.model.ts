export interface Hunt {
  userId: string;
  energiesDate: Date;
  pokeballs: {
    pokeball: Date;
    superball: Date;
    hyperball: Date;
    masterball: Date;
  };
}
