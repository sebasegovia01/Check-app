import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:7000/api_check/v1/clients/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  auth(rut: string, password: string): Observable<any> {
    let data = { rut: rut, password: password };

    return this.http.post(AUTH_API, data, httpOptions);
  }

  logout(): void {
    
    this.storageService.clean();

    console.log(this.storageService.isLoggedIn());

    if(!this.storageService.isLoggedIn()) {
      window.location.replace('/login')
    }
  }
}
