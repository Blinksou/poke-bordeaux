/** FIRESTORE */
import { Timestamp } from "@angular/fire/firestore";

export interface Hunt {
  energiesDate: Timestamp;
  pokeballs: {
    pokeball: Timestamp;
    superball: Timestamp;
    hyperball: Timestamp;
    masterball: Timestamp;
  };
}
