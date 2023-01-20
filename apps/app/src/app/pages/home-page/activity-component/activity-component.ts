import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from '../../../components/activity-card/activity-card.component';
import { BaseActivity } from '../../../model/activity';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-activity-component',
  standalone: true,
  imports: [CommonModule, ActivityCardComponent],
  templateUrl: './activity-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  // activities: BaseActivity<unknown>[] = [
  //   {
  //     id: '1',
  //     type: 'trade-info',
  //     data: {
  //       askerId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
  //       askerPokemonId: '1',
  //       userId: 'JGno0wh8oEQwhv2FyVvv4b6N7fz2',
  //       userPokemonId: '2',
  //     },
  //   },
  //   {
  //     id: '2',
  //     type: 'trade-ask',
  //     data: {
  //       askerId: 'JGno0wh8oEQwhv2FyVvv4b6N7fz2',
  //       askerPokemonId: '1',
  //       userId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
  //       userPokemonId: '2',
  //       status: 'pending',
  //     },
  //   },
  //   {
  //     id: '3',
  //     type: 'capture',
  //     data: {
  //       userId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
  //       userPokemonId: '1',
  //     },
  //   },
  // ];

  activities$ = this.activityService.getActivities();

  constructor(private readonly activityService: ActivityService) {}

  trackByActivity(index: number, activity: BaseActivity<unknown>) {
    return activity.id;
  }
}
