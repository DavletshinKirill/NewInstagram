import { SafeUrl } from '@angular/platform-browser';
import { Post } from './../../model/post';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BaseServiceService } from 'src/app/services/base-service.service';
import { PostAddComponent } from '../editors/post-add/post-add.component';
import { PostService } from 'src/app/services/post.service';
import { RenderUser } from 'src/app/model/render_user';
import { CommentsComponent } from '../editors/comments/comments.component';
import { StompService } from 'src/app/services/stomp.service.service';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { ChangeUserPhotoComponent } from '../editors/change-user-photo/change-user-photo.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  dataSource!: RenderUser;
  router: any;
  href!: string;
  visibility!: boolean;
  image!: SafeUrl;
  currentUser: RenderUser;

  constructor(private baseService: BaseServiceService,
    private stompService: StompService,
    private postService: PostService,
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer) {
    this.dataSource = new RenderUser();

    //this.setDataSource();
  }

  ngOnInit(): void {
    console.log("User Component");
    this.baseService.getUser(this.activateRoute.snapshot.params['id']).subscribe(data => this.dataSource = data);
    this.baseService.redirectUser().subscribe(data => { this.checkVisible(data);
                                                        this.baseService.getUser(data).subscribe(data => this.currentUser = data)
                                                      });
    // console.log('connecting to chat...');
    // this.socket = new SockJS(this.url + '/chat');
    // this.stompClient = Stomp.over(this.socket);

    // this.stompClient.connect({}, (frame) => {
    //   //func = what to do when connection is established
    //   console.log('connected to: ' + frame);
    //   this.stompClient!.subscribe(
    //     '/topic/messages/' + this.channelName,
    //     (response) => {
    //       //func = what to do when client receives data (messages)
    //       this.loadChat();
    //     }
    //   );
  }

  logout() {
    this.authService.logout();

  }

  addNewPost() {
    const dialogAddNewPost = this.dialog.open(PostAddComponent, {
      width: '400px',
      data: null
    });
    dialogAddNewPost.afterClosed().subscribe((result: Post) => {
      if(result != null) {
        console.log("adding new post: " + result.title);
        console.log("file name " + result.photo);
        this.postService.addNewPost(result, this.activateRoute.snapshot.params['id']).subscribe(data => this.baseService.getUser(this.activateRoute.snapshot.params['id']).subscribe(data => this.dataSource = data));
      }
    });
}



  card_click(element: Post) {
    console.log("Clicked " + element.id);

    const dialogAddingNewStudent = this.dialog.open(CommentsComponent, {
      width: '1000px',
      height: '700px',
      data: { post: element,
              user: this.currentUser
            }
});
  }

  checkVisible(id: number) {
    if (id == this.activateRoute.snapshot.params['id']) {
      this.visibility = false;
    }
    else this.visibility = true;
  }

  // private setDataSource() {

  //   this.baseService.getUser(Number(this.activateRoute.snapshot.params['id'])).subscribe
  //   ((data: RenderUser) => {
  //   // data.comments = this.SortArrayComment(data.comments);
  //   this.dataSource = data;
  //   });


  //  this.stompService.subscribe('/topic/vehicle', (): void => {
  //   //сюда передаем функцию для обновления контента на странице
  //   // this.refreshVehicleTable(this.page, this.size); - ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ DATASOURCE

  //   this.baseService.getUser(Number(this.activateRoute.snapshot.params['id'])).subscribe
  //   ((data: RenderUser) => {
  //  //data.comments = this.SortArrayComment(data.comments);
  //   this.dataSource = data;
  //   });
  //   });
  // }

  changePost(post: Post) {
    console.log("update post" + post.id);
    const dialogChangePost= this.dialog.open(PostAddComponent, {
      width: '400px',
      data: post
    });

    dialogChangePost.afterClosed().subscribe((result: Post) => {
      if(result != null) {
        result.id = post.id;
        this.postService.updatePost(result).subscribe(data => this.baseService.getUser(this.activateRoute.snapshot.params['id']).subscribe(data => this.dataSource = data));
      }
    });


  }

  deletePost(post: Post) {
    console.log("delete post" + post.id);
    this.postService.deletePost(post.id).subscribe(data => this.baseService.getUser(this.activateRoute.snapshot.params['id']).subscribe(data => this.dataSource = data));
  }

  userPhotoClicked() {
    const dialogUpdatePhoto = this.dialog.open(ChangeUserPhotoComponent, {
      width: '400px',
      data: null
    });
    dialogUpdatePhoto.afterClosed().subscribe((result: RenderUser) => {
      if(result != null) {
        result.id = this.activateRoute.snapshot.params['id'];
        this.postService.updateUserPhoto(result).subscribe(data => this.baseService.getUser(this.activateRoute.snapshot.params['id']).subscribe(data => this.dataSource = data));
      }
    });
  }

  checkPosts() {
    if (this.dataSource.posts.length == 0) return true;
    else return false;
  }

}



