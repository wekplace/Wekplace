import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthenticationService } from './auth/authentication.service';
import { JWTInterceptor } from './auth/http-Interceptors/jwt.interceptor';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { JobsComponent } from './jobComponents/jobs.component';
import { JobListComponent } from './jobComponents/job-list/job-list.component';
import { MatPaginatorIntl } from '@angular/material';
import { JobListPaginator } from './jobComponents/job-list/job-list.paginator';
import { JobDetailComponent } from './jobComponents/job-detail/job-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JobService } from './jobComponents/job.service';
import { ModalComponent } from './modal/modal.component';
import { EqualFieldsValidatorDirective } from './shared/equal-fields-validator.directive';
import { UniqueFieldsValidatorDirective } from './shared/unique-field-validator.directive';
import { WelcomeComponent } from './employer/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    JobsComponent,
    JobListComponent,
    JobDetailComponent,
    PageNotFoundComponent,
    ModalComponent,
    EqualFieldsValidatorDirective,
    UniqueFieldsValidatorDirective,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDfwaUJ0vaWF_NEGOh7im9X0q23WydI_QQ",
      authDomain: "wekplace-aa990.firebaseapp.com",
      storageBucket: "wekplace-aa990.appspot.com",
      projectId: "wekplace-aa990",
    }),
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    { provide: MatPaginatorIntl, useClass: JobListPaginator},
    JobService,
    AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
