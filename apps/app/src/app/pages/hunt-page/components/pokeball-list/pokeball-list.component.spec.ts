import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeballListComponent } from './pokeball-list.component';

describe('PokeballListComponent', () => {
  let component: PokeballListComponent;
  let fixture: ComponentFixture<PokeballListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeballListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeballListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
