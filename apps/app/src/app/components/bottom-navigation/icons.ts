export enum BottomNavigationIcons {
  Home = 'home',
  Pokedex = 'pokedex',
  Hunt = 'hunt',
  Profile = 'profile',
}

export type BottomNavigationItems = Record<BottomNavigationIcons, string>;

export const bottomNavigationIcons: BottomNavigationItems = {
  [BottomNavigationIcons.Home]: '/',
  [BottomNavigationIcons.Pokedex]: '/pokedex',
  [BottomNavigationIcons.Hunt]: '/hunt',
  [BottomNavigationIcons.Profile]: '/profile',
};
