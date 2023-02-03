import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfilePageComponent,
        TranslateModule.forRoot(),
        FirestoreModule,
        FirebaseAppModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
