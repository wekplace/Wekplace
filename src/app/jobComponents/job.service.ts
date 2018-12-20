import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  uri: string = `http://${environment.domain}:${environment.port}/jobs/`;

  constructor(private http: HttpClient) { }

  getSearch(searchTerm:string, location:string): Observable<any[]> {
    const options = {
      params: new HttpParams()
        .set('search', searchTerm)
        .set('location', location)
    };
    return this.http.get<any[]>(this.uri + 'search', options);
  } 

  getJob(id: string): Observable<any> {
    return this.http.get<any>(this.uri + id);
  }

  getJobs(): Observable<any[]> {
    const populatePath = 'employer';
    const populateSelect = 'name';
    const options = {
      params: new HttpParams()
      .set('populatePath', populatePath)
      .set('populateSelect', populateSelect)
    };
    return this.http.get<any>(this.uri, options);
  }
}
