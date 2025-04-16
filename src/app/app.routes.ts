import { Routes } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {loginRedirectGuard} from './user/service/guards/login-redirect.guard';
import {authGuard} from './user/service/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {
    path: 'login',
    loadComponent: () => import('./user/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginRedirectGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./landing/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard], // ⬅️ use authGuard here
  },
];
