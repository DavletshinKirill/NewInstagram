import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { BaseServiceService } from 'src/app/services/base-service.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent {
  id!: number;

  constructor(private baseService: BaseServiceService, private router: Router){
    console.log("RoutingComponent");
    this.baseService.redirectUser().subscribe(data => this.router.navigate([`user/${data}`]));
  }

}
