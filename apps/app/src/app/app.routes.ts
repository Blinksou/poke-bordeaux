import { Route } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HuntPageComponent } from './pages/hunt-page/hunt-page.component';
import { PokedexPageComponent } from './pages/pokedex-page/pokedex-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'hunt',
    component: HuntPageComponent,
  },
  {
    path: 'pokedex',
    component: PokedexPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
