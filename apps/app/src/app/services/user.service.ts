import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, of, switchMap, take } from 'rxjs';
import { UserProfile } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<UserProfile | null> = this.getUser();

  constructor(
    private readonly firestore: Firestore,
    private readonly authService: AuthService
  ) {}

  private getUser(): Observable<UserProfile | null> {
    return this.authService.$user.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserFromFirestore(user.uid);
        }

        return of(null);
      })
    );
  }

  getUserDocument(uid: string) {
    const userDocument = doc(this.firestore, `users/${uid}`);

    return docData(userDocument, {
      idField: 'id',
    });
  }

  getUserFromFirestore(uid: string): Observable<UserProfile> {
    return this.getUserDocument(uid) as Observable<UserProfile>;
  }

  async updateUserInFirestore(uid: string, data: UserProfile) {
    return await setDoc(doc(this.firestore, 'users', uid), data);
  }

  async updateUserStats(id: string, stats: Partial<UserProfile['stats']>) {
    const userDocument = doc(this.firestore, 'users', id);

    this.getUserDocument(id)
      .pipe(take(1))
      .subscribe(async (user) => {
        await updateDoc(userDocument, {
          stats: {
            ...(user as UserProfile).stats,
            ...stats,
          },
        });
      });
  }
}
