import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityCardComponent } from '../../../components/activity-card/activity-card.component';

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [CommonModule, ActivityCardComponent],
  templateUrl: './logged.component.html',
})
export class LoggedComponent {
  activities = [
    {
      type: 'trade-info',
      data: {
        askerId: '1',
        askerPokemonId: '1',
        targetId: '2',
        targetPokemonId: '2',
      },
    },
    {
      type: 'trade-ask',
      data: {
        askerId: '1',
        askerPokemonId: '1',
        targetId: '2',
        targetPokemonId: '2',
        status: 'pending',
      },
    },
    {
      type: 'capture',
      data: {
        userId: '1',
        pokemonId: '1',
      },
    },
  ] as const;
}
