import { Routes } from '@angular/router';
import {RegisterComponent} from './user/register/register.component';
import {loginRedirectGuard} from './user/service/guards/login-redirect.guard';
import {authGuard} from './user/service/auth.guard';
import {RegisterUserComponent} from './user/register/manager/register-user/register-user.component';
import {ListUsersComponent} from './user/register/manager/list-users/list-users.component';
import {EditUserDialogComponent} from './user/register/manager/list-users/edit-user-dialog/edit-user-dialog.component';
import {ManageTableComponent} from './manage-table/manage-table.component';
import {AddTableComponent} from './manage-table/add-table/add-table.component';
import {ListTableComponent} from './manage-table/list-table/list-table.component';
import {EditTableDialogComponent} from './manage-table/list-table/edit-table-dialog/edit-table-dialog.component';
import {TableStatsComponent} from './manage-table/table-stats/table-stats.component';

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
  {
    path: 'manage-table',
    component: ManageTableComponent,
    children:[
      { path: 'add-table', component: AddTableComponent },
      { path: 'list-table', component: ListTableComponent },
      { path: 'table-stats', component: TableStatsComponent },
      { path: 'edit-table/:id', component: EditTableDialogComponent },
      { path: '', redirectTo: 'table-stats', pathMatch: 'full' },
    ],
    canActivate: [authGuard],
  }
];
