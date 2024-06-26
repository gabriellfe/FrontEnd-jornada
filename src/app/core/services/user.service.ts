import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria, jwtClient } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<jwtClient | null>(null);

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwt_decode(token) as jwtClient;
    this.userSubject.next(user);
    console.log(user);  
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  setUserNull() {
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}



