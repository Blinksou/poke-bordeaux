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
import { hyperballChanceInPercentage, masterballChanceInPercentage, pokeballChanceInPercentage, superballChanceInPercentage } from './constants/pokeballsChance.constant';

/** ENUMS */
import { PokeballType } from '../../enums/hunt/PokeballType.enum';

/** FIRESTORE */
import { doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';
import { UserProfile } from '@angular/fire/auth';

/** INTERFACES */
import { HuntState } from '../../interfaces/hunt/huntState.interface';
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';
import { Pokeball, PokeballsState } from '../../interfaces/hunt/pokeballsState.interface';

/** MODELS */
import { Pokeballs } from '../../model/hunt.model';

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
        const energiesState = this.determineEnergiesState(hunt.energiesDate);
        const pokeballsState: PokeballsState = this.determinePokeballsState(hunt.pokeballs);

        return {
          energiesState,
          pokeballsState,
        };
      })
    )
  }

  /** ENERGIES */
  private determineEnergiesNumber (energiesCount: number): number {
    if (energiesCount > defaultEnergiesNumber) return defaultEnergiesNumber;
    if (energiesCount < 0) return 0;

    return energiesCount;
  }

  private determineEnergiesState(savedDate: Timestamp): IncrementableCounter {
    const currentDate = new Date();
    const difference = currentDate.getTime() - savedDate.toMillis();
    const energiesCount = Math.floor(difference / energyTimeGenerationInMs);
    const nextTimeGeneration = energyTimeGenerationInMs - Math.abs(difference % energyTimeGenerationInMs);

    return {
      count: this.determineEnergiesNumber(energiesCount),
      nextGenerationInMs: nextTimeGeneration,
    };
  }

  public handleEnergiesIncrementation (energiesState: IncrementableCounter): IncrementableCounter {
    const updatedEnergiesState = {
      ...energiesState,
      nextGenerationInMs: energiesState.nextGenerationInMs - 1000,
    };

    if (
      updatedEnergiesState.nextGenerationInMs < 1000 &&
      updatedEnergiesState.count < defaultEnergiesNumber
    ) {
      updatedEnergiesState.count = updatedEnergiesState.count + 1;
      updatedEnergiesState.nextGenerationInMs = energyTimeGenerationInMs;
    }

    return updatedEnergiesState;
  }

  public decrementEnergiesState(energiesState: IncrementableCounter): void {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;

      if (energiesState.count <= 0) return;
      
      let newEnergiesDates: Timestamp;
      if (energiesState.count === defaultEnergiesNumber) {
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

  /** POKEBALLS */
  private determinePokeballsState(pokeballs: Pokeballs): PokeballsState {
    return [
      this.determinePokeballState(
        pokeballs.pokeball,
        PokeballType.POKEBALL
      ),
      this.determinePokeballState(
        pokeballs.superball,
        PokeballType.SUPERBALL
      ),
      this.determinePokeballState(
        pokeballs.hyperball,
        PokeballType.HYPERBALL
      ),
      this.determinePokeballState(
        pokeballs.masterball,
        PokeballType.MASTERBALL
      )
    ];
  }

  private determinePokeballState(
    savedDate: Timestamp,
    pokeballType: PokeballType
  ): Pokeball {
    const currentDate = new Date(Date.now());
    const difference = currentDate.getTime() - savedDate.toMillis();

    let timeGeneration = 0;
    let name: 'pokeball' | 'superball' | 'hyperball' | 'masterball' = 'pokeball';
    let label = '';
    let captureChanceInPercentage = 0;
    switch (pokeballType) {
      case PokeballType.POKEBALL:
        name = 'pokeball';
        label = 'PokeBall';
        captureChanceInPercentage = pokeballChanceInPercentage;
        timeGeneration = pokeballTimeGenerationInMs;
        break;
      case PokeballType.SUPERBALL:
        name = 'superball';
        label = 'SuperBall';
        captureChanceInPercentage = superballChanceInPercentage;
        timeGeneration = superballTimeGenerationInMs;
        break;
      case PokeballType.HYPERBALL:
        name = 'hyperball';
        label = 'HyperBall';
        captureChanceInPercentage = hyperballChanceInPercentage;
        timeGeneration = hyperballTimeGenerationInMs;
        break;
      case PokeballType.MASTERBALL:
        name = 'masterball';
        label = 'MasterBall';
        captureChanceInPercentage = masterballChanceInPercentage;
        timeGeneration = masterballTimeGenerationInMs;
        break;
    }

    const count = Math.floor(difference / timeGeneration);
    const nextGenerationInMs = timeGeneration - (difference % timeGeneration);

    return {
      captureChanceInPercentage,
      count,
      label,
      name,
      nextGenerationInMs,
    };
  }

  public handlePokeballsIncrementation (pokeballsState: PokeballsState): PokeballsState {
    const updatedPokeballsState = pokeballsState.map((pokeball) => {
      pokeball.nextGenerationInMs = pokeball.nextGenerationInMs - 1000;

      if (pokeball.nextGenerationInMs < 1000) {
        switch (pokeball.name) {
          case 'pokeball':
            pokeball.nextGenerationInMs = pokeballTimeGenerationInMs;
            break;
          case 'superball':
            pokeball.nextGenerationInMs = superballTimeGenerationInMs;
            break;
          case 'hyperball':
            pokeball.nextGenerationInMs = hyperballTimeGenerationInMs;
            break;
          case 'masterball':
            pokeball.nextGenerationInMs = masterballTimeGenerationInMs;
            break;
        }

        pokeball.count = pokeball.count + 1;
      }

      return pokeball;
    })


    return updatedPokeballsState;
  }

  public decrementPokeballsState(pokeballState: Pokeball) {
    this.userService.user$.pipe(take(1)).subscribe((user) => {
      if (!user) return;
      if (pokeballState.count <= 0) return;

      let timeGeneration = 0;
      switch (pokeballState.name) {
        case 'pokeball':
          timeGeneration = pokeballTimeGenerationInMs;
          break;
        case 'superball':
          timeGeneration = superballTimeGenerationInMs;
          break;
        case 'hyperball':
          timeGeneration = hyperballTimeGenerationInMs;
          break;
        case 'masterball':
          timeGeneration = masterballTimeGenerationInMs;
          break;
      }


      const newPokeballDate = Timestamp.fromDate(
        new Date(user.hunt.pokeballs[pokeballState.name].seconds * 1000 + timeGeneration)
      );

      const updatedUser: UserProfile = {
        ...user,
        hunt: {
          ...user.hunt,
          pokeballs: {
            ...user.hunt.pokeballs,
            [pokeballState.name]: newPokeballDate
          }
        }
      };

      const userDocument = doc(this.firestore, `users/${user.id}`);
      setDoc(userDocument, updatedUser);

      return user; 
    })
  }
}
