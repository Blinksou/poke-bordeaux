import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** CONSTANTS */
import { defaultEnergiesNumber } from '../../constants/defaultNumbers.constant';

/** DATE-FNS */
import { formatDuration, intervalToDuration } from 'date-fns';

/** INTERFACES */
import { IncrementableCounter } from '../../../../interfaces/hunt/incrementableCounter.interface';

@Component({
  selector: 'app-energy-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './energy-state.component.html',
  styleUrls: ['./energy-state.component.scss'],
})
export class EnergyStateComponent implements OnChanges {
  @Input() energyState!: IncrementableCounter;
  @Output() incrementEnergyState = new EventEmitter<IncrementableCounter>();

  maxEnergies = defaultEnergiesNumber;
  nextGenerationIn = '';

  ngOnChanges(): void {
    if (this.energyState.count < this.maxEnergies) {
      const duration = intervalToDuration({
        start: new Date(Date.now() + this.energyState.nextGenerationInMs),
        end: new Date(),
      });

      const formattedDuration = formatDuration(duration);
      this.nextGenerationIn = formattedDuration !== '' ? formattedDuration : '0s';
    } else {
      this.nextGenerationIn = 'you are full of energy !';
    }
  }
}
