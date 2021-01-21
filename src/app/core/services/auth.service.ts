import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}auth/login`, { email, password }, httpOptions)
      .pipe(map(user => {
        return user;
      }));
  }

  register(name: string, surname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}auth/register`, { email, password, name, surname }, httpOptions)
      .pipe(map(user => {
        return user;
      }));
  }


  logout(): void {
  }
}
