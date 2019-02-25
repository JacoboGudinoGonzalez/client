/// <reference types="@types/googlemaps" />
import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GeoLocationService } from '../../services/geo-location.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

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
	public userArray;
	public status: string;

	constructor(
		private _userService: UserService,
		private _geoLocationService: GeoLocationService,
		private _router: Router,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone
	) {
		this.title = 'Bienvenido!';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.coordinates = null;
	}

	ngOnInit() {
		if (GLOBAL.verifyIdentity(this.identity)) {
			this._router.navigate(['/login']);
		} else {
			this.initMaps();
			//set current position
			this.setCurrentPosition();
			console.log(this.coordinates);
		}
	}

	getUsers() {
		this._userService.getUsers(this.user).subscribe(
			response => {
				this.userArray = response.users;
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

	coordinates;
	private setCurrentPosition() {
		this._geoLocationService.getPosition().subscribe(
			(pos: Position) => {
				this.coordinates = {
					latitude: +(pos.coords.latitude),
					longitude: +(pos.coords.longitude)
				};
			});
	}

	private initMaps() {
		//set google maps defaults
		this.zoom = 14;

		//create search FormControl
		this.searchControl = new FormControl();
		//load Places Autocomplete
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				types: ["address"]
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					//set latitude, longitude and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 12;
				});
			});
		});
	}

}