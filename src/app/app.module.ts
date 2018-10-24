import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NavbarComponent } from './navbar/navbar.component';
import { JobSeekerService } from './job-seeker.service';
import { AuthenticationService } from './app-authentication/authentication.service';
import { JWTInterceptor } from './http-Interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    JobSeekerService, 
    AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
