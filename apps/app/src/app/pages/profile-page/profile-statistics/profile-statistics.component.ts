import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserProfile } from '../../../model/user';

@Component({
  selector: 'app-profile-statistics',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.scss'],
})
export class ProfileStatisticsComponent {
  @Input() stats: UserProfile['stats'] | Record<string, never> = {};
}
