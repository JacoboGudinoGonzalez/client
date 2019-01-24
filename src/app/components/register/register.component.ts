import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html'
	//styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
	public title: string;
	public usuario: Usuario;
	public status: string; 

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
	){
		this.title = 'Registro';
		this.usuario = new Usuario('','','','','','','',0,'');
	}

	ngOnInit(){
		console.log("register.component cargado");
	}

	onSubmit(){
		this._usuarioService.register(this.usuario).subscribe(
			response => {

				if(response.user.id==0){
					console.log(response.user.name);
					this.status = 'success';
				}else{
					this.status = 'error';
				}
				this.usuario = new Usuario('','','','','','','',0,'');
			},
			error =>{
				console.log(<any>error);
			}
		);
		console.log(this.usuario );
	}
}