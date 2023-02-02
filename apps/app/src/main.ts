import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  provideFirestore,
  CACHE_SIZE_UNLIMITED,
} from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatDialogModule,
      TranslateModule.forRoot(),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => {
        const firestore = initializeFirestore(getApp(), {
          cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        });
        enableIndexedDbPersistence(firestore).catch((err) => {
          if (err.code == 'failed-precondition') {
            console.log(
              'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
            );
          } else if (err.code == 'unimplemented') {
            console.log(
              'The current browser does not support all of the  features required to enable persistence'
            );
          }
        });
        return firestore;
      }),
      provideStorage(() => getStorage())
    ),
  ],
}).catch((err) => console.error(err));
