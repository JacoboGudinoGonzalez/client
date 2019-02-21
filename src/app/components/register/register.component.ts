/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild("search")
	public searchElementRef: ElementRef;

	public title: string;
	public user: User;
	public status: string;

	constructor(
		private _userService: UserService,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone
	) {
		this.title = 'Registro';
		this.user = new User('', '', '', '', '', '', '', 0, '', '', '');
	}

	ngOnInit() {
		this.initMaps();
	}

	onSubmit() {
		this.user.coordinates = this.latitude + ", " + this.longitude;
		this._userService.register(this.user).subscribe(
			response => {

				if (response.user) {
					console.log(response.user.name);
					this.status = 'success';
				} else {
					this.status = 'error';
				}
				this.user = new User('', '', '', '', '', '', '', 0, '', '', '');
			},
			error => {
				console.log(<any>error);
			}
		);
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
		this.latitude = 0;
		this.longitude = 0;

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
