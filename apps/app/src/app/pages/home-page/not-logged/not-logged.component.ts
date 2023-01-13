import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-logged',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './not-logged.component.html',
  styleUrls: ['./not-logged.component.scss'],
})
export class NotLoggedComponent {}
