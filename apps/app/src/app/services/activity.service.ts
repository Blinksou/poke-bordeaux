import { Injectable } from '@angular/core';
import { BaseActivity, CaptureActivityPayload } from '../model/activity';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private readonly firestore: Firestore) {}

  async addCaptureActivity(
    activity: Omit<BaseActivity<CaptureActivityPayload>, 'type'>
  ) {
    console.log('addCaptureActivity', activity);

    const activitiesCollection = collection(this.firestore, `activities`);

    return addDoc(activitiesCollection, {
      ...activity,
      type: 'capture',
    });
  }
}
