import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'users',
    templateUrl: './users.component.html',
    providers: [UsuarioService]
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
    public url;
    
    constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService
	){
        this.title = 'Usuarios';
		this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.url = GLOBAL.url+"controller/";
    }
    
    ngOnInit() {
        console.log("componentn users cargao");
        this.actualPage();
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
                    console.log(response);
                    this.total = response.total;
                    this.users = response.item;
                    this.pages = response.pages;
                    if(page>this.pages){
                        this._router.navigate(['/gente',1]);
                    }
                }
            },
            error=>{
                var errorMessage = <any>error;
                //console.log(errorMessage);

                if(errorMessage!=null){
                    this.status = 'error';
                    this._router.navigate(['/gente',1]);
                }
            }
        );
    }
}