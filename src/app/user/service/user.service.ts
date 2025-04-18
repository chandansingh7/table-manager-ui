import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';
import {AuthService} from './auth.service';  // Assuming you have a user model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.apiUrl}/auth/public`; // Define your backend API URL
  private readonly userUrl = `${environment.apiUrl}/v1/users`; // Define your backend API URL

  constructor(private readonly http: HttpClient,
              private readonly authService: AuthService) {}

  // Method to register a user
  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/`); // Replace with actual API
  }
}
