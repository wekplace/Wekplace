import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.getToken('jobSeeker')) {
      // then the user is logged in as a jobseeker
      return true;
    } else if (this.auth.getToken('employer')) {
      // then the user is logged in as an employer
      return true;
    }

    // then the user is not logged in so redirect
    this.router.navigate(['/home']);
    return false;
  }
}
