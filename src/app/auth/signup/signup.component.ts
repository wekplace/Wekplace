import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SignUpData, Filter } from '../auth.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'wkp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userTypes: object[] = [{value:'seeker', viewValue:'Job Seeker'}, {value:'employer', viewValue:'Employer'}];
  userTypeSelected: string;
  location: Location;

  constructor(private router: Router, private auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  goBack() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

  onSubmit(form: NgForm) {
    let signupData: SignUpData = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      account: {
        category: this.userTypeSelected
      }
    }
    console.log(signupData);
    this.auth.signUp(signupData)
      .subscribe((user) => console.log(user), 
                  (err) => console.log(err));
  }
}
