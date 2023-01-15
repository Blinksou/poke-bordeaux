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
  selector: 'app-energies-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './energies-state.component.html',
  styleUrls: ['./energies-state.component.scss'],
})
export class EnergyStateComponent implements OnChanges {
  @Input() energiesState!: IncrementableCounter;

  maxEnergies = defaultEnergiesNumber;
  nextGenerationIn = '';

  ngOnChanges(): void {
    if (this.energiesState.count < this.maxEnergies) {
      this.nextGenerationIn = getStringInterval(
        new Date(Date.now() + this.energiesState.nextGenerationInMs),
        new Date(),
      );
    } else {
      this.nextGenerationIn = 'you are full of energy !';
    }
  }
}
