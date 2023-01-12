import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { UserProfile } from '../../../model/user';

@Component({
  selector: 'app-profile-page-header',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule],
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.scss'],
})
export class ProfilePageHeaderComponent {
  @Input() profile: UserProfile['infos'] | Record<string, never> = {};
}
