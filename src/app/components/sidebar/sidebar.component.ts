import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  public message: string;
  public usuario: Usuario;
  public publication: Publication;

  constructor(
    private _router: Router,
    private _userService: UsuarioService,
    private _publicationService: PublicationService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url + "controller/";
    this.usuario = new Usuario(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '');
    this.publication = new Publication('', '', '', new Date(), this.usuario);
  }

  ngOnInit() {
    if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {

    }
  }

  onSubmit(form) {
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          form.reset();
          this.status = 'success';
          this.sleepExample();
        } else {
          this.status = 'error';
          this.sleepExample();
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

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async sleepExample() {
    await this.delay(1500);
    this.status = '';
    await this.delay(500);
    this._router.navigate(['/timeline']);
  }

  @Output() sended = new EventEmitter();
  sendPublication(event){
    this.sended.emit({send:'true'});
  }
}
