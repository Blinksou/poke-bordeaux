import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLogoComponent } from './header-logo.component';
import { CommonModule } from '@angular/common';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderLogoComponent', () => {
  let component: HeaderLogoComponent;
  let fixture: ComponentFixture<HeaderLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderLogoComponent,
        CommonModule,
        FirebaseAppModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
