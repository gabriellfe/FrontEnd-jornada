import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss']
})
export class RedefinirSenhaComponent implements OnInit{
  onErrorCodigo!: boolean;
  redefinirForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private dataService: DataService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.redefinirForm = this.formBuilder.group({
      email: [this.dataService.getEmail(), [Validators.required, Validators.email]],
      ticket: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      password: [null, [Validators.required]]
    })
    this.onErrorCodigo = false;
  }

  redefineSenha(){
    const email = this.redefinirForm.value.email;
    const ticket = this.redefinirForm.value.ticket;
    const password = this.redefinirForm.value.password;
    this.authService.redefineSenha(email, ticket, password).subscribe({
      next: (value) => {
        this.snack.open('Senha Redefinida com Sucesso!', 'Ok', 
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.router.navigate(['login']);
        this.redefinirForm.reset();
        this.dataService.setEmail('');
      },
      error: (err) => {
        console.log('Problema na autenticação', err)
        this.onErrorCodigo = true;
      },
    });
  }

}
