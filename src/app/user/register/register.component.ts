import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

import {RegisterUserComponent} from './manager/register-user/register-user.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, MatIconModule, RegisterUserComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  onRegisterUser(userData: any) {
    console.log('Registered user data: ', userData);
    // Handle the registration logic (send the data to the backend, etc.)
  }
}
