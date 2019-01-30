import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsuarioService, PublicationService]
})
export class SidebarComponent implements OnInit {

  public title: string;
	public identity;
  public token; 
  public stats; 
  public url;
  public status; 
  public usuario: Usuario;
  public publication: Publication;

  constructor(
    private _userService: UsuarioService,
    private _publicationService: PublicationService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url+"controller/";
    this.usuario = new Usuario(this.identity.id,'','','','','','',0,'');
    this.publication = new Publication('','','',new Date(),this.usuario);
  }

  ngOnInit() {
    
  }

  onSubmit(form){
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response=>{
        if(response.publication){
          form.reset();
          this.status = 'success';
        }else{
          this.status='error';
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage!=null){
            this.status='error';
        }
      }
    );
  }
}
