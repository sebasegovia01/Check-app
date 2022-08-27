import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addressee } from '../models/addressee.model';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.api_url}/addressees`;

const storageService = new StorageService();

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AddresseeService {

  constructor(private http: HttpClient) {}

  public create(data: Addressee): Observable<any> {
    return this.http.post(`${API_URL}/new`, data);
  }

  public search(id: number, character_name: string): Observable<Addressee> {
    return this.http.get<Addressee>(
      `${API_URL}/search/${id}/${character_name}`,
      httpOptions
    );
  }

  public getAllByClientId(client_id: number): Observable<Addressee[]> {
    return this.http.get<Addressee[]>(`${API_URL}/client/${client_id}`, httpOptions);
  }
  public getById(id: number): Observable<Addressee> {
    return this.http.get<Addressee>(`${API_URL}/${id}`, httpOptions);
  }
}
