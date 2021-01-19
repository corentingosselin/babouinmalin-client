import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users`);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.api_url}/users/register`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api_url}/users/${id}`);
  }
}
