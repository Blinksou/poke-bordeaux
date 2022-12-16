import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuntService } from './hunt.service';
import { format } from 'date-fns';
import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, PokeballListComponent],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  energy = 0;
  maxEnergy = 0;
  durationBeforeNextEnery: string | null = null;

  constructor(private readonly huntService: HuntService) {
    const { energy, maxEnergy, durationBeforeNextEnery } =
      this.huntService.getEnergyInformations();

    this.energy = energy;
    this.maxEnergy = maxEnergy;
    this.durationBeforeNextEnery = format(durationBeforeNextEnery, `m'm' s's'`);
  }
}
