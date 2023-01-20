import { Injectable } from '@angular/core';
import {
  BaseActivity,
  CaptureActivityPayload,
  TradeAskActivityPayload,
  TradeInfoActivityPayload,
} from '../model/activity';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { map, mergeMap, Observable, take } from 'rxjs';
import { UserService } from './user.service';
import { UserProfile } from '../model/user';

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
    activity: Omit<BaseActivity<TradeInfoActivityPayload>, 'type'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-info',
    });
  }

  async addTradeAskActivity(
    activity: Omit<BaseActivity<TradeAskActivityPayload>, 'type'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-ask',
    });
  }

  getActivities() {
    const activitiesCollection = collection(this.firestore, `activities`);

    // let data = collectionData(activitiesCollection, {
    //   idField: 'id',
    // }) as unknown as Observable<BaseActivity<unknown>[]>;

    return this.userService.user$.pipe(
      take(1),
      mergeMap((user: UserProfile | null) => {
        if (!user) return [];

        const data = collectionData(activitiesCollection, {
          idField: 'id',
        }) as unknown as Observable<BaseActivity<unknown>[]>;

        return data.pipe(
          map((activities) =>
            activities.filter(
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
      })
    );
  }

  isTradeAsk(
    activity: BaseActivity<unknown>
  ): activity is BaseActivity<TradeAskActivityPayload> {
    return activity.type === 'trade-ask';
  }
}
