import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credential } from '../../model/credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential: Credential;
  errorAuth!: boolean;

  constructor(private authService: AuthService) {
    this.credential = new Credential();
   }

  ngOnInit() {
    this.authService.clearLoginData();
    this.credential = new Credential();
    this.authService.logout();
  }

  login() {
    console.log(this.credential.username);
    console.log(this.credential.password);
    this.authService.authenticate(this.credential, () => {
      this.errorAuth = true;
    });
  }

}
