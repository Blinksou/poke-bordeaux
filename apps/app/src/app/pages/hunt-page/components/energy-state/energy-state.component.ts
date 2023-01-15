import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** CONSTANTS */
import { defaultEnergiesNumber } from '../../constants/defaultNumbers.constant';

/** INTERFACES */
import { IncrementableCounter } from '../../../../interfaces/hunt/incrementableCounter.interface';

/** UTILS */
import getStringInterval from '../../../../utils/getStringInterval.util';

@Component({
  selector: 'app-energy-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './energy-state.component.html',
  styleUrls: ['./energy-state.component.scss'],
})
export class EnergyStateComponent implements OnChanges {
  @Input() energyState!: IncrementableCounter;

  maxEnergies = defaultEnergiesNumber;
  nextGenerationIn = '';

  ngOnChanges(): void {
    if (this.energyState.count < this.maxEnergies) {
      this.nextGenerationIn = getStringInterval(
        new Date(Date.now() + this.energyState.nextGenerationInMs),
        new Date(),
      );
    } else {
      this.nextGenerationIn = 'you are full of energy !';
    }
  }
}
