import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatCell } from '@angular/material';
import { JobListDataSource } from './job-list-datasource';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wkp-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatCell) jobItem: MatCell;
  dataSource: JobListDataSource;
  selectedRow;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let jobList = this.route.snapshot.data.jobList;
    this.route.data.subscribe((data) => {
      this.dataSource = new JobListDataSource(this.paginator, this.sort, data.jobList);
      let firstJobId = data.jobList[0]._id;
      this.router.navigate(['jobs',firstJobId], {skipLocationChange: true});
      this.selectedRow = firstJobId;
    });
  }

  onClickJobItem(id) {
    this.selectedRow = id;
    this.router.navigate(['jobs',id], {skipLocationChange: true});
  }
}
