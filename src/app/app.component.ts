import { Component, DoCheck, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UsuarioService]
})
export class AppComponent implements DoCheck, OnInit {
  public title: string;
  public identity;
  public url: string;

  constructor(
      private _usuarioService: UsuarioService,
      private _router: Router
    ){
    this.title= 'PET';
    this.url = 'http://localhost:8081/petProject/rest/controller/';
  }

  ngOnInit(){
  	this.identity = this._usuarioService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
