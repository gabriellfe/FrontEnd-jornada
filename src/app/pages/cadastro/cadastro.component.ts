import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/CadastroService';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { CadastroUser, PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  cadastrar() {
    const formCadastro = this.formularioService.getCadastro();

    if (formCadastro?.valid) {
      const novoCadastro = {
        cidade: formCadastro.value.cidade,
        cpf: formCadastro.value.cpf,
        email: formCadastro.value.email,
        estado: formCadastro.value.estado,
        genero: formCadastro.value.genero,
        nascimento: formCadastro.value.nascimento,
        nome: formCadastro.value.nome,
        senha: formCadastro.value.senha,
        telefone: formCadastro.value.telefone
      } as CadastroUser
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (value) => {
          console.log('Cadastro realizado com sucesso', value);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Erro ao realizar cadastro', err)
        }
      });
    }
  }
}
