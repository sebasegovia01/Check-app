import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:7000/api_check/v1/clients';

const storageService = new StorageService();
 
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${storageService.getClientSession().token || undefined}`
});

const requestOptions = { headers: headers };

@Injectable({
  providedIn: 'root',
})
export class ClientService {


  constructor(private http: HttpClient) {

  }

  public getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${API_URL}/${id}`, requestOptions);
  }


}
