import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable()
export class UserService{
	public url: string;
	public identity; 
	public token;
	public stats;

	constructor(private _http: HttpClient){
		this.url = GLOBAL.url+"controller/";
	}

	register(userToRegister: User):Observable<any>{
		let params = JSON.stringify(userToRegister);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+"registerUser", params, {headers: headers});
	}

	login(userToLogin: any, getToken = null):Observable<any>{
		if(getToken != null){
			userToLogin.getToken = getToken;
		}
		let params = JSON.stringify(userToLogin);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url+"loginUser", params, {headers: headers});
	}

	updateUser(userToUpdate: User):Observable<any>{
		let params = JSON.stringify(userToUpdate);
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken()); 

		return this._http.put(this.url+"updateUser", params, {headers: headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}

	getUsers(page = null):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.get(this.url+"users/"+this.identity.type+"/"+page, {headers: headers});
	}

	getUsersLocation(page = null, latitude, longitude):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.get(this.url+"users/"+this.identity.type+"/"+page+"/"+latitude+"/"+longitude, {headers: headers});
	}

	getUser(id: string):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		return this._http.get(this.url+"user/"+id, {headers: headers});
	}

	getStats(){
		let stats = JSON.parse(localStorage.getItem('stats'));

		if(stats!=undefined){
			this.stats = stats;
		}else{
			this.stats=null;
		}
		return this.stats;
	}

	getCounters(userId=null):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
									   .set('Authorization',this.getToken());
		if(userId!=null){
			return this._http.get(this.url+'counters/'+userId, {headers:headers});
		} else{
			return this._http.get(this.url+'counters/'+this.identity.id, {headers:headers});
		}
	}
}