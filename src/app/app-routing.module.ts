import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:"l",component:LoginComponent},
  {path:"home",component: HomeComponent},
  {path:"",component:DashboardComponent},
  {path:"cadastro",component: CadastroComponent},
  {path:"pagamento",component: PagamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
