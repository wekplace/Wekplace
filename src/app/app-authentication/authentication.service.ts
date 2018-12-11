import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobSeekerService } from '../api-services/job-seeker.service';
import { EmployerService } from '../api-services/employer.service';
import { Router } from '@angular/router';
import { UserService } from '../api-services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient, 
    private userService: UserService,
    private router: Router) { }

  login(username: String, password: String) {
    this.userService.loginUser(username, password)
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUserAuthInfoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
