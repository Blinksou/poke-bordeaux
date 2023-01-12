import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** AUTHENTICATION */
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from '@angular/fire/auth';

/** FIRESTORE */
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

/** RXJS */
import { catchError, first, from, map, NEVER, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: Observable<boolean> = authState(this.auth).pipe(
    map((user) => !!user)
  );
  $user: Observable<User | null> = authState(this.auth);

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
    private readonly firestore: Firestore
  ) {}

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

        await this.createUserInFirestore(result.user);
        await this.router.navigateByUrl('/login');
      });
  }

  private displayFailedPopup() {
    return undefined;
  }

  private async createUserInFirestore(user: User) {
    return await setDoc(doc(this.firestore, 'users', user.uid), {
      infos: {
        description:
          '♪ I wanna be the very best, like no one ever was To catch them is my real test To train them is my cause ♪',
        avatar: '',
        name: user.email,
      },
      options: {
        allowTrading: true,
        allowOthersToViewActivity: true,
      },
      stats: {
        capturedPokemons: 0,
        thrownPokeballs: 0,
        tradingFulfilled: 0,
      },
    });
  }
}
