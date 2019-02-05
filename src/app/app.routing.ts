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
// import { SelectCuidadorComponent } from './components/select-cuidador/select-cuidador.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

const appRoutes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'profile/:id', component: ProfileComponent},
	{path: 'login', component: LoginComponent},
	// {path: 'cliente', component: ClienteComponent},
	{path: 'siguiendo/:id/:page', component: FollowingComponent},
	{path: 'siguidores/:id/:page', component: FollowedComponent},
	// {path: 'contacto', component: ContactoComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'gente', component: UsersComponent},
	{path: 'gente/:page', component: UsersComponent},
	{path: 'timeline', component: TimelineComponent},
	// {path: 'selecciona-cuidador', component: SelectCuidadorComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
