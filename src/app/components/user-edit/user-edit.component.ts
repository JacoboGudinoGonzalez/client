/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
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

	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild("search")
	public searchElementRef: ElementRef;

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
		private _uploadService: UploadService,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone
	) {
		this.title = 'Mis datos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity; 
		this.url = GLOBAL.url + "controller/";
	}

	ngOnInit() {
		if (GLOBAL.verifyIdentity(this.identity)) {
			this._router.navigate(['/login']);
		} else {
			this.initMaps();
		}
	}

	onSubmit() {
		this.user.coordinates=this.latitude+", "+this.longitude;
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
				}
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

	private setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.zoom = 16;
			});
		}
	}

	private initMaps() {
		//set google maps defaults
		this.zoom = 16;
		this.latitude = GLOBAL.splitAddress(this.user.coordinates,0);
		this.longitude = GLOBAL.splitAddress(this.user.coordinates,1);

		//create search FormControl
		this.searchControl = new FormControl();

		//set current position
		this.setCurrentPosition();

		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();
					this.user.address = place.formatted_address;
					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					//set latitude, longitude and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 16;
				});
			});
		});
	}
}