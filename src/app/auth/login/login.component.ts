import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginData } from '../auth.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'wkp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  location: Location;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthenticationService) { }

  ngOnInit() {
  }

  goBack() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

  onSubmit(form: NgForm) {
    let loginData: LoginData = {
      userLogin: form.value.userLogin,
      password: form.value.password      
    }
    console.log(loginData);
    this.auth.login(loginData)
      .subscribe((authData) => console.log(authData), 
                  (err) => console.log(err));
  }
}
