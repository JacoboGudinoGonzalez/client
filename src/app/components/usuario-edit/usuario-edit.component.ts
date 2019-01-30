import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'usuario-edit',
	templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent implements OnInit {
	public title: string;
	public usuario: Usuario;
	public identity;
	public token;
	public status: string;
	public url: string;
	public msj: string;

	constructor(
		private _usuarioService: UsuarioService,
		private _uploadService: UploadService
	) {
		this.title = 'Mis datos';
		this.identity = this._usuarioService.getIdentity();
		this.token = this._usuarioService.getToken();
		this.usuario = this.identity;
		this.url = GLOBAL.url+"controller/";
	}

	ngOnInit() {
		console.log(this.identity);
	}

	onSubmit() {
		this._usuarioService.updateUsuario(this.usuario).subscribe(
			response => {

				if (!response.user) {
					this.status = 'error';
				} else {
					//this.usuario = response.user;
					this.status = 'success';
					localStorage.setItem('identity', JSON.stringify(this.usuario));

					//Subir img
					this._uploadService.makeFileRequest(this.url + 'upload/' + this.usuario.id, [], this.filesToUpload, this.token, 'file').
						then((result: any) => {
							this.usuario.image = result.user.image;
							localStorage.setItem('identity', JSON.stringify(this.usuario));
						});
					this.onActivate();
				}
			},
			error => {
				this.msj = error.error.msj;
				this.status = 'error';
				this.onActivate();
			}
		);
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	onActivate() {
		let scrollToTop = window.setInterval(() => {
			let pos = window.pageYOffset;
			if (pos > 0) {
				window.scrollTo(1000, pos - 20); // how far to scroll on each step
			} else {
				window.clearInterval(scrollToTop);
			}
		}, 16);
	}
}