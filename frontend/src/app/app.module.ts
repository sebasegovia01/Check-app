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
import { TransfersHistoryComponent } from './components/transfers-history/transfers-history.component';
import { HomeComponent } from './components/home/home.component';
import { httpInterceptorProviders } from './__helpers/http.interceptor';
import { BaseTemplateComponent } from './components/base-template/base-template.component';
import {ToastrModule,} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaseTemplateComponent,
    HomeComponent,
    AddAddresseeComponent,
    DoTransferComponent,
    TransfersHistoryComponent,
    NotFoundComponent,
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
  providers: [httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
