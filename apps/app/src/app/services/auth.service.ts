import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { catchError, first, from, map, NEVER, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Observable<boolean> = authState(this.auth).pipe(
    tap(console.log),
    map((user) => !!user)
  );

  constructor(private readonly auth: Auth, private readonly router: Router) {}

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email || '', password || ''))
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

  private displayFailedPopup() {
    return undefined;
  }
}
