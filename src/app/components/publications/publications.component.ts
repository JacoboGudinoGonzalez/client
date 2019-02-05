import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';

@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  providers: [UserService, PublicationService]

})
export class PublicationsComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public url: string;
  public urlUser: string;
  public status: string;
  public page;
  public total;
  public pages;
  public itemsPerPage;
  public publications: Publication[];
  public message:string;
  @Input() user:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.title = 'Publications';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url + "publicationController/";
    this.urlUser = GLOBAL.url + "controller/";
    this.page = 1;
  }

  ngOnInit() {
    if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {
      this.getPublications(this.user, this.page);
    }
  }

  getPublications(user, page, adding=false) {
    this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
      response => {
        if (response.item) {
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;
          if(!adding){
            this.publications = response.item;
          }else{
            var arrayA = this.publications;
            var arrayB = response.item;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({ scrollTop: $('html').prop("scrollHeight")},500);
          }

          if (page > this.pages) {
            this._router.navigate(['/home']);
          }

          if(this.total<this.itemsPerPage || this.page == this.pages){
            this.noMore=true;
          }

        } else {
          if(response.msj==0){
            this.message = 'No estas siguiendo a ningun usuario :(';
          }
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

  public noMore = false;
  viewMore(){
    this.page+=1;
    if(this.page==this.pages){
      this.noMore = true;
    }
    this.getPublications(this.user, this.page, true);
  }
}
