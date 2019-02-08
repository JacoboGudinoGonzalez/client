import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
	public title: string;
	public user: User;
	public status: string; 

	constructor(
		private _userService: UserService
	){
		this.title = 'Registro';
		this.user = new User('','','','','','','',0,'', '');
	}

	ngOnInit(){
		console.log("register.component cargado");
	}

	onSubmit(){
		this._userService.register(this.user).subscribe(
			response => {

				if(response.user.id==0){
					console.log(response.user.name);
					this.status = 'success';
				}else{
					this.status = 'error';
				}
				this.user = new User('','','','','','','',0,'', '');
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
}