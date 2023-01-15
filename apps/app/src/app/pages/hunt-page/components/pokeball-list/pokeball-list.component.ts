import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/** COMPONENTS */
import { PokeballComponent } from '../../../../components/pokeball/pokeball.component';

/** INTERFACES */
import { PokeballsState, Pokeball } from '../../../../interfaces/hunt/pokeballsState.interface';

/** UTILS */
import getStringInterval from '../../../../utils/getStringInterval.util';

@Component({
  selector: 'app-pokeball-list',
  standalone: true,
  imports: [CommonModule, PokeballComponent],
  templateUrl: './pokeball-list.component.html',
})
export class PokeballListComponent implements OnChanges{
  @Input() pokeballs: PokeballsState | null = null
  @Input() selectedBall: Pokeball | null = null;
  @Output() selectBall = new EventEmitter<Pokeball>();

  nextGenerationIn = '';

  selectPokeball($event: Pokeball) {
    this.selectBall.emit($event);
  }

  ngOnChanges(): void {
    if (this.selectedBall) {
      this.nextGenerationIn = getStringInterval(
        new Date(Date.now() + this.selectedBall.nextGenerationInMs),
        new Date(),
      );
    }
  }
}
