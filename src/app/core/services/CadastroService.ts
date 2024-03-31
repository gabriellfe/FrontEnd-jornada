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
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });

    return this.http.get<PessoaUsuaria>(`/api/user/perfil`, { headers });
  }


  editarCadastro(pessoaUsuaria: EditaPessoaUsuaria, token: string): Observable<EditaPessoaUsuaria> {
    const headers = new HttpHeaders({
      'token': `Bearer ${token}`
    });

    return this.http.put<PessoaUsuaria>(`/api/user/perfil`, pessoaUsuaria, { headers });
  }

}
