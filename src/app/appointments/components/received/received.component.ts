import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { User } from 'src/app/models/user';

@Component({
    selector: 'received',
    templateUrl: 'received.component.html',
    providers: [MessageService]
})

export class ReceivedComponent {
    public title: string;
    public message: Message;
    public identity;
    public user: User;
    public token;
    public url: string;
    public urlUser: string;
    public status: string;
    public follows;
    public messages: Message[];
    public next_page;
    public prev_page;
    public total;
    public page;
    public pages;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService,
        private _userService: UserService
    ) {
        this.title = 'Mensajes recibidos';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url + 'messageController/';
        this.urlUser = GLOBAL.url + 'controller/';
        this.user = new User(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '', '');
        this.message = new Message('', '', '', new Date(), this.user, null);
    }

    ngOnInit() {
        if (GLOBAL.verifyIdentity(this.identity)) {
          this._router.navigate(['/login']);
        } else {
          this.actualPage();
        }
      }

    getMessages(token, page) {
        this._messageService.getMyMessages(token, page).subscribe(
            response => {
                if (!response.item) {
                    this.status = 'error';
                } else {
                    this.messages = response.item;
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
                this.page=page;
            }
            //devolver listado de mensajes
            this.getMessages(this.token, this.page);
        });
    }
}