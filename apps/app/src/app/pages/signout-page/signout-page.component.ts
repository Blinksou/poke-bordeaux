import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signout-page',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class SignoutPageComponent {
  constructor(private readonly authService: AuthService) {
    authService.signOut().then(() => console.log('Signed Out'));
  }
}
