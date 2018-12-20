import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root'
})
export class JobListResolver implements Resolve<any[]> {

  constructor(private router: Router, private jobService: JobService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
    if (route.queryParamMap.get('searchTerm') || route.queryParamMap.get('location')) {
      return this.jobService.getSearch(
        route.queryParamMap.get('searchTerm'),
        route.queryParamMap.get('location')
      );
    } else {
      return this.jobService.getJobs();
    }
    
  }
}