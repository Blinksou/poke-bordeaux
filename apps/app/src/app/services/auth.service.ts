import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** AUTHENTICATION */
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';

/** FIRESTORE */
import { doc, Firestore, setDoc, Timestamp } from '@angular/fire/firestore';

/** RXJS */
import { catchError, first, from, map, NEVER, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from '../pages/login-page/login-error-dialog/login-error-dialog.component';
import { SignupErrorDialogComponent } from '../pages/signup-page/signup-error-dialog/signup-error-dialog.component';
import { energyTimeGenerationInMs, hyperballTimeGenerationInMs, masterballTimeGenerationInMs, pokeballTimeGenerationInMs, superballTimeGenerationInMs } from '../pages/hunt-page/constants/generationTimes.constant';
import { defaultEnergiesNumber, defaultHyperballsNumber, defaultMasterballsNumber, defaultPokeballsNumber, defaultSuperballsNumber } from '../pages/hunt-page/constants/defaultNumbers.constant';

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
    private readonly firestore: Firestore,
    private readonly dialog: MatDialog
  ) {}

  signIn(email: string, password: string) {
    from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        catchError(async () => {
          this.displayFailedSignInPopup();
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
          this.displayFailedSignUpPopup();
          return NEVER;
        }),
        first()
      )
      .subscribe(async (result) => {
        if (!('user' in result)) return;

        await this.createUserInFirestore(result.user);
        await this.router.navigateByUrl('/');
      });
  }

  async signOut() {
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }

  private displayFailedSignInPopup() {
    return this.dialog.open(LoginErrorDialogComponent);
  }

  private displayFailedSignUpPopup() {
    return this.dialog.open(SignupErrorDialogComponent);
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
      hunt: {
        energiesDate: Timestamp.fromDate(new Date(Date.now() - energyTimeGenerationInMs * defaultEnergiesNumber)),
        pokeballs: {
          pokeball: Timestamp.fromDate(new Date(Date.now() - pokeballTimeGenerationInMs * defaultPokeballsNumber)),
          superball: Timestamp.fromDate(new Date(Date.now() - superballTimeGenerationInMs * defaultSuperballsNumber)),
          hyperball: Timestamp.fromDate(new Date(Date.now() - hyperballTimeGenerationInMs * defaultHyperballsNumber)),
          masterball: Timestamp.fromDate(new Date(Date.now() - masterballTimeGenerationInMs * defaultMasterballsNumber))
        }
      },
      pokemons: [],
      stats: {
        capturedPokemons: 0,
        thrownPokeballs: 0,
        tradingFulfilled: 0,
      },
    });
  }
}
