import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Profile } from '../model/profile-page.model';

@Component({
  selector: 'app-profile-options',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent {
  @Input() options: Profile['options'] | Record<string, never> = {};
  @Output() toggleOptionEvent = new EventEmitter<PickOne<Profile['options']>>();
  toggleOption($event: PickOne<Profile['options']>) {
    this.toggleOptionEvent.emit($event);
  }
}
