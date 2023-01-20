import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

function createCompareValidator(
  controlOne: AbstractControl | null,
  controlTwo: AbstractControl | null
) {
  return () => {
    if (controlOne?.value !== controlTwo?.value)
      return { match_error: 'Value does not match' };
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  signupForm: FormGroup;

  get email() {
    return this.signupForm.get('email');
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.signupForm = fb.group({
      nickname: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', Validators.required),
      repeatedPassword: new FormControl<string>('', Validators.required),
    });
    this.signupForm.addValidators(
      createCompareValidator(
        this.signupForm.get('password'),
        this.signupForm.get('repeatedPassword')
      )
    );
  }

  signupAction() {
    this.authService.signUp({
      email: this.signupForm.get('email')?.value,
      nickname: this.signupForm.get('nickname')?.value,
      password: this.signupForm.get('password')?.value,
    });
  }
}
