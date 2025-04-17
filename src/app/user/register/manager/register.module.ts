// register.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // RegisterComponent
import { RegisterUserComponent } from './register-user/register-user.component';  // RegisterUserComponent
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {RegisterComponent} from '../register.component';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [RegisterComponent, RegisterUserComponent],  // Register both components
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  exports: [RegisterComponent, RegisterUserComponent]
})
export class RegisterModule {}
