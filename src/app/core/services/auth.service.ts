import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, config, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../models/user.model';
import {Router} from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api_url}auth/login`, { email, password }, httpOptions)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(
          { id: user.id, email: user.email, name: user.name, surname: user.surname}));
        localStorage.setItem('token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }


  logOut(path: string): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    if (path != null) {
      this.router.navigate(['/' + path]);
    }
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
