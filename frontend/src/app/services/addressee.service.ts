import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addressee } from '../models/addressee.model';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:7000/api_check/v1/addressees';

const storageService = new StorageService();

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${
    storageService.getClientSession().token || undefined
  }`,
});

const requestOptions = { headers: headers };

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
      requestOptions
    );
  }

  public getAllByClientId(client_id: number): Observable<Addressee> {
    return this.http.get<Addressee>(`${API_URL}/${client_id}`, requestOptions);
  }
  public getById(id: number): Observable<Addressee> {
    return this.http.get<Addressee>(`${API_URL}/${id}`, requestOptions);
  }
}
