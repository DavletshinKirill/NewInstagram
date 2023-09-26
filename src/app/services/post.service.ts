import { RenderUser } from './../model/render_user';
import { Comments } from './../model/comment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'api/home/user';
  private likeUrl = 'api/home/user/post';
  private commentUrl = 'api/home/post';
  private commentsUrl = 'api/home/post/comments';


  constructor(private http: HttpClient) { }

  addNewPost(post: Post, id: number): Observable<Post> {
    console.log('post Post');
    const url = `${this.postUrl}/${id}`;
    console.log(url);
    return this.http.post<Post>(url, post).pipe();
  }

  updatePost(post: Post): Observable<Post> {
    console.log('update Post');
    const url = `api/home/user/update`;
    return this.http.put<Post>(url, post).pipe();
  }

  addComment(id: number, user: Comments): Observable<Comments> {
    console.log('post Comment');
    const url = `${this.commentUrl}/${id}`;
    return this.http.post<Comments>(url, user).pipe();
  }

  updateComment(id: number, user: Comments): Observable<Comments> {
    console.log('post Comment');
    const url = `${this.commentUrl}/${id}`;
    return this.http.put<Comments>(url, user).pipe();
  }

  getComments(id: number, pageNo: number, pageSize: number): Observable<any> {
    console.log('get Comment');
    console.log('Page '+ pageNo);
    console.log('Size '+ pageSize);
    const url = `${this.commentsUrl}/${id}`;
    const params = new HttpParams()
    .set('pageNo', pageNo.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<any>(url, {params}).pipe();
  }

  deletePost(id: number): Observable<number> {

    const url = `${this.postUrl}/${id}`;
    console.log('Url '+ url);
    return this.http.delete<number>(url).pipe();
  }

  deleteComment(id: number): Observable<number> {

    const url = `${this.commentUrl}/${id}`;
    console.log('Url '+ url);
    return this.http.delete<number>(url).pipe();
  }

  uploadPhoto(formdata: FormData): Observable<FormData> {
    const url = "/api/upload";
    return this.http.post<FormData>(url, formdata).pipe();
  }

  downloadFile(filename: string): Observable<Blob>  {
    console.log("download file request");
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    const url = `/api/download/${filename}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  updateUserPhoto(user: RenderUser): Observable<RenderUser>  {
    const url = "/api/home/user/updatePhoto";
    return this.http.put<RenderUser>(url, user).pipe();
  }

}
