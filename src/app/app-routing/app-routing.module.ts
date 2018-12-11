import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from '../home/home.component';
// import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

const appRoutes: Routes = [
  {
    path: 'home', 
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'signup', component: SignupComponent}
    ]
  },
  // {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // for debugging purposes
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
