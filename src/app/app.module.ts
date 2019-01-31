import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';;


import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { UsuarioService } from './services/usuario.service';
import { UploadService } from './services/upload.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsuarioEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    MomentModule
  ],
  providers: [
    appRoutingProviders, UsuarioService, UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
