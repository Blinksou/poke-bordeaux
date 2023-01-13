import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInfoBehaviourComponent } from './trade-info-behaviour.component';

describe('InfoBehaviourComponent', () => {
  let component: TradeInfoBehaviourComponent;
  let fixture: ComponentFixture<TradeInfoBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInfoBehaviourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeInfoBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
