import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeInfoActivity } from '../../../model/activity';

@Component({
  selector: 'app-trade-info-behaviour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trade-info-behaviour.component.html',
})
export class TradeInfoBehaviourComponent {
  @Input() activity!: TradeInfoActivity;
}
