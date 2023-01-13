import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginPageComponent } from '../login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { ActivityComponent } from './activity-component/activity-component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginPageComponent,
    MatButtonModule,
    TranslateModule,
    RouterLink,
    NotLoggedComponent,
    ActivityComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(public readonly authService: AuthService) {}
}
