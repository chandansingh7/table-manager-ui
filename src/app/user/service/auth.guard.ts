import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser) {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return false;
};
