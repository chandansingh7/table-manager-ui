import { Routes } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {loginRedirectGuard} from './user/service/guards/login-redirect.guard';
import {authGuard} from './user/service/auth.guard';
import {RegisterUserComponent} from './user/register/manager/register-user/register-user.component';
import {ListUsersComponent} from './user/register/manager/list-users/list-users.component';
import {EditUserDialogComponent} from './user/register/manager/list-users/edit-user-dialog/edit-user-dialog.component';

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
    children:[
      { path: 'add-user', component: RegisterUserComponent },
      { path: 'list-user', component: ListUsersComponent },
      { path: 'edit-user/:id', component: EditUserDialogComponent },
      { path: '', redirectTo: 'add-user', pathMatch: 'full' },
    ],
    canActivate: [authGuard],
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./landing/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
];
