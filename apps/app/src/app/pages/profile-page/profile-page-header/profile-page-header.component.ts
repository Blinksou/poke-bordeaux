import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Profile } from '../profile-page.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-page-header',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule],
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.scss'],
})
export class ProfilePageHeaderComponent {
  @Input() profile: Profile['infos'] | Record<string, never> = {};
}
