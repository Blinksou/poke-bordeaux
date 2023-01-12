import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

/** COMPONENTS */
import { EnergyStateComponent } from './components/energy-state/energy-state.component';

/** INTERFACES */
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';

/** SERVICES */
import { HuntService } from './hunt.service';

/** RXJS */
import { map, Observable } from 'rxjs';

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
      .getHuntState('<userId>')
      .pipe(map((hunt) => hunt.energyState));

    this.energyState$.subscribe((energyState) => {
      this.energyState = energyState;

      setInterval(() => {
        this.energyState = {
          ...this.energyState,
          nextGenerationInMs: this.energyState.nextGenerationInMs - 1000,
        };

        if (this.energyState.nextGenerationInMs < 1000) {
          this.incrementEnergyState(this.energyState);
        }
      }, 1000);
    });
  }

  incrementEnergyState(energyState: IncrementableCounter) {
    this.energyState = this.huntService.incrementEnergyState(energyState);
  }

  decrementEnergyState() {
    this.energyState = this.huntService.decrementEnergyState(this.energyState);
  }
}
