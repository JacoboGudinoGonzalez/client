import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AppointmentService } from '../../../services/appointment.service';
import { GLOBAL } from '../../../services/global';
import { Appointment } from '../../../models/appointment';
import { User } from 'src/app/models/user';
import { Pet } from 'src/app/models/pet';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  providers: [UserService, AppointmentService]

})
export class AddComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public url: string;
  public urlApp: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public appointment: Appointment
  public appointments: Appointment[];
  public message: string;
  public user: User;
  public pet: Pet;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _appointmentService: AppointmentService
  ) {
    this.title = 'Crear nueva cita con ';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url + "controller/";
    this.urlApp = GLOBAL.url + "appointmentController/";
    this.page = 1;
    this.pet = new Pet('',this.identity,0,'',0,0,0);
    this.appointment = new Appointment('', 0, new Date, new Date, this.identity, this.user, this.pet);
  }

  ngOnInit() {
    /*if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {
      this.getAppointments(this.user, this.page);
    }*/
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response[0].user) {
          this.user = response[0].user;
        } else {
          this.status = 'error';
        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
          if (GLOBAL.unauthorized(errorMessage, this.token)) {
            this._router.navigate(['profile/', this.identity.id]);
          } else {
            console.log(errorMessage);
          }
        }
      }
    );
  }

  onSubmit(form) {
    this.appointment.toUser=this.user;
    this._appointmentService.addAppointment(this.token, this.appointment).subscribe(
      response => {
        if (response) {
            form.reset();
            this.status = 'success';
        } else {
          this.status = 'error';
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

  getAppointments(page, adding = false) {
    this._appointmentService.getMyAppointments(this.token, page).subscribe(
      response => {
        if (response.item) {
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if (!adding) {
            this.appointments = response.item;
          } else {
            var arrayA = this.appointments;
            var arrayB = response.item;
            this.appointments = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('html').prop("scrollHeight") }, 500);
          }

          if (page > this.pages) {
            this._router.navigate(['/home']);
          }

          if (this.total < this.itemsPerPage || this.page == this.pages) {
            this.noMore = true;
          }

        } else {
          if (response.msj == 0) {
            this.message = 'No estas siguiendo a ningun usuario :(';
          }
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

  public noMore = false;
  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getAppointments(this.page, true);
  }
}
