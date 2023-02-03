import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationComponent } from './bottom-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BottomNavigationComponent', () => {
  let component: BottomNavigationComponent;
  let fixture: ComponentFixture<BottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigationComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
