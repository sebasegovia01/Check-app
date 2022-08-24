import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddresseeComponent } from './components/add-addressee/add-addressee.component';
import { DoTransferComponent } from './components/do-transfer/do-transfer.component';
import { TransfersListComponent } from './components/transfers-list/transfers-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {
    path: 'destinatarios/crear',
    component: AddAddresseeComponent
  },
  {
    path: 'historial/',
    component: TransfersListComponent
  },
  {
    path: 'transferencias/crear',
    component: DoTransferComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
