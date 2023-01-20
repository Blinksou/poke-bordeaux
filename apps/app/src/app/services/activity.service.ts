import { Injectable } from '@angular/core';
import { BaseActivity, CaptureActivityPayload } from '../model/activity';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private readonly firestore: Firestore) {}

  private async addActivity(activity: BaseActivity<unknown>) {
    const activitiesCollection = collection(this.firestore, `activities`);

    return addDoc(activitiesCollection, activity);
  }

  async addCaptureActivity(
    activity: Omit<BaseActivity<CaptureActivityPayload>, 'type'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'capture',
    });
  }

  async addTradeInfoActivity(
    activity: Omit<BaseActivity<CaptureActivityPayload>, 'type'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-info',
    });
  }

  async addTradeAskActivity(
    activity: Omit<BaseActivity<CaptureActivityPayload>, 'type'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-ask',
    });
  }

  getActivities() {
    const activitiesCollection = collection(this.firestore, `activities`);

    return collectionData(activitiesCollection, {
      idField: 'id',
    }) as unknown as Observable<BaseActivity<unknown>[]>;
  }
}
