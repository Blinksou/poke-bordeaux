import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeballComponent } from '../../../../components/pokeball/pokeball.component';
import { PokeballsState, Pokeball } from '../../../../interfaces/hunt/pokeballsState.interface';
import { formatDuration, intervalToDuration } from 'date-fns';

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
      const duration = intervalToDuration({
        start: new Date(Date.now() + this.selectedBall.nextGenerationInMs),
        end: new Date(),
      });
      const format = (duration.days && duration.days > 1) ? ['days', 'hours'] : ['hours', 'minutes', 'seconds'];

      const formattedDuration = formatDuration(duration, {format: format});
      this.nextGenerationIn = formattedDuration !== '' ? formattedDuration : '0s';
    }
  }
}
