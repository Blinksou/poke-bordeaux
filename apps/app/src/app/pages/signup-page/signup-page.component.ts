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
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  get email() {
    return this.signupForm.get('email');
  }

  constructor(private readonly fb: FormBuilder) {
    this.signupForm = fb.group({
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
    console.log(this.signupForm.value);
    console.log(this.signupForm);
  }
}
