import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageHeaderComponent } from './profile-page-header/profile-page-header.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';
import { UserProfile } from '../../model/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

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
  profile$: Observable<UserProfile | null>;

  constructor(
    private readonly userService: UserService
  ) {
    this.profile$ = userService.user$;
  }

  toggleOption(option: PickOne<UserProfile['options']>) {
    this.profile$.subscribe(async (user) => {
      if (user) {
        await this.userService.updateUserInFirestore(user.id, {
          ...user,
          options: {
            ...user.options,
            ...option,
          },
        });
      }
    });
  }

  handleDescriptionEdition(description: string) {
    this.profile$.subscribe(async (user) => {
      if (user) {
        await this.userService.updateUserInFirestore(user.id, {
          ...user,
          infos: {
            ...user.infos,
            description,
          },
        });
      }
    });
  }

  handleAvatarEdition(avatar: string) {
    this.profile$.subscribe(async (user) => {
      if (user) {
        await this.userService.updateUserInFirestore(user.id, {
          ...user,
          infos: {
            ...user.infos,
            avatar: avatar,
          },
        });
      }
    });
  }
}
