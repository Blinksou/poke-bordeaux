import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageHeaderComponent } from './profile-page-header/profile-page-header.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';
import { UserProfile } from '../../model/user';
import { energyTimeGenerationInMs, hyperballTimeGenerationInMs, masterballTimeGenerationInMs, pokeballTimeGenerationInMs, superballTimeGenerationInMs } from '../hunt-page/constants/generationTimes.constant';
import { defaultHyperballsNumber, defaultMasterballsNumber, defaultPokeballsNumber, defaultSuperballsNumber } from '../hunt-page/constants/defaultNumbers.constant';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ProfilePageHeaderComponent,
    ProfileOptionsComponent,
    ProfileStatisticsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  public profile: UserProfile = {
    infos: {
      description: `♪ I wanna be the very best,
          like no one ever was
          To catch them is my real test
          To train them is my cause ♪`,
      avatar: 'https://picsum.photos/400',
      name: 'Ash Ketchum',
    },
    options: {
      allowTrading: true,
      allowOthersToViewActivity: false,
    },
    stats: {
      capturedPokemons: 504,
      thrownPokeballs: 1520,
      tradingFulfilled: 38,
    },
    hunt: {
      energiesDate: Timestamp.fromDate(new Date(Date.now() - 5 * energyTimeGenerationInMs)),
      pokeballs: {
        pokeball: Timestamp.fromDate(new Date(
          Date.now() - defaultPokeballsNumber * pokeballTimeGenerationInMs
        )),
        superball: Timestamp.fromDate(new Date(
          Date.now() - defaultSuperballsNumber * superballTimeGenerationInMs
        )),
        hyperball: Timestamp.fromDate(new Date(
          Date.now() - defaultMasterballsNumber * masterballTimeGenerationInMs
        )),
        masterball: Timestamp.fromDate(new Date(
          Date.now() - defaultHyperballsNumber * hyperballTimeGenerationInMs
        )),
      },
    }
  };

  toggleOption(option: PickOne<UserProfile['options']>) {
    this.profile.options = { ...this.profile.options, ...option };
  }
}
