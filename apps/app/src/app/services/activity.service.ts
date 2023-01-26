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
  doc,
  Firestore,
  setDoc,
  Timestamp,
} from '@angular/fire/firestore';
import {
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs';
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

  private async addActivity(
    activity: Omit<BaseActivity<unknown>, 'createdAt'>
  ) {
    const activitiesCollection = collection(this.firestore, `activities`);

    return addDoc(activitiesCollection, {
      ...activity,
      createdAt: Timestamp.now(),
    });
  }

  async addCaptureActivity(
    activity: Omit<BaseActivity<CaptureActivityPayload>, 'type' | 'createdAt'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'capture',
    });
  }

  async addTradeInfoActivity(
    activity: Omit<BaseActivity<TradeInfoActivityPayload>, 'type' | 'createdAt'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-info',
    });
  }

  async addTradeAskActivity(
    activity: Omit<BaseActivity<TradeAskActivityPayload>, 'type' | 'createdAt'>
  ) {
    return this.addActivity({
      ...activity,
      type: 'trade-ask',
    });
  }

  getActivities() {
    const activitiesCollection = collection(this.firestore, `activities`);

    return this.userService.user$.pipe(
      startWith(null),
      switchMap((user: UserProfile | null) => {
        if (!user) return of([]);

        const data = collectionData(activitiesCollection, {
          idField: 'id',
        }) as unknown as Observable<BaseActivity<unknown>[]>;

        return data.pipe(
          map((activities) =>
            activities.filter(
              (activity) =>
                activity.type !== 'trade-ask' ||
                (this.isTradeAsk(activity) &&
                  activity.data.userId === user.id &&
                  activity.data.status === 'pending')
            )
          ),
          // Sort by createdAt field
          map((activities) =>
            activities.sort(
              (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
            )
          ),
          // Get all trade ask at the top
          map((activities) =>
            activities.sort((a, b) => (b.type === 'trade-ask' ? 1 : -1))
          ),
          map((activities) => of(activities)),
          shareReplay()
        );
      }),
      switchMap((activities) => activities),
      map((activities) => {
        activities.forEach((activity) => {
          this.userService
            .getUserFromFirestore(activity.data.userId)
            .subscribe((user) => {
              if (
                !this.isTradeAsk(activity) &&
                !user.options.allowOthersToViewActivity
              ) {
                activities.splice(activities.indexOf(activity), 1);
              }
            });
        });

        return activities;
      })
    );
  }

  isTradeAsk(
    activity: BaseActivity<unknown>
  ): activity is BaseActivity<TradeAskActivityPayload> {
    return activity.type === 'trade-ask';
  }

  async acceptTrade(activity: BaseActivity<TradeAskActivityPayload>) {
    const activitiesCollection = collection(this.firestore, `activities`);

    await this.userService.addPokemonToUser(
      activity.data.askerId,
      activity.data.userPokemonId
    );
    await this.userService.removePokemonFromUser(
      activity.data.userId,
      activity.data.userPokemonId
    );

    await setDoc(
      doc(activitiesCollection, activity.id),
      {
        data: {
          status: 'accepted',
        },
      },
      { merge: true }
    );

    this.userService
      .getUserFromFirestore(activity.data.userId)
      .pipe(take(1))
      .subscribe((user) => {
        this.userService.updateUserStats(user.id, {
          tradingFulfilled: user.stats.tradingFulfilled + 1,
        });
      });

    this.userService
      .getUserFromFirestore(activity.data.askerId)
      .pipe(take(1))
      .subscribe((user) => {
        this.userService.updateUserStats(user.id, {
          tradingFulfilled: user.stats.tradingFulfilled + 1,
        });
      });

    return this.addTradeInfoActivity({
      data: {
        userId: activity.data.userId,
        userPokemonId: activity.data.userPokemonId,
        askerId: activity.data.askerId,
        askerPokemonId: activity.data.askerPokemonId,
      },
    });
  }

  async declineTrade(activity: BaseActivity<TradeAskActivityPayload>) {
    const activitiesCollection = collection(this.firestore, `activities`);

    return setDoc(
      doc(activitiesCollection, activity.id),
      {
        data: {
          status: 'declined',
        },
      },
      { merge: true }
    );
  }
}
