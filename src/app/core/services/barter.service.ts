import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Category} from '../models/category.model';
import {Barter} from '../models/barter.model';
import {map} from 'rxjs/operators';
import {BarterDetailed} from '../models/barter-detailed.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BarterService {
  constructor(private http: HttpClient) { }

  createBarter(form: FormData): Observable<any> {
    return this.http.post(`${environment.api_url}barter/register`, form);
  }

  getBarters(uuid: string): Observable<BarterDetailed[]> {
    return this.http.get<BarterDetailed[]>(`${environment.api_url}barter/user/` + uuid, httpOptions);
  }

  getLastBarters(): Observable<BarterDetailed[]> {
    return this.http.get<BarterDetailed[]>(`${environment.api_url}barter/lastbarters`, httpOptions);
  }

  getBarter(id: string): Observable<BarterDetailed> {
    return this.http.get<BarterDetailed>(`${environment.api_url}barter/` + id, httpOptions);
  }

  getBarterByCategory(id: number): Observable<BarterDetailed[]> {
    return this.http.get<BarterDetailed[]>(`${environment.api_url}barter/category/` + id, httpOptions);
  }

  deleteBarter(id: number): any {
    this.http.post(`${environment.api_url}barter/` + id, httpOptions).subscribe((result) => {
      return result;
    });
  }

}
