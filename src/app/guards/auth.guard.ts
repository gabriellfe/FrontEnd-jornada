import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../core/services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(TokenService).possuiToken()
    ? true
    : inject(Router).navigate(['/login']);
};
