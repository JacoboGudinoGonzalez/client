import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public stats;
  public url;
  public urlPublication;
  public status;
  public message: string;
  public user: User;
  public publication: Publication;
  @Output() sended = new EventEmitter();

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url + "controller/";
    this.urlPublication = GLOBAL.url + "publicationController/"
    this.user = new User(this.identity == null ? 0 : this.identity.id, '', '', '', '', '', '', 0, '', '', '');
    this.publication = new Publication('', '', '', new Date(), this.user);
  }

  ngOnInit() {
    if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {

    }
  }

  onSubmit(form, $event) {
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          if (this.filesToUpload && this.filesToUpload.length) {
            //SubirImagen
            this._uploadService.makeFileRequest(this.urlPublication + 'upload/' + response.publication.id, [], this.filesToUpload, this.token, 'file')
              .then((result: any) => {
                this.publication.file = result.image;
                form.reset();
                this.status = 'success';
                this.sended.emit({ send: 'true' });
                this.sleepExample();
              });
          }else{
            form.reset();
            this.status = 'success';
            this.sended.emit({ send: 'true' });
            this.sleepExample();
          }
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

  public filesToUpload: Array<File>;
  fileEventChange(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
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
}
