import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from '../job-seeker.service';
import { AuthenticationService } from '../app-authentication/authentication.service';

@Component({
  selector: 'wkp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobSeeker = {};
  err;
  constructor(private jobSeekerService: JobSeekerService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.jobSeekerService.getSeeker("5bcf4e38aa365f26086518fb")
      .subscribe((jobSeeker) => {
        this.jobSeeker = jobSeeker;
        console.log(this.jobSeeker);
      }, (err) => {
        this.err = err;
        console.log(err);
      });
     this.auth.loginSeeker("ianyimih@gmal.com", "pass123");
     this.jobSeekerService.getSeekers()
      .subscribe(console.log, console.log);
  }

}
