import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {User} from '../../../models/user.model';
import {UserRole} from '../../../models/role.enum';

@Component({
  selector: 'app-register-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ],
  templateUrl: './register-user.component.html',

  styleUrl: './register-user.component.scss'

})
export class RegisterUserComponent {

  registerForm: FormGroup;

  roles = Object.values(UserRole).map(role => ({
    value: role,
    label: this.formatRoleLabel(role)
  }));

  @Output() formSubmit = new EventEmitter<User>();

  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  private formatRoleLabel(role: string): string {
    return role
      .replace('ROLE_', '')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;
      this.formSubmit.emit(userData);
    }
  }
}
