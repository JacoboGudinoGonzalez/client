import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';

import { AgmCoreModule } from '@agm/core';

//Modulos
import { MessagesModule } from './messages/messages.module';
import { AppointmentsModule } from './appointments/appointments.module';


import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { UploadService } from './services/upload.service';
import { ImpoService } from './services/impo.service';
import { GeoLocationService } from './services/geo-location.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//Servicios
import { UserGuard } from './services/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    MomentModule,
    MessagesModule,
    AppointmentsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCu4wKOQL_4AJCdVYbBGzEQBljGpGDK40w",
      libraries: ["places"]
    }),
  ],
  providers: [
    appRoutingProviders, UserService, UploadService, UserGuard, ImpoService, GeoLocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
