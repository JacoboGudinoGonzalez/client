import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  providers: [UsuarioService, PublicationService]

})
export class TimelineComponent implements OnInit {

  public title: string;
	public identity;
  public token; 
  public url:string;
  public status:string;
  public page;
  public total;
  public pages;
  public publications:Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UsuarioService,
    private _publicationService: PublicationService
  ) { 
    this.title='Timeline';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.url = GLOBAL.url+"publicationController/";
    this.page=1;
  }

  ngOnInit() {
    console.log("Componente cargado");
    this.getPublications(this.page);
  }

  getPublications(page){
    this._publicationService.getPublications(this.token, page).subscribe(
      response=>{
        if(response.item){
          this.total=response.total;
          this.pages=response.pages;
          this.publications=response.item;

          if(page>this.pages){
            this._router.navigate(['/home']);
          }

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
