import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cILocation } from './location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'wkp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchData: {} ;
  jobsSearchForm: FormGroup = this.fb.group({
    search: ['', Validators.required],
    // jobType: ['', Validators.required],
    location: ['', Validators.required]
  });

  companiesSearchForm: FormGroup = this.fb.group({
    search: ['', Validators.required],
    // jobType: ['', Validators.required],
    location: ['', Validators.required]
  });
  
  candidatesSearchForm: FormGroup = this.fb.group({
    search: ['', Validators.required],
    // jobType: ['', Validators.required],
    location: ['', Validators.required]
  });
  
  locations: cILocation[] = [
    {value: 'accra', viewValue: 'Accra'},
    {value: 'koforidua', viewValue: 'Koforidua'}
  ]

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    if (form == this.jobsSearchForm) {
      this.router.navigate(['/jobs'], {
        queryParams: { 
          searchTerm: form.value.search, 
          location: form.value.location}
      });
    }
    
  }
}
