import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly firestore: Firestore) {}

  async createUserInFirestore(user: User) {
    return await setDoc(doc(this.firestore, 'users', user.uid), {
      bio: '♪ I wanna be the very best, like no one ever was To catch them is my real test To train them is my cause ♪',
      username: user.email,
      doesAllowTrading: true,
      doesAllowViewActivity: true,
      stats: {
        thrownPokeballs: 0,
        capturedPokemons: 0,
        tradingFulfilled: 0,
      },
    });
  }

  async getUserFromFirestore(uid: string) {
    return doc(this.firestore, 'users', uid);
  }

  async updateUserInFirestore(uid: string, data: never) {
    return await setDoc(doc(this.firestore, 'users', uid), data);
  }
}
