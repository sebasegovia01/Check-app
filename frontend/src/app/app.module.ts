import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAddresseeComponent } from './components/add-addressee/add-addressee.component';
import { LoginComponent } from './components/login/login.component';
import { DoTransferComponent } from './components/do-transfer/do-transfer.component';
import { TransfersListComponent } from './components/transfers-list/transfers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAddresseeComponent,
    LoginComponent,
    DoTransferComponent,
    TransfersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
