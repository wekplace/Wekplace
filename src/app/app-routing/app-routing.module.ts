import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { JobsComponent } from '../jobComponents/jobs.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { JobListResolver } from '../jobComponents/job-list.resolver';
import { JobDetailComponent } from '../jobComponents/job-detail/job-detail.component';
import { JobResolver } from '../jobComponents/job.resolver';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'jobs',
    component: JobsComponent,
    
    children: [
      {
        path: ':jobId',
        component: JobDetailComponent,
        resolve: { jobDetail: JobResolver }
      },
    ],
    resolve: { jobList: JobListResolver }
  },
  { path: 'signup', component: SignupComponent, outlet: 'popup'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // for debugging purposes
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
