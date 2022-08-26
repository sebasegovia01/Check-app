import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountType } from '../models/account-type.model';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:7000/api_check/v1/account_types';

const storageService = new StorageService();

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${storageService.getClientSession().token || undefined}`
});

const requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  

  constructor(private http: HttpClient) {

  }

  public getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(API_URL, requestOptions);
  }

}
