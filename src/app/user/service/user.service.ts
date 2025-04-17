import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { User } from '../models/user.model';
import {environment} from '../../../environments/environment';  // Assuming you have a user model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.apiUrl}/auth/public`; // Define your backend API URL

  constructor(private readonly http: HttpClient) {}

  // Method to register a user
  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
  }
}
