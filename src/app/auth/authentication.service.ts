import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobSeekerService } from '../api-services/job-seeker.service';
import { EmployerService } from '../api-services/employer.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { SignUpData, Filter } from './auth.model';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  uri: string = `http://${environment.domain}:${environment.port}/users`;

  constructor(
    private http: HttpClient, 
    private router: Router) { }
  
  signUp(data: SignUpData) {
    return this.http.post(`${this.uri}/signup`, data);
  }

  checkFieldUnique(searchTerm$: Subject<object>) {
    let field: string;
    return searchTerm$.pipe(
      map((value:Filter) => {
        field = value.field;  
        return value.fieldValue;
      }),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(searchTerm => this.isTermUnique(field, searchTerm)),
      map(value => value['isUnique'])
    );
  }

  private isTermUnique(field: string, term: string) {
    const options = {
      params: new HttpParams()
                .set('field', field)
                .set('fieldValue', term)
    }
    return this.http.get(`${this.uri}/isunique`, options);
  }

  login(username: string, password: string) {
    let credential = {userLogin: username, password};
    return this.http.post(`${this.uri}/login`, credential);
  }

  logout() {
    
  }

  getUserAuthInfoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
