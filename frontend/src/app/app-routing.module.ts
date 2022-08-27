import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddresseeComponent } from './components/add-addressee/add-addressee.component';
import { DoTransferComponent } from './components/do-transfer/do-transfer.component';
import { HomeComponent } from './components/home/home.component';
import { TransfersHistoryComponent } from './components/transfers-history/transfers-history.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    data: { title: 'Mi Banco - Principal' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Mi Banco - Principal' },
  },
  {
    path: 'destinatarios/crear',
    component: AddAddresseeComponent,
    data: { title: 'Mi Banco - Destinatarios' },
  },
  {
    path: 'historial',
    component: TransfersHistoryComponent,
    data: { title: 'Mi Banco - Transferencias' },
  },
  {
    path: 'transferencias/crear',
    component: DoTransferComponent,
    data: { title: 'Mi Banco - Transferencias' },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { 
    path: '**', redirectTo: '/404' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
