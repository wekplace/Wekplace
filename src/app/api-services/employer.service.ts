import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  uri: String = `http://${environment.domain}:${environment.port}/employers`;

  constructor(private http: HttpClient) { }
  getEmployer(employerId) {
    return this.http.get(`${this.uri}/${employerId}`);
  }

  getEmployers() {
    return this.http.get(`${this.uri}`);
  }

  updateEmployer(employerId, updateOps) {
    return this.http.patch(`${this.uri}/${employerId}`, updateOps);
  }
}
