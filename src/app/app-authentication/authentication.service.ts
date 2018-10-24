import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobSeekerService } from '../job-seeker.service';
import { EmployerService } from '../employer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jobSeekerService: JobSeekerService, private employerService: EmployerService) { }

  loginEmployer(username: String, password: String) {
    this.employerService.loginEmployer(username, password)
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('employer', JSON.stringify(res));
        }
      })
  }

  logoutEmployer() {
    localStorage.removeItem('jobSeeker');
  }

  loginSeeker(username: String, password: String) {
    this.jobSeekerService.loginSeeker(username, password)
      .subscribe((res) => {
        if (res) {
          localStorage.setItem('jobSeeker', JSON.stringify(res));
        }
      })
  }

  logoutSeeker() {
    localStorage.removeItem('jobSeeker');
  }

  getToken(index: string) {
    return JSON.parse(localStorage.getItem(index));
  }
}
