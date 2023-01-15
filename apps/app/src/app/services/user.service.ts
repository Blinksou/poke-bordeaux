import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
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

  getUserFromFirestore(uid: string): Observable<UserProfile> {
    const userDocument = doc(this.firestore, `users/${uid}`);

    return docData(userDocument, {
      idField: 'id',
    }) as Observable<UserProfile>;
  }

  getAllUsersFromFirestore(): Observable<UserProfile[]> {
    const userCollection = collection(this.firestore, `users`);

    return collectionData(userCollection, {
      idField: 'id',
    }) as Observable<UserProfile[]>;
  }

  async updateUserInFirestore(uid: string, data: UserProfile) {
    return await setDoc(doc(this.firestore, 'users', uid), data);
  }
}
