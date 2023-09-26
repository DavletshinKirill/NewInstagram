import { RenderUser } from './../../../model/render_user';
import { Comments } from './../../../model/comment';
import { Post } from './../../../model/post';
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { PostService } from 'src/app/services/post.service';
import { StompService } from 'src/app/services/stomp.service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StompSubscription } from '@stomp/stompjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  datasource: Comments[] = [];
  totalItems: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;
  result: Comments;
  comment: string;
  helperComment: Comments;
  unsubscribe: any;


  constructor(public dialogRef: MatDialogRef<CommentsComponent>,
    private stompService: StompService,
    @Inject(MAT_DIALOG_DATA) public data: {post: Post, user: RenderUser}, public dialog: MatDialog, private postService: PostService,
    private cdr: ChangeDetectorRef) {
     }

     ngOnInit() {
      console.log(this.data);
      this.loadComments();
      this.stompService.connect();
    }


  addNewComment() {
      if(this.unsubscribe != null) {
        this.stompService.unsubscribe(this.unsubscribe);
        console.log('unsubscribe');
      }
      this.unsubscribe = this.stompService.subscribe('/topic/comments', (request: any) => {

        this.helperComment = JSON.parse(request.body);
        // Check if datasource already contains comments
        if (this.datasource.length > 0) {
          // If yes, add new comment
          this.datasource.push(this.helperComment);
        } else {
          // If no, set datasource to contain only the new comment
          this.datasource = [this.helperComment];
        }
      });
        if(this.comment != '') {
          this.result = new Comments();
          this.result.comment = this.comment;
          this.stompService.send(`/app/comments/${this.data.user.id}/${this.data.post.id}`, this.result);
        }
        this.comment = '';
        console.log(this.datasource);

    }

    changeComment(comment: Comments) {
      console.log("update comment" + comment.id);
      const dialogChangePost= this.dialog.open(AddCommentComponent, {
        width: '400px',
        data: comment
      });

      dialogChangePost.afterClosed().subscribe((result: Comments) => {
        if(result != null) {
          result.id = comment.id;
          this.postService.updateComment(this.data.post.id, result).subscribe(data=>this.postService.getComments(this.data.post.id, this.currentPage, this.pageSize)
          .subscribe(result => this.datasource = result.content));
        }
      });
    }

    deleteComment(comment: Comments) {
      console.log("delete comment " + comment.id);
      if(this.unsubscribe != null) {
        this.stompService.unsubscribe(this.unsubscribe);
        console.log('unsubscribe');
      }
      this.stompService.send(`/app/comments/delete/${comment.id}`, comment);
      this.unsubscribe = this.stompService.subscribe('/topic/comments/delete', (request: any) => {

        this.datasource.splice(this.datasource.indexOf(comment), 1);
      });
    }

    loadComments() {
      this.postService.getComments(this.data.post.id, this.currentPage, this.pageSize).subscribe(
        data => {
          this.datasource = data.content;
          this.totalItems = data.totalElements;
          console.log(this.datasource);
          console.log("totalItems "+this.totalItems);
        });
    }

    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      console.log(this.currentPage);

      this.loadComments();
    }

    onClear() {
      this.comment = '';
    }
    checkComment(comment: Comments) {
      
    }
}
