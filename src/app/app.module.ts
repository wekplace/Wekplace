import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { JobSeekerService } from './api-services/job-seeker.service';
import { AuthenticationService } from './app-authentication/authentication.service';
import { JWTInterceptor } from './http-Interceptors/jwt.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    JobSeekerService, 
    AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
