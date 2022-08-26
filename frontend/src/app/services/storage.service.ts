import { Injectable } from '@angular/core';

const CLIENT_KEY = 'auth-client';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public storeClientSession(client_session: any): void {
    window.sessionStorage.removeItem(CLIENT_KEY);
    window.sessionStorage.setItem(CLIENT_KEY, JSON.stringify(client_session));
  }

  public getClientSession(): any {
    const client_session = window.sessionStorage.getItem(CLIENT_KEY);

    if (client_session) {
      return JSON.parse(client_session);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const client_session = window.sessionStorage.getItem(CLIENT_KEY);

    if (client_session) {
      return true;
    }

    return false;
  }
}
