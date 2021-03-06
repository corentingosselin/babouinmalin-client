import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
const TOKEN_HEADER_KEY = 'Authorization';  // for Spring Boot back-end
@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.token.getToken();
    const token = localStorage.getItem('token');
    // Clone the request to add the new header.
    const authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}





export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
