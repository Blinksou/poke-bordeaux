import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageHeaderComponent } from './profile-page-header/profile-page-header.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';

export interface Profile {
  id: string;
  infos: {
    description: string;
    avatar: string;
    name: string;
  };
  options: {
    allowTrading: boolean;
    allowOthersToViewActivity: boolean;
  };
  stats: {
    capturedPokemons: number;
    thrownPokeballs: number;
    tradingFulfilled: number;
  };
}
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
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
}
