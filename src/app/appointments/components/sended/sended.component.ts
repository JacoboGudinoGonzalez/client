import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { User } from 'src/app/models/user';

@Component({
    selector: 'sended',
    templateUrl: 'sended.component.html',
    providers: [AppointmentService, FollowService]
})

export class SendedComponent {
    public title: string;
    public msj: string;
    public appointment: Appointment;
    public identity;
    public user: User;
    public token;
    public url: string;
    public urlUser: string;
    public status: string;
    public follows;
    public followsId: Array<number>;
    public appointments: Appointment[];
    public next_page;
    public prev_page;
    public total;
    public page;
    public pages;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _appointmenService: AppointmentService,
        private _followService: FollowService,
        private _userService: UserService
    ) {
        this.title = 'Citas enviadas';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.urlUser = GLOBAL.url + 'controller/';
        this.user = new User(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '', '');
        this.appointment = new Appointment('', 0, new Date(), new Date(), null, null, null);
    }

    ngOnInit() {
        if (GLOBAL.verifyIdentity(this.identity)) {
            this._router.navigate(['/login']);
        } else {
            this.actualPage();
        }
    }

    getAppointments(token, page) {
        this._appointmenService.getEmmitAppointments(token, page).subscribe(
            response => {
                if (!response.item) {
                    this.status = 'error';
                } else {
                    this.appointments = response.item;
                    this.total = response.total;
                    this.pages = response.pages;
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

    actualPage() {
        this._route.params.subscribe(params => {

            let page = +params['page'];
            this.page = page;
            if (!params['page']) {
                page = 1;
            }
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;
                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
                this.page = page;
            }
            //devolver listado de mensajes
            this.getAppointments(this.token, this.page);
            this.getMyFollows();
        });
    }

    getMyFollows() {
        this._followService.getMyFollows(this.token).subscribe(
            response => {
                if (response.msj == '0') {
                    this.msj = 'No sigues a ningun usuario :C';
                } else {
                    this.follows = response.map(f => f.followed.id);
                }
                console.log(this.follows);
            },
            error => {
                console.log(error);
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
}