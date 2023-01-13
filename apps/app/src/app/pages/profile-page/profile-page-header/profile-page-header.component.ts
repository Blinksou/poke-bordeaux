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
import { ProfilePageTakePhotoComponent } from './profile-page-take-photo/profile-page-take-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-profile-page-header',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatIconModule,
    ProfilePageTakePhotoComponent,
  ],
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.scss'],
})
export class ProfilePageHeaderComponent {
  @Input() profile: UserProfile['infos'] | undefined;
  @Output() descriptionEdited = new EventEmitter<string>();
  @Output() avatarEdited = new EventEmitter<string>();
  @ViewChild('profileDescription', { static: false }) profileDescDiv:
    | ElementRef
    | undefined;

  public avatar: string | undefined;

  constructor(public dialogPhoto: MatDialog) {
    this.avatar = this.profile?.avatar;
  }

  onPenClick() {
    const element = this.profileDescDiv?.nativeElement;
    element.setAttribute('contenteditable', true);
    element.style.backgroundColor = '#ffffff';
    element.style.color = '#000000';
  }

  // eslint-disable-next-line
  onDescriptionChange(event: any) {
    const content = event.target.textContent || this.profile?.description;
    event.target.setAttribute('contenteditable', 'false');
    event.target.style.backgroundColor = '';
    event.target.style.color = '';
    this.descriptionEdited.emit(content);
  }

  openDialog() {
    const dialogRef = this.dialogPhoto.open(ProfilePageTakePhotoComponent);
    dialogRef.afterClosed().subscribe((image: WebcamImage | undefined) => {
      if (image) {
        this.avatar = image.imageAsDataUrl;
        this.avatarEdited.emit(image.imageAsDataUrl);
      }
    });
  }
}
