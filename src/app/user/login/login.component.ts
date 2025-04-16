import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  private errorMsg: string | null = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    //
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/dashboard']);
    // }

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: () =>
        this.router.navigate(['/dashboard']
        ),
      error: () => this.errorMsg = 'Invalid email or password'
    });
  }
}
