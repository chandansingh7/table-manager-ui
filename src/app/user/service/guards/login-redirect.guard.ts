import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    if (token) {
      router.navigate(['/dashboard']);
      return false;
    }
  }

  return true;
};
