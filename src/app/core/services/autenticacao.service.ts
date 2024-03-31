import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { responseLogin } from '../types/type';
import { TokenService } from './token.service';

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  autenticar(login: string, password: string): Observable<HttpResponse<responseLogin>> {
    console.log(login);
    return this.http.post<responseLogin>(
      `/api/user/login`,
      { login, password },
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        console.log(response);
        const authToken = response.body?.token || '';
        this.userService.salvarToken(authToken);
        this.getLoggedInName.emit();
      })
    );
  }


  solicitaCodigo(email: string): Observable<HttpResponse<responseLogin>> {
    console.log(email);
    return this.http.post<responseLogin>(
      `/api/user/ticket`,
      { email },
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  redefineSenha(email: string, ticket: string, password: string): Observable<HttpResponse<responseLogin>> {
    console.log(email);
    return this.http.post<responseLogin>(
      `/api/user/change-password`,
      { email , ticket, password},
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  deslogar(token: string){
    console.log(token);
    const headers = new HttpHeaders({
      'token': `${token}`
    });
    return this.http.post<responseLogin>(`/api/user/logout`, null , { headers });
  }

}
