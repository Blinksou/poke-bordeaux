import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAskBehaviourComponent } from './trade-ask-behaviour.component';

describe('TradeAskBehaviourComponent', () => {
  let component: TradeAskBehaviourComponent;
  let fixture: ComponentFixture<TradeAskBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeAskBehaviourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeAskBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
