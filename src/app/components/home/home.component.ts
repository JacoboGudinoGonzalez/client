import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';


@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	public title: string;
	public usuario: Usuario;
	public identity;
	public token;
	public userArray;
	public status:string;

	constructor(
		private _usuarioService: UsuarioService,
		private _router: Router
	) {
		this.title = 'HOME';
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.usuario = this.identity;
	}

	ngOnInit() {
		if(GLOBAL.verifyIdentity(this.identity)){
            this._router.navigate(['/login']);
        }else{
            
        }
	}

	getUsers() {
		this._usuarioService.getUsers(this.usuario).subscribe(
			response => {
				this.userArray = response.users;
			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)){
						this._router.navigate(['/login']);
					}else{
						console.log(errorMessage);
					}
				}
			}
		);
	}

	starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
	rating: number;
	//Create a function which receives the value counting of stars click, 
	//and according to that value we do change the value of that star in list.
	setStar(data: any) {
		this.rating = data + 1;
		for (var i = 0; i <= 4; i++) {
			if (i <= data) {
				this.starList[i] = false;
			}
			else {
				this.starList[i] = true;
			}
		}
	}

	BlockID(data: any) {
		var list = [true, true, true, true, true];
		this.rating = data + 1;
		for (var i = 0; i <= 4; i++) {
			if (i <= data) {
				list[i] = false;
			}
			else {
				list[i] = true;
			}
		}
		return list;
	}

}