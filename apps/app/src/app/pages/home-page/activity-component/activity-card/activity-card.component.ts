import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeAskBehaviourComponent } from './trade-ask-behaviour/trade-ask-behaviour.component';
import { TradeInfoBehaviourComponent } from './trade-info-behaviour/trade-info-behaviour.component';
import { CaptureBehaviourComponent } from './capture-behaviour/capture-behaviour.component';
import { BaseActivity } from '../../../../model/activity';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [
    CommonModule,
    TradeAskBehaviourComponent,
    TradeInfoBehaviourComponent,
    CaptureBehaviourComponent,
  ],
  templateUrl: './activity-card.component.html',
})
export class ActivityCardComponent {
  @Input() activity!: BaseActivity<unknown>;

  pokemonImage: string | undefined;

  constructor(private readonly ref: ChangeDetectorRef) {}

  isTradeAskActivity() {
    return this.activity.type === 'trade-ask';
  }

  isTradeInfoActivity() {
    return this.activity.type === 'trade-info';
  }

  isCaptureActivity() {
    return this.activity.type === 'capture';
  }

  setPokemonImage(image: string) {
    this.pokemonImage = image;

    this.ref.detectChanges();
  }
}
