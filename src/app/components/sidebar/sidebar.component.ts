import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsuarioService]
})
export class SidebarComponent implements OnInit {

  public title: string;
	public identity;
  public token; 
  public stats; 
  public url;
  public status; 

  constructor(
    private _userService: UsuarioService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("componente cargado..");
  }

}
