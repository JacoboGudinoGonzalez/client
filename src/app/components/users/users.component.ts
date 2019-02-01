import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Follow } from '../../models/follow';
import { UsuarioService } from '../../services/usuario.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'users',
    templateUrl: './users.component.html',
    providers: [UsuarioService, FollowService]
	//styleUrls: ['./register.component.css']
})

export class UsersComponent implements OnInit{
    public title: string;
	public identity;
    public token; 
    public page;
    public next_page;
    public prev_page;
    public total;
    public pages;
    public users: Usuario[];
    public status: string;
    public follows
    public url;
    
    constructor(
		private _route: ActivatedRoute,
		private _router: Router,
        private _usuarioService: UsuarioService,
        private _followService: FollowService
	){
        this.title = 'Usuarios';
		this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.url = GLOBAL.url+"controller/";
    }
    
    ngOnInit() {
        if(GLOBAL.verifyIdentity(this.identity)){
            this._router.navigate(['/login']);
        }else{
            this.actualPage();
        }
    }
    
    actualPage(){
        this._route.params.subscribe(params =>{
            let page = +params['page'];
            this.page = page;
            if(!params['page']){
                page=1;
            }
            if(!page){
                page=1;
            }else{
                this.next_page = page+1;
                this.prev_page = page-1;
                if(this.prev_page<=0){
                    this.prev_page=1;
                }
            }
            //devolver listado de usuarios
            this.getUsers(page);
        });
    }

    getUsers(page){
        this._usuarioService.getUsers(page).subscribe(
            response =>{
                if(!response.item){
                    this.status = 'error';
                }else{
                    this.total = response.total;
                    this.users = response.item;
                    this.pages = response.pages;
                    this.follows = response.following;
                    if(page>this.pages){
                        this._router.navigate(['/gente',1]);
                    }
                }
            },
            error=>{
                var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)){
						this._router.navigate(['/login']);
					}else{
						console.log(errorMessage);
					}
				}
            }
        );
    }

    public followUserOver;
    mouseEnter(user_id){
        this.followUserOver = user_id;
    }

    mouseLeave(){
        this.followUserOver = 0;
    }

    followUser(followedId){
        var follow = new Follow('',
            new Usuario(this.identity.id,'','','','','','',0,''),
            new Usuario(followedId,'','','','','','',0,'')
        );

        this._followService.addFollow(this.token, follow).subscribe(
            response =>{
                if(!response.follow){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    this.follows.push(followedId);
                }
            },
            error =>{
                var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)){
						this._router.navigate(['/login']);
					}else{
						console.log(errorMessage);
					}
				}
            }
        );
    }

    unfollowUser(followed){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response =>{
                if(!response.msj){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    var search = this.follows.indexOf(followed);
                    if(search!=-1){
                        this.follows.splice(search,1);
                    }
                }
            },
            error =>{
                var errorMessage = <any>error;
				if (errorMessage != null) {
					this.status = 'error';
					if (GLOBAL.unauthorized(errorMessage, this.token)){
						this._router.navigate(['/login']);
					}else{
						console.log(errorMessage);
					}
				}
            }
        );
    }
}