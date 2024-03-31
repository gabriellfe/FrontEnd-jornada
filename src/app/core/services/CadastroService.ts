import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CadastroUser, EditaPessoaUsuaria, PessoaUsuaria } from '../types/type';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrar(pessoaUsuaria: CadastroUser): Observable<CadastroUser> {
    return this.http.post<CadastroUser>(`/api/user/create`, pessoaUsuaria);
  }

  buscarCadastro(token: string): Observable<PessoaUsuaria> {
    return this.http.get<PessoaUsuaria>(`/api/user/perfil`);
  }

  editarCadastro(pessoaUsuaria: EditaPessoaUsuaria, token: string): Observable<EditaPessoaUsuaria> {
    return this.http.put<EditaPessoaUsuaria>(`/api/user/perfil`, pessoaUsuaria);
  }

}
