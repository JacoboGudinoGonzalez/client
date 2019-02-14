import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AppointmentService{
    public url:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = GLOBAL.url+"appointmentController/"; 
    }

    addAppointment(token, appointment):Observable<any>{
        let params = JSON.stringify(appointment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.post(this.url+'addAppointment', params, {headers:headers})
    }

    getEmmitAppointments(token, page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.get(this.url+'myAppointments/'+page, {headers:headers})
    }

    getMyAppointments(token, page=1):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        return this._http.get(this.url+'appointments/'+page, {headers:headers})
    }

    deleteAppointment(token, id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',token);
        return this._http.delete(this.url+'appointment/'+id, {headers:headers});
    }

    changeAppointmentStatus(token, id, status):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                       .set('Authorization',token); 
        return this._http.put(this.url+'appointment/'+id+'/'+status, null, {headers:headers})
    }
}