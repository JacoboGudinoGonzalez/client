import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'user-edit',
	templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
	public title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;
	public msj: string;

	constructor(
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService
	) {
		this.title = 'Mis datos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = GLOBAL.url + "controller/";
	}

	ngOnInit() {
		if(GLOBAL.verifyIdentity(this.identity)){
            this._router.navigate(['/login']);
        }else{

        }
	}

	onSubmit(form) {
		this._userService.updateUser(this.user).subscribe(
			response => {

				if (!response.user) {
					this.status = 'error';
				} else {
					//this.usuario = response.user;
					this.status = 'success';
					localStorage.setItem('identity', JSON.stringify(this.user));

					//Subir img
					this._uploadService.makeFileRequest(this.url + 'upload/' + this.user.id, [], this.filesToUpload, this.token, 'file').
						then((result: any) => {
							this.user.image = result.user.image;
							localStorage.setItem('identity', JSON.stringify(this.user));
						});
					this.onActivate();
					form.reset();
				}
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