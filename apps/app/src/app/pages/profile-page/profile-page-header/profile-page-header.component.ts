import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Input() profile: UserProfile['infos'] | undefined;
  @Output() descriptionEdited = new EventEmitter<string>();
  @ViewChild('profileDescription', { static: false }) profileDescDiv:
    | ElementRef
    | undefined;

  onPenClick() {
    const element = this.profileDescDiv?.nativeElement;
    element.setAttribute('contenteditable', true);
    element.style.backgroundColor = '#ffffff';
    element.style.color = '#000000';
  }

  onDescriptionChange(event: any) {
    const content = event.target.textContent;
    event.target.setAttribute('contenteditable', false);
    event.target.style.backgroundColor = '';
    event.target.style.color = '';
    this.descriptionEdited.emit(content);
  }
}
