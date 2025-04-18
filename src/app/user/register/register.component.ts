import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {ListUsersComponent} from './manager/list-users/list-users.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, MatIconModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // onRegisterUser(userData: any) {
  //   console.log('Registered user data: ', userData);
  //   // Handle the registration logic (send the data to the backend, etc.)
  // }
}
