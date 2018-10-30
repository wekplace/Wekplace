import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../app-authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wkp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.loginSeeker(this.loginForm.value.email, this.loginForm.value.password);
  }
}
