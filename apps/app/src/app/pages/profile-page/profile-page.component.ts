import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageHeaderComponent } from './profile-page-header/profile-page-header.component';
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';
import { UserProfile } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
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
  public profile: UserProfile | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    authService
      .getUser()
      ?.pipe(first())
      .subscribe(async (user) => {
        const userProfile = await this.userService.getUserFromFirestore(
          user.uid
        );
        this.profile = userProfile.data() as UserProfile;
      });
  }

  toggleOption(option: PickOne<UserProfile['options']>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.profile.options = { ...this.profile.options, ...option };

    this.authService
      .getUser()
      ?.pipe(first())
      .subscribe(async (user) => {
        if (this.profile) {
          await this.userService.updateUserInFirestore(user.uid, {
            ...this.profile,
            options: {
              ...this.profile?.options,
              ...option,
            },
          });
        }
      });
  }

  handleDescriptionEdition(description: string) {
    this.authService
      .getUser()
      ?.pipe(first())
      .subscribe(async (user) => {
        if (this.profile) {
          await this.userService.updateUserInFirestore(user.uid, {
            ...this.profile,
            infos: {
              ...this.profile.infos,
              description,
            },
          });
        }
      });
  }
}
