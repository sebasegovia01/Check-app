import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.api_url}/clients`;

const storageService = new StorageService();
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {


  constructor(private http: HttpClient) {

  }

  public getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${API_URL}/${id}`, httpOptions);
  }


}
