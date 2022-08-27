import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let client_session = this.storageService.getClientSession();

    if (client_session && client_session.token) {
      if (req.url !== 'https://bast.dev/api/banks.php') {
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${client_session.token}`,
          },
        });
      }
    } else {
      // Not token, session expired
      this.router.navigateByUrl('login');
    }

    return next.handle(req).pipe(
      // tap((httpEvent: HttpEvent<any>) => {
      //   // success
      // }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('Internal server error');
          this.storageService.clean();
          if (error.status === 401 || error.status === 403)
            this.router.navigateByUrl('logout');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(error);
      })
    );
  }
}
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
