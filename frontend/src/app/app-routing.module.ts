import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddresseeComponent } from './components/add-addressee/add-addressee.component';
import { DoTransferComponent } from './components/do-transfer/do-transfer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TransfersListComponent } from './components/transfers-list/transfers-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Mi Banco - Principal'}
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Mi Banco - Principal'}
  },
  {
    path: 'destinatarios/crear',
    component: AddAddresseeComponent,
    data: {title: 'Mi Banco - Destinatarios'}
  },
  {
    path: 'historial',
    component: TransfersListComponent,
    data: {title: 'Mi Banco - Transferencias'}
  },
  {
    path: 'transferencias/crear',
    component: DoTransferComponent,
    data: {title: 'Mi Banco - Transferencias'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Mi Banco'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
