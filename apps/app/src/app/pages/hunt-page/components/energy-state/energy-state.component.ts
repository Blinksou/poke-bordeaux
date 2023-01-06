import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/** INTERFACES */
import { IncrementableCounter } from '../../../../interfaces/hunt/incrementableCounter.interface';
import { defaultEnergiesNumber } from '../../constants/defaultNumbers.constant';
import { formatDuration, intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-energy-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './energy-state.component.html',
  styleUrls: ['./energy-state.component.scss'],
})
export class EnergyStateComponent {
  @Input() energyState!: IncrementableCounter;
  @Output() incrementEnergyState = new EventEmitter<IncrementableCounter>();

  maxEnergies = defaultEnergiesNumber;
  nextGenerationIn = '';

  constructor() {
    if (this.energyState) {
      const duration = intervalToDuration({
        start: new Date(Date.now() + this.energyState.nextGenerationInMs),
        end: new Date(),
      });

      this.nextGenerationIn = formatDuration(duration);
    }
  }
}
