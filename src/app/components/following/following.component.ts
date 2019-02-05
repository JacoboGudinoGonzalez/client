import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'following',
  templateUrl: './following.component.html',
  providers: [UserService, FollowService]
})

export class FollowingComponent implements OnInit {
  public title: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public users: User[];
  public status: string;
  public follows;
  public following;
  public url;
  public userPageId;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Usuarios seguidos por ';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url + "controller/";
  }

  ngOnInit() {
    if (GLOBAL.verifyIdentity(this.identity)) {
      this._router.navigate(['/login']);
    } else {
      this.actualPage();
    }
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let user_id = params['id'];
      this.userPageId = user_id;
      let page = +params['page'];
      this.page = page;
      if (!params['page']) {
        page = 1;
      }
      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;
        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }
      //devolver listado de usuarios
      this.getUser(user_id, page);
    });
  }

  getFollows(user_id, page) {
    this._followService.getFollowing(this.token, user_id, page).subscribe(
      response => {
        if (!response.item) {
          this.status = 'error';
        } else {
          console.log(response)
          this.following = response.item;
          this.total = response.total;
          this.pages = response.pages;
          this.follows = response.following;
          if (page > this.pages) {
            this._router.navigate(['/gente', 1]);
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

  public user: User;
  getUser(user_id, page) {
    this._userService.getUser(user_id).subscribe(
      response => {
        if (response[0].user) {
          this.user = response[0].user;
          this.getFollows(user_id, page);
        } else {
          this._router.navigate(['/home']);
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

  public followUserOver;
  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave() {
    this.followUserOver = 0;
  }

  followUser(followedId) {
    var follow = new Follow('',
      new User(this.identity.id, '', '', '', '', '', '', 0, ''),
      new User(followedId, '', '', '', '', '', '', 0, '')
    );

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followedId);
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

  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        if (!response.msj) {
          this.status = 'error';
        } else {
          this.status = 'success';
          var search = this.follows.indexOf(followed);
          if (search != -1) {
            this.follows.splice(search, 1);
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
}