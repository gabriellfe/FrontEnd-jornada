import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  authenticated: boolean = false;

  constructor(
    private tokenService: TokenService,
    private route: Router,
    private auth: AutenticacaoService,
    private userService: UserService
  ) {
    auth.getLoggedInName.subscribe(() => {
      this.authenticated = true;
    })
  }
  user$ = this.userService.retornarUser();

  ngOnInit(): void {
    this.authenticated = this.tokenService.possuiToken();
  }

  logout(){
    this.authenticated = false;
    this.userService.setUserNull();
    this.auth.deslogar().subscribe({
      next: (value) => {
        this.route.navigate(['/login']);
        this.tokenService.excluirToken();
      },
      error: (err) => {
        console.log('Erro ao realizar cadastro', err)
      }
    });
  }
  setAutenthicated(authenticated: boolean){
    this.authenticated = authenticated;
  }
}
