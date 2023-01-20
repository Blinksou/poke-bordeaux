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
  activities$ = this.activityService.getActivities();

  constructor(private readonly activityService: ActivityService) {}

  trackByActivity(index: number, activity: BaseActivity<unknown>) {
    return activity.id;
  }
}
