import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import {StorageService} from './storage.service';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth/public`; // adjust backend URL

  constructor(private readonly http: HttpClient,
              private readonly authLocalStorage: StorageService) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        this.authLocalStorage.setItem('token', res.token);
      })
    );
  }

  getToken(): string | null {
    return this.authLocalStorage.getItem('token');
  }

  logout(): void {
    this.authLocalStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    console.log(this.getToken())
    return !!this.getToken();
  }
}
