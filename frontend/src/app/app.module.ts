import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgSelectModule} from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAddresseeComponent } from './components/add-addressee/add-addressee.component';
import { LoginComponent } from './components/login/login.component';
import { DoTransferComponent } from './components/do-transfer/do-transfer.component';
import { TransfersListComponent } from './components/transfers-list/transfers-list.component';
import { HomeComponent } from './components/home/home.component';
import { httpInterceptorProviders } from './__helpers/http.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ToastrModule,} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    AddAddresseeComponent,
    DoTransferComponent,
    TransfersListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
