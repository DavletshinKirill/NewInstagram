import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RenderUser } from '../model/render_user';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private adminUrl = 'api/admin/users';
  private userUrl = 'api/home/user/';


  constructor(
    private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    console.log('get Users');
    return this.http.get<User[]>(this.adminUrl);
  }

  getUser(id:number): Observable<RenderUser> {
    console.log('get Users');
    const url = `${this.userUrl}/${id}`;
    return this.http.get<RenderUser>(url);
  }

  addNewUser(user: User): Observable<User> {
    console.log('post User');
    return this.http.post<User>(this.adminUrl, user).pipe();
  }

  editUser(user: User): Observable<User> {
    console.log('edit User');
    const url = `${this.adminUrl}`;
    console.log(user.id);
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<User> {
    console.log('delete User');
    const url = `${this.adminUrl}/${id}`;
    return this.http.delete<User>(url);
  }

  redirectUser(): Observable<number> {
    let number = this.http.get<number>("api/AuthorizedUser")

    number.subscribe((resolt)=>{
      console.log(resolt);
    })
    return number;
  }

}
