import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { Follow } from '../../models/follow';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  providers: [UsuarioService, FollowService]
})

export class ProfileComponent implements OnInit {

  public title: string;
  public user:Usuario;
  public status:string;
  public url: string;
  public identity;
  public token;
  public stats;
  public follow:Follow;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UsuarioService,
    private _followService: FollowService
  ) {
    this.title = 'Perfil';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url + "controller/";
  }

  ngOnInit() {
    if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {
      this.loadPage();
    }
  }

  loadPage(){
    this._route.params.subscribe(params =>{
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id){
    this._userService.getUser(id).subscribe(
      response=>{
        if(response[0].user && response[1].follow){
          this.user=response[0].user;
          this.follow=response[1].follow;
        }else{
          this.status='error';
        }
      },
      error=>{
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
          if (GLOBAL.unauthorized(errorMessage, this.token)) {
            this._router.navigate(['profile/',this.identity.id]);
          } else {
            console.log(errorMessage);
          }
        }
      }
    );
  }

  getCounters(id){
    this._userService.getCounters(id).subscribe(
      response=>{
        console.log(response);
        this.stats=response;
      },
      error=>{
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
          if (GLOBAL.unauthorized(errorMessage, this.token)) {
            this._router.navigate(['login/',this.identity.id]);
          } else {
            console.log(errorMessage);
          }
        }
      }
    );
  }

}
