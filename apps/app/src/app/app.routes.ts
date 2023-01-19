import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HuntPageComponent } from './pages/hunt-page/hunt-page.component';
import { PokedexPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { IsNotSignedInGuard } from './guards/is-not-signed-in.guard';
import { IsSignedInGuard } from './guards/is-signed-in.guard';
import { SignoutPageComponent } from './pages/signout-page/signout-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile-page/profile-routes').then(
        (m) => m.profilePageRoutes
      ),
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup-page/signup-routes').then(
        (m) => m.signupPageRoutes
      ),
    canActivate: [IsNotSignedInGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-routes').then((m) => m.loginPageRoutes),
    canActivate: [IsNotSignedInGuard],
  },
  {
    path: 'hunt',
    component: HuntPageComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'pokedex',
    component: PokedexPageComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    // For testing purposes
    path: 'signout',
    component: SignoutPageComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
