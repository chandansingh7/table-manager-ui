import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const headers = token
    ? req.headers.set('Authorization', `Bearer ${token}`)
    : req.headers;

  const authReq = req.clone({ headers });
  return next(authReq);
};
