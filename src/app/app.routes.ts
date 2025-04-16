import { Routes } from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {DashboardComponent} from './landing/dashboard/dashboard.component';

export const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"/login"},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"dashboard", component: DashboardComponent},
];
