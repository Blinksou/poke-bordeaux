import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyStateComponent } from './energy-state.component';

describe('EnergyStateComponent', () => {
  let component: EnergyStateComponent;
  let fixture: ComponentFixture<EnergyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnergyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
