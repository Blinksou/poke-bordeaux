/** FIRESTORE */
import { Timestamp } from "@angular/fire/firestore";

export interface Pokeballs {
  pokeball: Timestamp;
  superball: Timestamp;
  hyperball: Timestamp;
  masterball: Timestamp;
}

export interface Hunt {
  energiesDate: Timestamp;
  pokeballs: Pokeballs;
}
