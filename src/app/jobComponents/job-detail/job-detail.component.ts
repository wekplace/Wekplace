import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wkp-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  backgroundImage = {
    'background-image': 'url(../../assets/img/cover.jpeg)'
  }
  jobDetail: any;
  employerName: string;
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.data
      .pipe(map(data => data.jobDetail))
      .subscribe(jobDetail => this.jobDetail = jobDetail);
  
  }

}
