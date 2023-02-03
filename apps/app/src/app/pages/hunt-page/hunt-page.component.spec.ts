import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntPageComponent } from './hunt-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

describe('HuntPageComponent', () => {
  let component: HuntPageComponent;
  let fixture: ComponentFixture<HuntPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HuntPageComponent,
        TranslateModule.forRoot(),
        FirestoreModule,
        FirebaseAppModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HuntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
