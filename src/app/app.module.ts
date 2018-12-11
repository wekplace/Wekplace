import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { JobSeekerService } from './api-services/job-seeker.service';
import { AuthenticationService } from './app-authentication/authentication.service';
import { JWTInterceptor } from './http-Interceptors/jwt.interceptor';
import { EmployerService } from './api-services/employer.service';
import { UserService } from './api-services/user.service';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    BackdropComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDfwaUJ0vaWF_NEGOh7im9X0q23WydI_QQ",
      authDomain: "wekplace-aa990.firebaseapp.com",
      storageBucket: "wekplace-aa990.appspot.com",
      projectId: "wekplace-aa990",
    }),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    EmployerService,
    UserService,
    JobSeekerService, 
    AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
