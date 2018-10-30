import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JobSeekerService } from '../job-seeker.service';

@Component({
  selector: 'wkp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    othername: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private jobSeekerService: JobSeekerService) { }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.signupForm.value.email,
      password = this.signupForm.value.password,
      firstname = this.signupForm.value.firstname,
      lastname = this.signupForm.value.lastname,
      othername = this.signupForm.value.othername;
    this.jobSeekerService.signupSeeker(email, password, firstname, lastname, othername)
      .subscribe((res) => {console.log(res)},
                (err) => {console.log(err)});
  }
}
