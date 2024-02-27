import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn()) {
    return true; // Allow navigation if user is logged in
  } else {
    // Redirect to login page if user is not logged in
    inject(Router).navigate(['/login']);
    return false;
  }
  
  return true;
};
