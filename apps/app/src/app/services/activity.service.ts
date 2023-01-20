import { Injectable } from '@angular/core';
import {
  BaseActivity,
  CaptureActivityPayload,
  TradeAskActivityPayload,
} from '../model/activity';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { filter, map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(
    private readonly firestore: Firestore,
    private readonly userService: UserService
  ) {}

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

    const data = collectionData(activitiesCollection, {
      idField: 'id',
    }) as unknown as Observable<BaseActivity<unknown>[]>;

    this.userService.user$.subscribe((user) => {
      if (!user) return;

      data.pipe(
        // Remove all trade ask that are not user's
        filter((activities) =>
          activities.every(
            (activity) =>
              activity.type !== 'trade-ask' ||
              (this.isTradeAsk(activity) && activity.data.userId === user.id)
          )
        ),
        // Get all trade ask at the top
        map((activities) =>
          activities.sort((a, b) => (b.type === 'trade-ask' ? 1 : -1))
        )
      );
    });

    return data;
  }

  isTradeAsk(
    activity: BaseActivity<unknown>
  ): activity is BaseActivity<TradeAskActivityPayload> {
    return activity.type === 'trade-ask';
  }
}
