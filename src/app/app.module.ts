import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { UsuarioService } from './services/usuario.service';
import { UploadService } from './services/upload.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsuarioEditComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders, UsuarioService, UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
