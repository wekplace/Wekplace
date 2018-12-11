import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String = `http://${environment.domain}:${environment.port}/seekers`;

  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get(`${this.uri}/${userId}`);
  }

  getUsers() {
    return this.http.get(`${this.uri}`);
  }

  signupUser(email: string, password: string, firstName: string, lastName: string, username?: string) {
    let signupInfo = {
      firstName,
      lastName,
      email,
      username,
      password
    }
    
    return this.http.post(`${this.uri}/signup`, signupInfo);
  }

  loginUser(userLogin, password) {
    let credential = {userLogin, password};
    return this.http.post(`${this.uri}/login`, credential);
  }

  updateUser(userId, updateOps) {
    return this.http.patch(`${this.uri}/${userId}`, updateOps);
  }

}
