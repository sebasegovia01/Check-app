import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BANKS_URL = 'https://bast.dev/api/banks.php';

@Injectable({
  providedIn: 'root',
})
export class BanksService {
  constructor(private http: HttpClient) {}

  public getBanks(): Observable<any> {
    return this.http.get<any>(API_BANKS_URL, {withCredentials: false});
  }
}
