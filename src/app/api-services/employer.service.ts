import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ops } from '../shared/ops.model';

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

  signupEmployer(email, password) {
    let signupInfo = {
      email,
      password
    }
    return this.http.post(`${this.uri}/signup`, signupInfo);
  }

  loginEmployer(username, password) {
    let credential = {email: username, password}
    return this.http.post(`${this.uri}/login`, credential);
  }

  updateEmployer(employerId, updateOps: Ops[]) {
    return this.http.patch(`${this.uri}/${employerId}`, updateOps);
  }
}
