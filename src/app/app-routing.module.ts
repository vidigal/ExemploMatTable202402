import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { TabelaComponent } from './tabela/tabela.component';

const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "tabela", component: TabelaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
