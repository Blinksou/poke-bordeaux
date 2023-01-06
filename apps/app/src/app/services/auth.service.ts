import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';
import { catchError, filter, first, from, map, NEVER, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Observable<boolean> = authState(this.auth).pipe(
    map((user) => !!user)
  );

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  getUser() {
    if (!this.isLoggedIn) return null;

    return authState(this.auth).pipe(filter((user): user is User => !!user));
  }

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(async () => {
          this.displayFailedPopup();
          return NEVER;
        }),
        first()
      )
      .subscribe((result) => {
        if (!('user' in result)) return;
        console.log('LOGGED IN', result.user);

        this.router.navigateByUrl('/');
      });
  }

  signUp(email: string, password: string) {
    from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(async (err) => {
          console.error('ERROR WHILE SIGNING UP', err);
          return NEVER;
        }),
        first()
      )
      .subscribe(async (result) => {
        if (!('user' in result)) return;

        await this.userService.createUserInFirestore(result.user);
        await this.router.navigateByUrl('/login');
      });
  }

  private displayFailedPopup() {
    return undefined;
  }
}
