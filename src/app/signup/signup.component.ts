import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'wkp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    file: ['', Validators.required],
    password: ['', Validators.required],
    userType: ['', Validators.required],
    termsConditions: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }
}
