import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  
  uri: String = `http://${environment.domain}:${environment.port}/seekers`;

  constructor(private http: HttpClient) { }

  getSeeker(seekerId) {
    return this.http.get(`${this.uri}/${seekerId}`);
  }

  getSeekers() {
    return this.http.get(`${this.uri}`);
  }

  updateSeeker(seekerId, updateOps) {
    return this.http.patch(`${this.uri}/${seekerId}`, updateOps);
  }
}
