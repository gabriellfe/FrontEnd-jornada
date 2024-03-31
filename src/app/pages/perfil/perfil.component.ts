import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/CadastroService';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/type';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  titulo = 'Olá, ';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;

  cadastro!: PessoaUsuaria;
  token: string = '';
  nome: string = '';
  form!: FormGroup<any> | null;

  constructor(
    private cadastroService: CadastroService,
    private tokenService: TokenService,
    private formularioService: FormularioService,
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro(this.token).subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.carregarFormulario();
    })
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      cidade: this.cadastro.cidade,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      telefone: this.cadastro.telefone,
      estado: this.cadastro.estado,
    });
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado
    }

    this.cadastroService.editarCadastro(dadosAtualizados, this.token).subscribe({
      next: () => {
        this.snack.open('Perfil Atualizado com Sucesso!', 'Ok',{
          panelClass: ['snackbar-1'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
