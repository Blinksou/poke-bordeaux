import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from '../../../components/activity-card/activity-card.component';

@Component({
  selector: 'app-activity-component',
  standalone: true,
  imports: [CommonModule, ActivityCardComponent],
  templateUrl: './activity-component.html',
})
export class ActivityComponent {
  activities = [
    {
      type: 'trade-info',
      data: {
        askerId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
        askerPokemonId: '1',
        userId: 'JGno0wh8oEQwhv2FyVvv4b6N7fz2',
        userPokemonId: '2',
      },
    },
    {
      type: 'trade-ask',
      data: {
        askerId: 'JGno0wh8oEQwhv2FyVvv4b6N7fz2',
        askerPokemonId: '1',
        userId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
        userPokemonId: '2',
        status: 'pending',
      },
    },
    {
      type: 'capture',
      data: {
        userId: 'iYUePp5VhPg1ZzHZ9NJHUwsEiM32',
        userPokemonId: '1',
      },
    },
  ] as const;
}
