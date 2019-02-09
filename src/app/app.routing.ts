import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
// import { ClienteComponent } from './components/cliente/cliente.component';
// import { CuidadorComponent } from './components/cuidador/cuidador.component';
// import { ContactoComponent } from './components/contacto/contacto.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import { UserGuard } from './services/user.guard';

const appRoutes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'profile/:id', component: ProfileComponent, canActivate:[UserGuard]},
	{path: 'login', component: LoginComponent},
	// {path: 'cliente', component: ClienteComponent},
	{path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
	{path: 'siguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
	{path: 'citas', component: AppointmentsComponent},
	{path: 'citas/:id', component: AppointmentsComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UserEditComponent, canActivate:[UserGuard]},
	{path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
	{path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
	{path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
	// {path: 'selecciona-cuidador', component: SelectCuidadorComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
