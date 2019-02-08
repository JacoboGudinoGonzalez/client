import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public title: string;
	public user: User;
	public status: string;
	public identity: User;
	public token;

	constructor(
		private _router: Router,
		private _userService: UserService
	) {
		this.title = 'Login';
		this.user = new User('', '', '', '', '', '', '', 0, '', '');
	}

	ngOnInit() { }

	onSubmit() {
		this._userService.login(this.user).subscribe(
			response => {
				this.identity = response.user;
				if (!this.identity) {
					console.log("error el usuario no se ha logeado correctamente");
				} else {
					this.identity.password = '';

					localStorage.setItem('identity', JSON.stringify(this.identity));

					this._userService.login(this.user, 'true').subscribe(
						response => {
							this.token = response.token;
							if (this.token.length <= 0) {
								console.log("el token no se ha generado");
							} else {
								localStorage.setItem('token', this.token);
								this.getCounters();
							}
							this.user = new User('', '', '', '', '', '', '', 0, '', '');
						},
						error => {
							var errorMessage = <any>error;
							if (errorMessage != null) {
								this.status = 'error';
								if (GLOBAL.unauthorized(errorMessage, this.token)) {
									this._router.navigate(['/login']);
								} else {
									console.log(errorMessage);
								}
							}
						}
					);
				}
				this.user = new User('', '', '', '', '', '', '', 0, '', '');
			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)) {
						this._router.navigate(['/login']);
					} else {
						console.log(errorMessage);
					}
				}
			}
		);
	}

	getCounters() {
		this._userService.getCounters().subscribe(
			response => {
				localStorage.setItem('stats', JSON.stringify(response));
				this.status = 'success';
				this._router.navigate(['/']);
			},
			error => {
				var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)) {
						this._router.navigate(['/login']);
					} else {
						console.log(errorMessage);
					}
				}
			}
		)
	}
}