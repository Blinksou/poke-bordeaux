import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeAskActivity } from '../../../model/activity';

@Component({
  selector: 'app-trade-ask-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-ask-behaviour.component.html',
})
export class TradeAskBehaviourComponent {
  @Input() activity!: TradeAskActivity;
}
