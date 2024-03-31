import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { AutenticacaoService } from '../services/autenticacao.service';
import { UserService } from '../services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private auth: UserService, private tokenService: TokenService, private router: Router,private snack: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error) {
             switch (error.status) {
              case 400:
                errorMsg = error.error.message
                break;
              case 403:
                this.tokenService.excluirToken();
                errorMsg = 'Sessão inválida!';
                this.auth.logout();
                this.snack.open(errorMsg, 'Ok',{
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.router.navigate(['login']);
                break;
              default:
                break;
            }
          }
          return throwError(error);
      })
  )
  }
}