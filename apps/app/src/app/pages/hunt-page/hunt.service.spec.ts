import { TestBed } from '@angular/core/testing';

/** CONSTANTS */
import {
  defaultEnergiesNumber,
  defaultPokeballsNumber,
  defaultSuperballsNumber,
  defaultHyperballsNumber,
  defaultMasterballsNumber,
} from './constants/defaultNumbers.constant';
import {
  energyTimeGenerationInMs,
  pokeballTimeGenerationInMs,
  superballTimeGenerationInMs,
  hyperballTimeGenerationInMs,
  masterballTimeGenerationInMs,
} from './constants/generationTimes.constant';
import {
  pokeballChanceInPercentage,
  superballChanceInPercentage,
  hyperballChanceInPercentage,
  masterballChanceInPercentage,
} from './constants/pokeballsChance.constant';

/** ENUMS */
import { PokeballType } from '../../enums/hunt/PokeballType.enum';

/** SERVICES */
import { ActivityService } from '../../services/activity.service';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { HuntService } from './hunt.service';
import { UserService } from '../../services/user.service';

/** RXJS */
import { Observable } from 'rxjs';

describe('HuntServiceService', () => {
  let service: HuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HuntService,
        { provide: Firestore, useValue: {} },
        {
          provide: UserService,
          useValue: {
            user$: new Observable(),
          },
        },
        { provide: ActivityService, useValue: {} },
      ],
    });
    service = TestBed.inject(HuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('determine energies number', () => {
    expect(service.determineEnergiesNumber(7)).toBe(7);
    expect(service.determineEnergiesNumber(100)).toBe(defaultEnergiesNumber);
    expect(service.determineEnergiesNumber(-10)).toBe(0);
  });

  it('determine ernergies state', () => {
    const currentDateMinusOneDay = Timestamp.fromDate(
      new Date(Date.now() - energyTimeGenerationInMs * defaultEnergiesNumber)
    );

    expect(service.determineEnergiesState(currentDateMinusOneDay).count).toBe(
      defaultEnergiesNumber
    );
  });

  const pokeballConstants: Record<
    PokeballType,
    {
      chanceInPercentage: number;
      defaultTimeGeneration: number;
      defaultNumber: number;
    }
  > = {
    [PokeballType.POKEBALL]: {
      defaultTimeGeneration: pokeballTimeGenerationInMs,
      chanceInPercentage: pokeballChanceInPercentage,
      defaultNumber: defaultPokeballsNumber,
    },
    [PokeballType.SUPERBALL]: {
      defaultTimeGeneration: superballTimeGenerationInMs,
      chanceInPercentage: superballChanceInPercentage,
      defaultNumber: defaultSuperballsNumber,
    },
    [PokeballType.HYPERBALL]: {
      defaultTimeGeneration: hyperballTimeGenerationInMs,
      chanceInPercentage: hyperballChanceInPercentage,
      defaultNumber: defaultHyperballsNumber,
    },
    [PokeballType.MASTERBALL]: {
      defaultTimeGeneration: masterballTimeGenerationInMs,
      chanceInPercentage: masterballChanceInPercentage,
      defaultNumber: defaultMasterballsNumber,
    },
  };

  it.each(
    Object.entries(pokeballConstants).map(([key, value]) => ({ key, value }))
  )('determine pokeball states for $key', ({ key, value }) => {
    const currentDateMinusOneDay = Timestamp.fromDate(
      new Date(Date.now() - value.defaultTimeGeneration * value.defaultNumber)
    );
    const result = service.determinePokeballState(
      currentDateMinusOneDay,
      key as PokeballType
    );

    expect(result.label).toBe(key);
    expect(result.name).toBe(key.toLowerCase());
    expect(result.captureChanceInPercentage).toBe(value.chanceInPercentage);
    expect(result.count).toBe(value.defaultNumber);
    expect(Math.floor(result.nextGenerationInMs)).toBe(
      value.defaultTimeGeneration
    );
  });
});
