import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageHeaderComponent } from './profile-page-header/profile-page-header.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';
import { Profile } from './model/profile-page.model';

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
  public profile: Profile = {
    id: '510',
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
  };

  toggleOption(option: PickOne<Profile['options']>) {
    this.profile.options = { ...this.profile.options, ...option };
  }
}
