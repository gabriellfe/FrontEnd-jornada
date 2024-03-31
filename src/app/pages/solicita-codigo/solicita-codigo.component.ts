import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-solicita-codigo',
  templateUrl: './solicita-codigo.component.html',
  styleUrls: ['./solicita-codigo.component.scss']
})
export class SolicitaCodigoComponent implements OnInit{
  redefinirForm!: FormGroup
  onErrorCodigo: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.redefinirForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  solicitaCodigo(){
    const email = this.redefinirForm.value.email;
    this.authService.solicitaCodigo(email).subscribe({
      next: (value) => {
        console.log('Autenticado com sucesso', value);
        this.dataService.setEmail(email);
        this.router.navigate(['redefinir-senha']);
        this.redefinirForm.reset();
      },
      error: (err) => {
        console.log('Problema na autenticação', err)
        this.onErrorCodigo = true;
      },
    });
  }

}
