import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../profile-page.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-statistics',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.scss'],
})
export class ProfileStatisticsComponent {
  @Input() stats: Profile['stats'] | Record<string, never> = {};
}
