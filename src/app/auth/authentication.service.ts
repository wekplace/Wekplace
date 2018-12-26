import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobSeekerService } from '../api-services/job-seeker.service';
import { EmployerService } from '../api-services/employer.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SignUpData, Filter, LoginData } from './auth.model';
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import * as moment from "moment";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  uri: string = `http://${environment.domain}:${environment.port}/users`;
  authChange = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  checkFieldUnique(searchTerm$: Subject<object>) {
    let field: string;
    return searchTerm$.pipe(
      map((value: Filter) => {
        field = value.field;
        return value.fieldValue;
      }),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(searchTerm => this.isTermUnique(field, searchTerm)),
      map(value => value['isUnique'])
    );
  }

  private setSession(authData) {
    let expiresIn = authData.expiresIn.split('')[0];
    const expiresAt = moment().add(+expiresIn, 'hour');
    console.log('expires at:', expiresAt);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  private isTermUnique(field: string, term: string) {
    const options = {
      params: new HttpParams()
        .set('field', field)
        .set('fieldValue', term)
    }
    return this.http.get(`${this.uri}/isunique`, options);
  }

  private authSuccessfully(authData) {
    this.setSession(authData);
    this.authChange.next(true);
  }

  signUp(data: SignUpData) {
    return this.http.post(`${this.uri}/signup`, data)
      .pipe(
        tap(authData => {
          this.authSuccessfully(authData);
        }),
        map(authData => authData['user'])
      );
  }

  login(credential: LoginData) {
    return this.http.post(`${this.uri}/login`, credential)
      .pipe(
        tap(authData => {
          this.authSuccessfully(authData);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    this.authChange.next(false);
  }
}
