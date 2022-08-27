import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountType } from '../models/account-type.model';
import { StorageService } from './storage.service';

const API_URL = `${environment.api_url}/account_types`;

const storageService = new StorageService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  

  constructor(private http: HttpClient) {

  }

  public getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(API_URL, httpOptions);
  }

}
