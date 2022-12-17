import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../profile-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-profile-options',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent {
  @Input() options: Profile['options'] | Record<string, never> = {};
}
