import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface JobListItem {
  employer: string;
  title: string;
  logoUrl: string;
  createdAt: Date;
  id?: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: JobListItem[] = [
  {employer: 'Westcape', title: 'Senior Software Developer', logoUrl: 'https://www.freelogodesign.org/Content/img/logo-ex-7.png', createdAt: new Date() },
  {employer: 'Andela', title: 'Javascript Developen', logoUrl: 'https://image.freepik.com/free-vector/purple-logo-with-arrows-shape_1043-46.jpg', createdAt: new Date() },
  {employer: 'WOOGLE', title: 'Office Administrator', logoUrl: 'https://cdn.shopifycloud.com/hatchful-web/assets/313d73fa42f04a46213abc6267b4d074.png', createdAt: new Date() },
  {employer: 'Lirylum', title: 'Data Scientist', logoUrl: 'https://freepiker-storage.s3.amazonaws.com/preview/preview_2cb46a8d911b46d81f9a2aa0492ce904.jpg', createdAt: new Date() },
  {employer: 'Dios', title: 'Lawyer', logoUrl: 'https://www.logoinstant.com/wp-content/uploads/Peacock-logo-design-free-300x242.jpg', createdAt: new Date() },
  {employer: 'Denned', title: 'Sales person', logoUrl: 'https://about.canva.com/wp-content/uploads/sites/3/2016/08/Food-and-Drink-Logo.png', createdAt: new Date() },
  {employer: 'Ecobank', title: 'Software Developer', logoUrl: 'https://cdn.shopifycloud.com/hatchful-web/assets/2adcef6c1f7ab8a256ebdeba7fceb19f.png', createdAt: new Date() },
  {employer: 'University of Ghana', title: 'Chief Information Technology Officer', logoUrl: 'https://dcassetcdn.com/design_img/3582766/610634/610634_19624027_3582766_d648c407_thumbnail.png', createdAt: new Date() },
  {employer: 'Future Tech Industries', title: 'IT Assistant', logoUrl: 'https://www.agentorange.co.za/images/ld-logos/africanism-illustrative-vector-logo.png', createdAt: new Date() },
  {employer: 'Artificial Intel Incorporated', title: 'Graphic Designer', logoUrl: 'https://seeklogo.com/images/M/m-design-logo-09A5D82F03-seeklogo.com.png', createdAt: new Date() },
  {employer: 'OrionVelt', title: 'Web Developer', logoUrl: 'https://www.logoinstant.com/wp-content/uploads/Peacock-logo-design-free-300x242.jpg', createdAt: new Date() },
  {employer: 'Westeros', title: 'Building Architect', logoUrl: 'https://www.freelogodesign.org/Content/img/logo-ex-7.png', createdAt: new Date() },
  {employer: 'Hubtel', title: 'Senior Software Developer', logoUrl: 'https://cdn.shopifycloud.com/hatchful-web/assets/2adcef6c1f7ab8a256ebdeba7fceb19f.png', createdAt: new Date() },
  // {id: 20, name: 'Calcium'},
];

/**
 * Data source for the JobList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class JobListDataSource extends DataSource<JobListItem> {
  data: JobListItem[] = [];

  constructor(private paginator: MatPaginator, private sort: MatSort, initData) {
    super();
    this.initializeData(initData);
  }

  private initializeData(data: any[]) {
    let jobListItem;
    data.forEach((value, index) => {
      console.log(value);
      jobListItem = {
        employer: value.employer.name,
        title: value.title,
        logoUrl: EXAMPLE_DATA[index].logoUrl || "",
        createdAt: value.createdAt,
        id: value._id
      };
      this.data.push(jobListItem);
    })
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<JobListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: JobListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: JobListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'employer': return compare(a.employer, b.employer, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'createdAt': return compare(a.createdAt.valueOf(), b.createdAt.valueOf(), isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
