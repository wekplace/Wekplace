import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ops } from '../shared/ops.model';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  uri: String = `http://${environment.domain}:${environment.port}/seekers`;

  constructor(private http: HttpClient) { }

  getSeeker(seekerId) {
    return this.http.get(`${this.uri}/${seekerId}`);
  }

  getSeekers() {
    return this.http.get(`${this.uri}`);
  }

  signupSeeker(email, password, firstName, lastName, otherName) {
    let signupInfo = {
      firstName,
      lastName,
      otherName,
      email,
      password
    }
    
    return this.http.post(`${this.uri}/signup`, signupInfo);
  }

  loginSeeker(username, password) {
    let credential = {email: username, password}
    return this.http.post(`${this.uri}/login`, credential);
  }

  updateSeeker(seekerId, updateOps: Ops[]) {
    return this.http.patch(`${this.uri}/${seekerId}`, updateOps);
  }
}
