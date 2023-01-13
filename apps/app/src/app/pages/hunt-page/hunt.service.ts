import { Injectable } from '@angular/core';

/** CONSTANTS */
import {
  defaultEnergiesNumber,
} from './constants/defaultNumbers.constant';
import {
  energyTimeGenerationInMs,
  pokeballTimeGenerationInMs,
  superballTimeGenerationInMs,
  hyperballTimeGenerationInMs,
  masterballTimeGenerationInMs,
} from './constants/generationTimes.constant';

/** ENUMS */
import { PokeballType } from '../../enums/hunt/PokeballType.enum';

/** FIRESTORE */
import { doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { UserProfile } from '@angular/fire/auth';

/** INTERFACES */
import { HuntState } from '../../interfaces/hunt/huntState.interface';
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';
import { PokeballsState } from '../../interfaces/hunt/pokeballsState.interface';

/** RXJS */
import { map, Observable, of, take } from 'rxjs';

/** SERVICES */
import { UserService } from '../../services/user.service';

/*
  CALCULS TO SAVE DATES

  pokeballs :
  Date to save when a user is created : now - (defaultNbPokeballs * pokeballTimeGenerationInMs);
  Date to update when a user use a ball : savedDate + (pokeballTimeGenerationInMs - nextTimeInMs);

  energy :
  Date to save when a user is created : now - (defaultNbEnergy * energyTimeGenerationInMs);
  Date to save when a user do an action :
    If he has lower than 10 energy : savedDate + (energyTimeGenerationInMs - nextTimeInMs)
    If he has more than 10 energy : now - ((defaultNbEnergy - 1) * energyTimeGenerationInMs)

  CALCULS TO GET ENERGY FROM DATE
  1 - Get diff between current date and saved date.
  2 - Get the modulo like : diff % energyGenerationTimeInMs = energy number
  3 - Get the rest to know the next time before generation

  difference = 278000 -> 4 mins 38 seconds
  energy number = Math.floor(278000 / energyGenerationTimeInMs)
  nextTimeGeneration = difference % energyGenerationTimeInMs
*/

@Injectable({
  providedIn: 'root',
})
export class HuntService {
  huntState$: Observable<HuntState | null> = of(null);

  constructor(
    private readonly firestore: Firestore,
    private readonly userService: UserService
  ){
    this.huntState$ = this.userService.user$.pipe(
      map((userProfile) => {
        if (!userProfile) return null;
        
        const hunt = userProfile.hunt;
        const energyState = this.determineEnergyState(hunt.energiesDate);

        const pokeballsState: PokeballsState = {
          pokeball: this.determinePokeballState(
            hunt.pokeballs.pokeball,
            PokeballType.POKEBALL
          ),
          superBall: this.determinePokeballState(
            hunt.pokeballs.superball,
            PokeballType.SUPERBALL
          ),
          hyperBall: this.determinePokeballState(
            hunt.pokeballs.hyperball,
            PokeballType.HYPERBALL
          ),
          masterBall: this.determinePokeballState(
            hunt.pokeballs.masterball,
            PokeballType.MASTERBALL
          ),
        };

        return {
          energyState,
          pokeballsState,
        };
      })
    )
  }

  private determineEnergiesNumber (energiesCount: number): number {

    if (energiesCount > defaultEnergiesNumber) return defaultEnergiesNumber;
    if (energiesCount < 0) return 0;

    return energiesCount;
  }

  private determineEnergyState(savedDate: Timestamp): IncrementableCounter {
    const currentDate = new Date();
    const difference = currentDate.getTime() - savedDate.toMillis();
    const energiesCount = Math.floor(difference / energyTimeGenerationInMs);
    const nextTimeGeneration = energyTimeGenerationInMs - Math.abs(difference % energyTimeGenerationInMs);

    return {
      count: this.determineEnergiesNumber(energiesCount),
      nextGenerationInMs: nextTimeGeneration,
    };
  }

  private determinePokeballState(
    savedDate: Timestamp,
    pokeballType: PokeballType
  ): IncrementableCounter {
    const currentDate = new Date(Date.now());
    const difference = currentDate.getTime() - savedDate.toMillis();

    let timeGeneration = 0;
    switch (pokeballType) {
      case PokeballType.POKEBALL:
        timeGeneration = pokeballTimeGenerationInMs;
        break;
      case PokeballType.SUPERBALL:
        timeGeneration = superballTimeGenerationInMs;
        break;
      case PokeballType.HYPERBALL:
        timeGeneration = hyperballTimeGenerationInMs;
        break;
      case PokeballType.MASTERBALL:
        timeGeneration = masterballTimeGenerationInMs;
        break;
    }

    const pokeballsCount = Math.floor(difference / timeGeneration);
    const nextTimeGeneration = difference % timeGeneration;

    return {
      count: pokeballsCount,
      nextGenerationInMs: nextTimeGeneration,
    };
  }

  public incrementEnergyState(energyState: IncrementableCounter) {
    if (energyState.count < defaultEnergiesNumber) {
      energyState.count = energyState.count + 1;
    }

    energyState.nextGenerationInMs = energyTimeGenerationInMs;
    return energyState;
  }

  public decrementEnergyState(energyState: IncrementableCounter): void {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      if (energyState.count <= 0) return;
      
      let newEnergiesDates: Timestamp;
      if (energyState.count === defaultEnergiesNumber) {
        newEnergiesDates = Timestamp.fromDate(
          new Date(new Date().getTime() - (defaultEnergiesNumber-1) * energyTimeGenerationInMs)
          )
      } else {
        newEnergiesDates = Timestamp.fromDate(
          new Date(user.hunt.energiesDate.seconds * 1000 + energyTimeGenerationInMs)
        )
      }

      const updatedUser: UserProfile = {
        ...user,
        hunt: {
          ...user.hunt,
          energiesDate: newEnergiesDates
        }
      };

      const userDocument = doc(this.firestore, `users/${user.id}`);
      setDoc(userDocument, updatedUser);

      return user;
    });
  }
}
