import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOptionsComponent } from './profile-options.component';
import { TranslateModule } from '@ngx-translate/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

describe('ProfileOptionsComponent', () => {
  let component: ProfileOptionsComponent;
  let fixture: ComponentFixture<ProfileOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileOptionsComponent,
        TranslateModule.forRoot(),
        FirestoreModule,
        FirebaseAppModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
