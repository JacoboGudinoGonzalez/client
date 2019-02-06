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

export class AddComponent{
    public title:string;
    public message: Message;
    public identity;
    public user: User;
    public token;
    public url: string;
    public status: string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Enviar mensaje';
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.url = GLOBAL.url+'messageController/';
        this.user = new User(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '');
        this.message = new Message('', '', '', new Date, this.user, null);
    }

    ngOnInit(){
        console.log("componente add cargado");
    }
}