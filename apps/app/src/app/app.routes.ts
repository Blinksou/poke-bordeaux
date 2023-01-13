import { SignupComponent } from './pages/signup-page/signup-page.component';
import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HuntPageComponent } from './pages/hunt-page/hunt-page.component';
import { PokedexPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { IsNotSignedInGuard } from './guards/is-not-signed-in.guard';
import { IsSignedInGuard } from './guards/is-signed-in.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [IsSignedInGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsNotSignedInGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
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
    path: '**',
    redirectTo: '',
  },
];
