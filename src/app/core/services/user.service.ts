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
export class UserService {


  constructor(private http: HttpClient, private router: Router) {}


  update(uuid: string, oldEmail: string, newEmail: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}users/email/` + uuid, { newEmail, oldEmail }, httpOptions)
      .pipe(map(user => {
        return user;
      }));
  }

  updatePassword(uuid: string, oldPassword: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}users/password/` + uuid, { oldPassword, password, confirmPassword }, httpOptions)
      .pipe(map(user => {
        return user;
      }));
  }

}
