import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HuntService {
  getEnergyInformations() {
    return {
      energy: 10,
      maxEnergy: 10,
      durationBeforeNextEnery: new Date(Date.now() + 1000 * 60 * 5),
    };
  }
}
