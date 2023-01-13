import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokeball } from '../../../components/pokeball/model/pokeball';
import { PokeballComponent } from '../../../components/pokeball/pokeball.component';

@Component({
  selector: 'app-pokeball-list',
  standalone: true,
  imports: [CommonModule, PokeballComponent],
  templateUrl: './pokeball-list.component.html',
})
export class PokeballListComponent {
  @Input() pokeballs: Pokeball[] | null = [
    {
      name: 'superball',
      count: 0,
      capturePercentage: 10,
      nextBallDate: new Date(),
    },
    {
      name: 'hyperball',
      count: 0,
      capturePercentage: 10,
      nextBallDate: new Date(),
    },
    {
      name: 'masterball',
      count: 0,
      capturePercentage: 10,
      nextBallDate: new Date(),
    },
    {
      name: 'pokeball',
      count: 0,
      capturePercentage: 10,
      nextBallDate: new Date(),
    },
  ];
  @Input() selectedBall: Pokeball | null = null;
  @Output() selectBall = new EventEmitter<Pokeball>();

  selectPokeball($event: Pokeball) {
    console.log('emit');
    this.selectBall.emit($event);
  }
}
