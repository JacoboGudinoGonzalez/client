import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { User } from 'src/app/models/user';

@Component({
    selector: 'add',
    templateUrl: 'add.component.html',
    providers: [FollowService, MessageService]
})

export class AddComponent {
    public title: string;
    public message: Message;
    public msj:string;
    public identity;
    public user: User;
    public token;
    public url: string;
    public status: string;
    public follows;

    constructor(
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ) {
        this.title = 'Enviar mensaje';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url + 'messageController/';
        this.user = new User(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '');
        this.message = new Message('', '', '', new Date(), this.user, null);
    }

    ngOnInit() {
        if (GLOBAL.verifyIdentity(this.identity)) {
            this._router.navigate(['/login']);
        } else {
            this.getMyFollows();
        }
    }

    onSubmit(form) {
        this.message.receiver = new User(String(this.message.receiver), '', '', '', '', '', '', 0, '');
        this._messageService.addMessage(this.token, this.message).subscribe(
            response => {
                if(response.message){
                    this.status="success";
                    form.reset();
                }
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

    getMyFollows() {
        this._followService.getMyFollows(this.token).subscribe(
            response => {
                if(response.msj=='0'){
                    this.msj='No sigues a ningun usuario :C';
                }else{
                    this.follows=response;
                }
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