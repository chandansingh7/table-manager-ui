import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {User} from '../../../models/user.model';
import {UserRole} from '../../../models/role.enum';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  // @Output() formSubmit = new EventEmitter<User>();

  constructor(private readonly fb: FormBuilder,
              private readonly userService: UserService,
              private readonly router: Router,
              private readonly snackBar: MatSnackBar) {
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
  errorMessage: string = '';  // To store the error message
  successMessage: string = '';  // To store the success message

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: User = this.registerForm.value;

      this.userService.registerUser(userData).subscribe({
        next: response => {
          this.snackBar.open('✅ Registration successful!', 'Close', {
            duration: 4000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']);
        },
        error: error => {
          this.snackBar.open(`❌ Registration failed: ${error.message}`, 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open('⚠️ Please fill all the fields correctly.', 'Close', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
    }
  }
}
