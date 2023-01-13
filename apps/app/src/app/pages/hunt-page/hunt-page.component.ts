import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { EnergyStateComponent } from './components/energy-state/energy-state.component';
import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

/** INTERFACES */
import { IncrementableCounter } from '../../interfaces/hunt/incrementableCounter.interface';

/** SERVICES */
import { HuntService } from './hunt.service';
import { IntervalService } from '../../services/interval.service';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, EnergyStateComponent, PokeballListComponent],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  energyState!: IncrementableCounter;

  constructor(private readonly huntService: HuntService, private readonly intervalService: IntervalService) {

    this.huntService.huntState$.subscribe((huntState) => {
      if(huntState === null) return;
      console.log('coucou')

      this.energyState = huntState.energyState;
    });

    this.intervalService.interval$.subscribe(() => {
      if (!this.energyState) return;
      
      this.energyState = {
        ...this.energyState,
        nextGenerationInMs: this.energyState.nextGenerationInMs - 1000,
      };

      if (this.energyState.nextGenerationInMs < 1000) {
        this.incrementEnergyState(this.energyState);
      }
    })
  }

  incrementEnergyState(energyState: IncrementableCounter) {
    this.energyState = this.huntService.incrementEnergyState(energyState);
  }

  decrementEnergyState() {
    this.huntService.decrementEnergyState(this.energyState);
  }
}
