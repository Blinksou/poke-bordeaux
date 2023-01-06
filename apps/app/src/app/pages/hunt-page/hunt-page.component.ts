import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

/** SERVICES */
import { HuntService } from './hunt.service';

/** RXJS */
import { map, Observable } from 'rxjs';
import { EnergyStateComponent } from './components/energy-state/energy-state.component';
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, EnergyStateComponent, PokeballListComponent],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  energyState$: Observable<IncrementableCounter>;
  energyState!: IncrementableCounter;

  constructor(private readonly huntService: HuntService) {
    this.energyState$ = this.huntService
      .getHuntState('lol')
      .pipe(map((hunt) => hunt.energyState));

    this.energyState$.subscribe((energyState) => {
      this.energyState = energyState;

      setInterval(() => {
        console.log(this.energyState);
        this.energyState = {
          ...this.energyState,
          nextGenerationInMs: this.energyState.nextGenerationInMs + 1000,
        };
      }, 1000);
    });
  }

  incrementEnergyState($event: IncrementableCounter) {
    this.huntService.incrementEnergyState($event);
  }
}
