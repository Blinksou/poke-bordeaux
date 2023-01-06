import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { PokeballListComponent } from './pokeball-list/pokeball-list.component';

/** INTERFACES */
import { HuntState } from '../../interfaces/hunt/huntState.interface';

/** SERVICES */
import { HuntService } from './hunt.service';

/** RXJS */
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hunt-page',
  standalone: true,
  imports: [CommonModule, PokeballListComponent],
  templateUrl: './hunt-page.component.html',
  styleUrls: ['./hunt-page.component.scss'],
})
export class HuntPageComponent {
  energyState$: Observable<HuntState>;

  constructor(private readonly huntService: HuntService) {
    this.energyState$ = this.huntService.getHuntState('lol');
  }
}
