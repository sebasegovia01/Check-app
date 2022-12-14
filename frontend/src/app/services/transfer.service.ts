import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.api_url}/transfers`;

const storageService = new StorageService();
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) {}

  
  public create(data: Transfer): Observable<any> {
    return this.http.post(`${API_URL}/new`, data);
  }

  public getAllByClientId(client_id: number): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${API_URL}/${client_id}`, httpOptions);
  }

}
