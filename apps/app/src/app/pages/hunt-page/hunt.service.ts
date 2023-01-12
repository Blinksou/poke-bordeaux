import { Injectable } from '@angular/core';

/** CONSTANTS */
import {
  defaultEnergiesNumber,
  defaultHyperballsNumber,
  defaultMasterballsNumber,
  defaultPokeballsNumber,
  defaultSuperballsNumber,
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

/** INTERFACES */
import { Hunt } from './model/hunt.model';
import { HuntState } from '../../interfaces/hunt/huntState.interface';
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';
import { PokeballsState } from '../../interfaces/hunt/pokeballsState.interface';

/** RXJS */
import { from, map, Observable } from 'rxjs';

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
  private determineEnergyState(savedDate: Date): IncrementableCounter {
    const currentDate = new Date();
    const difference = currentDate.getTime() - savedDate.getTime();
    const energiesCount = Math.floor(difference / energyTimeGenerationInMs);
    const nextTimeGeneration = difference % energyTimeGenerationInMs;

    return {
      count: energiesCount,
      nextGenerationInMs: nextTimeGeneration,
    };
  }

  private determinePokeballState(
    savedDate: Date,
    pokeballType: PokeballType
  ): IncrementableCounter {
    const currentDate = new Date(Date.now());
    const difference = currentDate.getTime() - savedDate.getTime();

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

  private async getHunt(userId: string): Promise<Hunt> {
    return {
      userId: '1',
      energiesDate: new Date(Date.now() - 5 * energyTimeGenerationInMs),
      pokeballs: {
        pokeball: new Date(
          Date.now() - defaultPokeballsNumber * pokeballTimeGenerationInMs
        ),
        superball: new Date(
          Date.now() - defaultSuperballsNumber * superballTimeGenerationInMs
        ),
        hyperball: new Date(
          Date.now() - defaultMasterballsNumber * masterballTimeGenerationInMs
        ),
        masterball: new Date(
          Date.now() - defaultHyperballsNumber * hyperballTimeGenerationInMs
        ),
      },
    };
  }

  public async updateHunt(updatedHunt: Hunt): Promise<Hunt> {
    return updatedHunt;
  }

  public getHuntState(userId: string): Observable<HuntState> {
    const huntFromFirestore = from(this.getHunt(userId));

    return huntFromFirestore.pipe(
      map((hunt) => {
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
    );
  }

  public incrementEnergyState(energyState: IncrementableCounter) {
    if (energyState.count < defaultEnergiesNumber) {
      energyState.count = energyState.count + 1;
    }

    energyState.nextGenerationInMs = energyTimeGenerationInMs;
    return energyState;
  }

  public decrementEnergyState(
    energyState: IncrementableCounter
  ): IncrementableCounter {
    if (energyState.count <= 0) return energyState;

    from(this.getHunt('<userId>')).pipe(
      map((hunt) => {
        hunt.energiesDate = new Date(
          hunt.energiesDate.getTime() +
            energyTimeGenerationInMs -
            energyState.nextGenerationInMs
        );

        this.updateHunt(hunt);
      })
    );

    return {
      ...energyState,
      count: energyState.count - 1,
    };
  }
}
