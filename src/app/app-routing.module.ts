import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { authGuard } from './guards/auth.guard';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { SolicitaCodigoComponent } from './pages/solicita-codigo/solicita-codigo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'redefinir-senha',
    component: RedefinirSenhaComponent
  },
  {
    path: 'solicita-codigo',
    component: SolicitaCodigoComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard]
    
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
