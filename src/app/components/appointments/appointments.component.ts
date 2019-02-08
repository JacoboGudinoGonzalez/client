import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AppointmentService } from '../../services/appointment.service';
import { GLOBAL } from '../../services/global';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'appointments',
  templateUrl: './appointments.component.html',
  providers: [UserService, AppointmentService]

})
export class AppointmentsComponent implements OnInit {

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
  @Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _appointmentService: AppointmentService
  ) {
    this.title = 'Appointment';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url + "controller/";
    this.urlApp= GLOBAL.url + "appointmentController/";
    this.page = 1;
    this.appointment = new Appointment('',0,new Date, new Date,null,null);
  }

  ngOnInit() {
    /*if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {
      this.getAppointments(this.user, this.page);
    }*/
  }

  onSubmit(form) {
    console.log(this.appointment)
    /*this._appointmentService.addAppointment(this.token, this.appointment).subscribe(
      response => {
        if (response.publication) {
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
    );*/
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
