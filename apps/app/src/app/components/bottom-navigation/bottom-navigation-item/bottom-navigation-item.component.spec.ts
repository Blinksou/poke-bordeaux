import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationItemComponent } from './bottom-navigation-item.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BottomNavigationItemComponent', () => {
  let component: BottomNavigationItemComponent;
  let fixture: ComponentFixture<BottomNavigationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigationItemComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
