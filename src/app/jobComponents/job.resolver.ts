import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root'
})
export class JobResolver implements Resolve<any[]> {

  constructor(private router: Router, private jobService: JobService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
    console.log(route.paramMap.get('jobId'));
    return this.jobService.getJob(route.paramMap.get('jobId'));
  }
}