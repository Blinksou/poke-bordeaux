import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureBehaviourComponent } from './capture-behaviour.component';

describe('CaptureBehaviourComponent', () => {
  let component: CaptureBehaviourComponent;
  let fixture: ComponentFixture<CaptureBehaviourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptureBehaviourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaptureBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
